// 从 ../SDesign-V2-opensource 把 136 张 reference.png + 提示词灌进网站
// 输出: public/skins/<family>/<od>.png  +  src/data/skins.json
import fs from 'node:fs'
import path from 'node:path'

const HERE = path.resolve(import.meta.dirname, '..')
const SRC = path.resolve(HERE, '..', 'SDesign-V2-opensource')
const idx = JSON.parse(fs.readFileSync(path.join(SRC, 'index.json'), 'utf8'))

// 首选封面(品牌识别度高);若它色调太弱,自动换成本家族最鲜艳的设计系统
const PREFER = {
  'warm-humanist': 'claude', 'minimal-editorial': 'vercel', 'tech-dark': 'linear-app',
  'terminal-core': 'warp', 'data-dense': 'posthog', 'cinematic-dark': 'runwayml',
  'glass-soft': 'arc', 'neo-brutalist': 'theverge', 'playful-color': 'duolingo', 'retro-y2k': 'retro',
}

// 色调强度评分:饱和度高、明度适中得分高(避开纯黑/纯白/灰)
function vivid(hex) {
  const m = (hex || '').replace('#', '').match(/.{2}/g)
  if (!m || m.length < 3) return 0
  const [r, g, b] = m.map((x) => parseInt(x, 16) / 255)
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2
  const s = mx === mn ? 0 : l > 0.5 ? (mx - mn) / (2 - mx - mn) : (mx - mn) / (mx + mn)
  const lpenalty = 1 - Math.abs(l - 0.52) * 1.3
  return s * Math.max(0.15, lpenalty)
}

const promptOf = (fk, od) => {
  try {
    const md = fs.readFileSync(path.join(SRC, 'aesthetics', fk, od, 'prompt.md'), 'utf8')
    const m = md.match(/```text\n([\s\S]*?)```/)
    return m ? m[1].trim() : ''
  } catch { return '' }
}

const byFam = {}
for (const s of idx.skins) (byFam[s.family] ||= []).push(s)

let copied = 0, missing = 0
const families = idx.families.map((f) => {
  const skins = (byFam[f.key] || []).map((s) => {
    const srcImg = path.join(SRC, 'aesthetics', f.key, s.skin, 'reference.png')
    const dstDir = path.join(HERE, 'public', 'skins', f.key)
    fs.mkdirSync(dstDir, { recursive: true })
    const dst = path.join(dstDir, s.skin + '.png')
    if (fs.existsSync(srcImg)) { fs.copyFileSync(srcImg, dst); copied++ } else missing++
    return {
      od: s.skin, name: s.name, accent: s.accent || '#888888',
      img: `/skins/${f.key}/${s.skin}.png`, prompt: promptOf(f.key, s.skin),
    }
  })
  const prefer = skins.find((x) => x.od === PREFER[f.key])
  const mostVivid = skins.slice().sort((a, b) => vivid(b.accent) - vivid(a.accent))[0]
  const cover = (prefer && vivid(prefer.accent) >= 0.3 ? prefer : mostVivid)?.od || skins[0]?.od
  return { key: f.key, zh: f.zh, en: f.en, desc: f.desc, note: f.note || '', cover, skins }
})

fs.mkdirSync(path.join(HERE, 'src', 'data'), { recursive: true })
fs.writeFileSync(path.join(HERE, 'src', 'data', 'skins.json'), JSON.stringify({ families }, null, 2))
console.log('封面选定:')
for (const f of families) {
  const c = f.skins.find((s) => s.od === f.cover)
  console.log(`  ${f.zh.padEnd(8)} → ${c.name} (${c.accent}, vivid=${vivid(c.accent).toFixed(2)})`)
}
console.log(`\nfamilies ${families.length}, 设计系统 ${families.reduce((a, f) => a + f.skins.length, 0)}, 图片 ${copied}, 缺失 ${missing}`)
