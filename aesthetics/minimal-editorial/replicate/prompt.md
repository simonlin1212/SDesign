# 极简留白 · Replicate 设计系统
> SDesign 去 AI 味设计系统 · 美学来源 open-design(`replicate`,Apache-2.0)
> **用法**:把下面 ```text 代码块里的整段**复制**,粘给你的 AI(Claude Code / ChatGPT / Codex / 任意),让它做**网页 / 落地页**(本套 token 是 CSS 单位)。

```text
# 美学:极简留白(Minimal Editorial)— Replicate 风格
大面积留白 + 中性色 + 单一强调色;克制、为阅读而生,靠排版和留白出高级感。

# 设计 token(必须用这些精确值,不准自创别的颜色)
- 背景:#ffffff
- 表面/卡片:#f8f8f8 ,边框 #202020
- 正文主色:#202020 ;次级:#4e4e4e ;弱化:#646464
- 强调色(只此一个):#ea2804 —— 只用在唯一焦点 / 主 CTA / 小标签
- 圆角:卡片 9999px,按钮 9999px
- 标题字体:"rb-freigeist-neue", ui-sans-serif, system-ui, sans-serif
- 正文字体:"basier-square", ui-sans-serif, system-ui, sans-serif
- 行高:正文 1.5,标题 1.10
- ⚠️ 字体若为私有/不可公开(Anthropic Serif、SF Pro、商业 Inter Variable 等),换 Google Fonts 最接近的公开字体并真正加载,保证浏览器能渲染。

# 本美学特别说明(凡与通用规则冲突,以此为准)
留白要大、装饰要少、一个强调色;靠排版和留白出高级感,别加多余元素。

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