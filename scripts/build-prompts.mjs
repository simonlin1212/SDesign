// 从 tokens(读 reference.html 的 :root) + rules/anti-slop.md + 家族 meta(含 note)
// 生成每个设计系统的自包含 prompt.md,以及各家族 _family.md、根 index.json。
// 用法: node scripts/build-prompts.mjs   (需先跑 fetch-from-od.mjs)
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const skins = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'skins.json'), 'utf8'));

// 抓 anti-slop.md 里所有 "- " 规则行,内联进每个 prompt
const RULES = fs.readFileSync(path.join(ROOT, 'rules', 'anti-slop.md'), 'utf8')
  .split('\n').filter(l => l.trimStart().startsWith('- ')).join('\n');

function rootVars(html) {
  const m = html.match(/:root\s*{([\s\S]*?)}/);
  const o = {};
  if (m) for (const line of m[1].split(';')) {
    const mm = line.match(/--([a-z0-9-]+)\s*:\s*([^;]+)/i);
    if (mm) o[mm[1].trim()] = mm[2].trim();
  }
  return o;
}

// 标题行高下限 1.1(open-design 里有 1.0 这种过挤的值,会撞行)
function clampLead(s) {
  const n = parseFloat(s);
  if (!isFinite(n)) return s;
  return (n < 1.1 ? 1.1 : n).toFixed(2);
}

function buildPrompt(fam, skin, v) {
  const g = (k, fb) => v[k] || fb || '(见范本)';
  const note = fam.note ? `\n# 本美学特别说明(凡与通用规则冲突,以此为准)\n${fam.note}\n` : '';
  return `# ${fam.zh} · ${skin.name} 设计系统
> SDesign 去 AI 味设计系统 · 美学来源 open-design(\`${skin.od}\`,Apache-2.0)
> **用法**:把下面 \`\`\`text 代码块里的整段**复制**,粘给你的 AI(Claude Code / ChatGPT / Codex / 任意),让它做**网页 / 落地页**(本套 token 是 CSS 单位)。

\`\`\`text
# 美学:${fam.zh}(${fam.en})— ${skin.name} 风格
${fam.desc}

# 设计 token(必须用这些精确值,不准自创别的颜色)
- 背景:${g('bg')}
- 表面/卡片:${g('surface', g('bg'))} ,边框 ${g('border', g('border-soft'))}
- 正文主色:${g('fg')} ;次级:${g('fg-2', g('muted'))} ;弱化:${g('muted', g('meta'))}
- 强调色(只此一个):${g('accent')} —— 只用在唯一焦点 / 主 CTA / 小标签
- 圆角:卡片 ${g('radius-lg', g('radius-md'))},按钮 ${g('radius-md', g('radius-sm'))}
- 标题字体:${g('font-display')}
- 正文字体:${g('font-body')}
- 行高:正文 ${g('leading-body', '1.6')},标题 ${clampLead(g('leading-tight', '1.15'))}
- ⚠️ 字体若为私有/不可公开(Anthropic Serif、SF Pro、商业 Inter Variable 等),换 Google Fonts 最接近的公开字体并真正加载,保证浏览器能渲染。
${note}
# 去 AI 味硬规则(必须全部遵守)
${RULES}

# 任务
按上面的美学气质 + 这套精确 token,做出用户要的东西。**主要面向网页 / 落地页**:默认输出**单文件 HTML + 内联 CSS**(除非用户指定 React / Vue / Tailwind 等栈);加 \`<meta name="viewport">\` 与基本 CSS reset,保证手机不崩。
做 PPT / 海报时:借这套**配色 + 字体气质 + 去 AI 味纪律**即可——token 是 CSS 单位,具体尺寸自行换算。
用真实具体的文案,别填空话。
\`\`\`

— 同款美学的范本长这样:见本目录 \`reference.png\` / \`reference.html\`(策展自 open-design)。`;
}

const index = [];
let built = 0;
for (const fam of skins.families) {
  const famDir = path.join(ROOT, 'aesthetics', fam.key);
  fs.mkdirSync(famDir, { recursive: true });
  fs.writeFileSync(path.join(famDir, '_family.md'),
    `# ${fam.zh} / ${fam.en}\n\n${fam.desc}\n\n${fam.note ? '**本美学特别说明**:' + fam.note + '\n\n' : ''}**代表设计系统**:${fam.skins.map(s => s.name).join(' · ')}\n\n> 美学家族 = 浏览/分类单位。进来挑一个设计系统,复制它的 \`prompt.md\` 即可。\n`);
  for (const skin of fam.skins) {
    const dir = path.join(famDir, skin.od);
    const refPath = path.join(dir, 'reference.html');
    if (!fs.existsSync(refPath)) { console.log(`SKIP  ${fam.key}/${skin.od} (无 reference.html,先跑 fetch)`); continue; }
    const v = rootVars(fs.readFileSync(refPath, 'utf8'));
    fs.writeFileSync(path.join(dir, 'prompt.md'), buildPrompt(fam, skin, v));
    index.push({ family: fam.key, zh: fam.zh, skin: skin.od, name: skin.name, accent: v['accent'] || '', bg: v['bg'] || '' });
    built++;
  }
}
fs.writeFileSync(path.join(ROOT, 'index.json'), JSON.stringify({
  name: 'SDesign', generated: '2026-06-27', source: 'nexu-io/open-design (Apache-2.0)',
  families: skins.families.map(f => ({ key: f.key, zh: f.zh, en: f.en, desc: f.desc, note: f.note || '', skins: f.skins.map(s => s.name) })),
  skins: index
}, null, 2));
console.log(`生成完成: ${built} 个 prompt.md + ${skins.families.length} 个 _family.md + index.json`);
