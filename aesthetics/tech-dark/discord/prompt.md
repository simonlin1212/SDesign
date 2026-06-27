# 科技暗黑 · Discord 设计系统
> SDesign 去 AI 味设计系统 · 美学来源 open-design(`discord`,Apache-2.0)
> **用法**:把下面 ```text 代码块里的整段**复制**,粘给你的 AI(Claude Code / ChatGPT / Codex / 任意),让它做**网页 / 落地页**(本套 token 是 CSS 单位)。

```text
# 美学:科技暗黑(Tech Dark)— Discord 风格
深色底 + 高对比 + 无衬线 + 单一霓虹/品牌强调色;冷峻精密,开发者/SaaS 气质(含终端等宽)。

# 设计 token(必须用这些精确值,不准自创别的颜色)
- 背景:#313338
- 表面/卡片:#2b2d31 ,边框 rgba(255, 255, 255, 0.06)
- 正文主色:#dbdee1 ;次级:#f2f3f5 ;弱化:#949ba4
- 强调色(只此一个):#5865f2 —— 只用在唯一焦点 / 主 CTA / 小标签
- 圆角:卡片 16px,按钮 8px
- 标题字体:"gg sans", "Helvetica Neue", Helvetica, Arial, sans-serif
- 正文字体:"gg sans", "Helvetica Neue", Helvetica, Arial, sans-serif
- 行高:正文 1.375,标题 1.10
- ⚠️ 字体若为私有/不可公开(Anthropic Serif、SF Pro、商业 Inter Variable 等),换 Google Fonts 最接近的公开字体并真正加载,保证浏览器能渲染。

# 本美学特别说明(凡与通用规则冲突,以此为准)
深色为底、强调色用得稀、网格精密对齐;可有极克制的微光,别滥用发光。

# 去 AI 味硬规则(必须全部遵守)
- 色彩纪律:严格只用提示词里给的 token 颜色,强调色只用一个,绝不自创配色;别加与本美学无关的渐变/霓虹/光晕/磨砂(本美学要的特效见「本美学特别说明」)。
- 字体纪律:只用提示词给的字体栈;**若其中有私有或不可公开获取的字体(如 Anthropic Serif、SF Pro、商业版 Inter Variable),换成 Google Fonts 里最接近的公开字体,用 `@import` / `<link>` 真正加载**;保证浏览器能渲染、字体栈末尾有通用 fallback(serif / sans-serif / monospace);别乱加与本美学无关的字体。
- 默认不用 emoji(「本美学特别说明」允许的除外,如活泼彩色)。
- 文案真实具体:禁空话套话(赋能 / 无缝 / 一站式 / 释放潜能 / 颠覆 / revolutionize / next-generation / streamline / Elevate your workflow / Lorem ipsum),写得像真有这个产品。
- 信息密度按本美学定:别无脑塞满每个像素;但数据密集类一屏多信息点/图表/表格是对的,别强行留白或砍信息。
- CTA 按页面类型给:落地页通常一个主 CTA;定价 / 功能 / 仪表盘类页面可多个,但别满屏按钮抢注意力。
- 正文可读:正文字号 16–20px(别做超大正文),行高足够,别用过细过浅的灰字。
- 不 cargo-cult:别套用与本美学无关的流行特效(玻璃 / 霓虹 / 重投影);**本美学要的特效照做**(见「本美学特别说明」)。
- 版式克制:对齐统一,别东倒西歪,别"三张一模一样的卡硬挤一行";居中用在对的地方(hero / 单列叙述可居中,整页元素无脑全居中不行)。
- 中文内容:中英文之间加空格,标点用全角,标题不用斜体,避免行首孤字。

# 任务
按上面的美学气质 + 这套精确 token,做出用户要的东西。**主要面向网页 / 落地页**:默认输出**单文件 HTML + 内联 CSS**(除非用户指定 React / Vue / Tailwind 等栈);加 `<meta name="viewport">` 与基本 CSS reset,保证手机不崩。
做 PPT / 海报时:借这套**配色 + 字体气质 + 去 AI 味纪律**即可——token 是 CSS 单位,具体尺寸自行换算。
用真实具体的文案,别填空话。
```

— 同款美学的范本长这样:见本目录 `reference.png` / `reference.html`(策展自 open-design)。