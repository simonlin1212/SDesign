// 去 AI 味自检:扫一个产出 HTML,挑出明显违规(色乱/emoji/空话/无关渐变)。
// 用法: node scripts/audit.mjs <你的产出.html>
import fs from 'node:fs';

const file = process.argv[2];
if (!file || !fs.existsSync(file)) { console.log('用法: node scripts/audit.mjs <html文件>'); process.exit(1); }
const h = fs.readFileSync(file, 'utf8');

const colors = [...h.matchAll(/#[0-9a-fA-F]{6}/g)].map(m => m[0].toLowerCase());
const uniq = [...new Set(colors)];
const issues = [];

if (/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}]/u.test(h.replace(/&[a-z]+;/g, ''))) issues.push('含 emoji / 装饰符号');
if (/linear-gradient|radial-gradient|conic-gradient/i.test(h)) issues.push('含渐变 —— 若本美学非渐变系,删掉');
const sloppy = ['赋能', '无缝', '一站式', '释放潜能', '颠覆', '生态闭环', 'lorem ipsum', 'elevate your', 'unlock your', 'seamless'];
for (const s of sloppy) if (h.toLowerCase().includes(s.toLowerCase())) issues.push(`空话文案命中: "${s}"`);
if (uniq.length > 12) issues.push(`配色 ${uniq.length} 种,可能自创了 token 外的颜色`);

console.log(`\n配色种类 (${uniq.length}): ${uniq.join('  ')}`);
console.log(issues.length ? `\n⚠️  ${issues.length} 处可能违规:\n - ${issues.join('\n - ')}` : '\n✅ 通过基础自检(色彩/emoji/空话/渐变)');
console.log('\n注:自检只抓机械违规,主观品味(版式/留白/气质)请对照该设计系统的 reference.png 人工核。');
