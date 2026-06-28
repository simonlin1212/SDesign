# 配图 · 手绘去 AI 味文章插画

> SDesign 的「配图」子能力 —— 给中文正文配一张**手绘风插画**(注意:是文章里的一张配图,不是整页排版,跟 `aesthetics/` 那套设计系统是两条线)。
> 方法论吸收自 [Ian Xiaohei Illustrations](https://github.com/helloianneo)(MIT,见 [`NOTICE`](../NOTICE))。**这是去 AI 味最锋利的一刀**:满屏精致 AI 配图本身就是 AI 味重灾区,手绘草图反其道而行 —— 像一个常年做 AI / 产品 / 开发的人,在白纸上随手画的一张解释草图。

## 什么时候用

- 公众号 / 文章 / 长文 / PPT 正文,需要一张「解释性配图」——把一个**判断 / 流程 / 状态 / 隐喻**画出来。
- 想要「不像 AI 生成」的插画:去掉商业矢量、扁平插画、可爱卡通、信息图那股 AI 味。
- ⚠️ 不适合:需要整页 UI / 落地页排版时,走 `aesthetics/`;需要照片级写实图时,本模块不合适。

## 怎么用

复制下面这段提示词,替换 `{大括号}` 变量,粘给任意图像 AI(Gemini / Nano Banana / …)。**一篇文章里每张图单独生成**,不要拼图。

```text
Generate one standalone 16:9 horizontal Chinese article illustration.

Visual DNA:
Pure white background. Minimalist black hand-drawn line art with slightly wobbly, non-mechanical pen lines (not vector, not heavy outlines). Lots of empty white space. Sparse red / orange / blue handwritten Chinese annotations. A clean, slightly absurd product-sketch feeling — like an experienced AI / product / dev person sketching one explanatory drawing on a blank sheet of paper. No gradients, no shadows, no paper texture, no noise, no complex background, no commercial vector style, no PPT infographic look, no cute mascot poster, no children's illustration, no realistic UI screenshot.

Theme: {这张图配的正文主题}
Core idea: {这张图要表达的唯一核心意思}
Composition: {具体画面:主体是什么、正在做什么、主要物件、信息如何从 A 流到 B}
Suggested elements: {元素1} / {元素2} / {元素3}
Chinese handwritten labels: {标注1} / {标注2} / {标注3}   (每处 2-8 字,全图最多 5-8 处)

Color use:
Black for the main line art and the main subject. Orange for the main flow / path / arrows (A→B / automation direction). Red ONLY for key warnings / problems / results. Blue ONLY for secondary notes, inner thoughts, or system / AI state. Keep color restrained — less is more; blue is optional, not every image needs it.

Constraints:
One image explains only ONE core structure (a judgment / flow / state / metaphor). Keep the main subject around 40%-60% of the canvas; preserve at least 35% blank white space, ideally one quiet empty zone. Use at most 5-8 short handwritten Chinese labels. Do NOT write a title in the top-left corner. Do NOT write the structure type ("流程图 / 架构图" etc.) on the image. Do not make it a formal diagram, course slide, or dense explainer. Invent a FRESH visual metaphor for THIS specific article — do not reuse known compositions. It should be clear but not instructional, interesting but not childish, strange but clean. If a figure is needed, use a simple generic hand-drawn figure performing the core action — NOT a branded mascot or recognizable character.
```

## 铁律(写在提示词里了,这里再点一遍)

- **纯白底**:不要米色 / 暖灰 / 纸张纹理 / 渐变 / 阴影 / 噪点 / 复古纸感。
- **手绘黑线为主**:细线、轻微抖动、不机械、不矢量、不厚重描边;大量留白(主体 40-60%,≥35% 空白)。
- **一图一锚点**:只讲一个核心动作 / 结构 / 状态 / 隐喻;结构自然表达,**别在图上写结构类型名**。
- **颜色语义**:黑=主体线稿 · 橙=主流程/路径/箭头 · 红=重点问题/结果/提醒 · 蓝=次级说明/AI或系统状态(克制,宁少勿多)。
- **手写批注**:最多 5-8 处,每处 2-8 字。
- **绝对不要**:商业插画 / PPT 信息图 / 正式流程图 / 课件 / 可爱卡通 / 儿童插画 / 精致扁平插画 / 科技感 UI / 真实 App 截图 / 复杂背景。
- **每篇重造隐喻**:别复用旧案例构图,针对这篇文章重新发明一个低科技的物理隐喻。
- **审美方向**:怪诞、有创意、简洁清爽、天马行空;不要可爱、幼稚、复杂、死板。

## 出图后自检

- 是不是一眼就懂「这张图在说一件什么事」?讲了不止一件 → 拆成两张。
- 是不是真有≥35% 留白、纯白底、没有渐变/阴影?
- 颜色是不是克制(没把红橙蓝全堆上)?
- 像不像「随手画的草图」,而不是「AI 生成的精致插画」?后者就是没去掉 AI 味。
