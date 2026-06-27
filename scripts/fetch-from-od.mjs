// 从 open-design 抓取每个策展设计系统的 token + 参考页,落到 aesthetics/<family>/<skin>/
// 用法: node scripts/fetch-from-od.mjs
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const skins = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'skins.json'), 'utf8'));
const RAW = (p) => `https://raw.githubusercontent.com/nexu-io/open-design/main/design-systems/${p}`;
const FILES = [['components.html', 'reference.html'], ['design-tokens.json', 'tokens.json']];

let ok = 0, miss = 0;
for (const fam of skins.families) {
  for (const skin of fam.skins) {
    const dir = path.join(ROOT, 'aesthetics', fam.key, skin.od);
    fs.mkdirSync(dir, { recursive: true });
    for (const [remote, local] of FILES) {
      try {
        const res = await fetch(RAW(`${skin.od}/${remote}`));
        if (!res.ok) { console.log(`MISS  ${fam.key}/${skin.od}/${remote} -> ${res.status}`); miss++; continue; }
        const txt = await res.text();
        fs.writeFileSync(path.join(dir, local), txt);
        console.log(`OK    ${fam.key}/${skin.od}/${local}  ${(txt.length / 1024).toFixed(1)}KB`);
        ok++;
      } catch (e) { console.log(`ERR   ${fam.key}/${skin.od}/${remote}  ${e.message}`); miss++; }
    }
  }
}
console.log(`\n抓取完成: ${ok} 个文件 OK, ${miss} 个缺失/失败`);
