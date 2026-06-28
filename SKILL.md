---
name: sdesign-design
description: 去 AI 味设计系统库。当用户要做网页/落地页(也可借美学做 PPT/海报),且希望"好看、有设计感、不像 AI 默认那种烂味"时使用。提供 6 个美学家族、64 个独特设计的精确设计 token + 去AI味硬规则 + 范本,让产出有大牌设计师的味道。触发词:做个好看的 / 设计感 / 别太 AI 味 / 像 Linear/Apple/Claude 那样 / 高级感 / 落地页 / 配色字体。
---

# SDesign — 去 AI 味设计系统库

用户要做"好看的东西"时,**不要凭默认审美直接写**(那会是 AI 烂味:居中大标题 + 三张一样的卡 + 紫蓝渐变 + emoji + 空话)。改走这套流程。本库以**网页/落地页**为主(token 是 CSS 单位)。

## 流程(三步)

1. **选美学** —— 按用户的氛围词或他点名的大牌,从下表选一个**家族**,再进 `aesthetics/<家族>/` 选一个**设计系统**(每族有多个,见目录)。
   - 用户说"科技感/开发者/暗色" → `tech-dark`;说"像 Linear" → `tech-dark/linear-app`。
   - 用户说"温暖/有人味/像 Claude" → `warm-humanist/claude`。说"高级/像 Apple" → `minimal-editorial/apple`。
   - 不确定就问一句,或默认挑该家族第一个设计系统。
2. **读设计系统的 `prompt.md`** —— `aesthetics/<家族>/<设计系统>/prompt.md`。里面有精确 token + **本美学特别说明** + 内联的去AI味规则。**严格照它的 token,一个强调色都不许改。**
3. **做 + 自检** —— 默认输出**单文件 HTML + 内联 CSS**(除非用户指定 React/Vue/Tailwind),加 `<meta name="viewport">` + 基本 reset。做完可跑 `node scripts/audit.mjs <产出>` 查机械违规;主观品味对照该设计系统 `reference.png`。

## 铁律(任何美学都遵守)

`rules/anti-slop.md` 是总规矩,已内联进每个 prompt。核心:**只用 token 给的颜色、一个强调色、字体不可获取就换 Google Fonts 公开版、文案别空话、信息密度/CTA 按页面类型给、版式别东倒西歪。**

> ⚠️ **规则凡与某美学冲突,以该设计系统 `prompt.md` 里的「本美学特别说明」为准**:大胆彩色**可用** emoji/插画/硬边/故意"丑";数据密集**可**一屏多信息、多 CTA;暖色人文**就该**衬线大留白;电影暗调**就该**大尺度渐变 + 超大字。

## 美学家族路由表(共 64 个独特设计,下表只列代表;完整见各目录或 `index.json`)

| 家族 key | 中文 | 设计系统数 | 什么感觉 | 代表设计系统 |
|---|---|---|---|---|
| `minimal-editorial` | 极简留白 | 32 | 中性色+单强调色+大留白,为阅读而生 | airbnb, stripe, notion |
| `tech-dark` | 科技暗黑 | 15 | 深底+高对比+霓虹强调,开发者气质(含终端等宽) | linear-app, supabase, warp |
| `warm-humanist` | 暖色人文 | 7 | 奶油暖色+衬线+大留白,有人味 | claude, cursor, arc |
| `cinematic-dark` | 电影暗调 | 3 | 电影渐变+超大字+深色,震撼高级 | raycast, spacex, runwayml |
| `data-dense` | 数据密集 | 3 | 图表为主+暗仪表盘,信息高密度 | binance, clickhouse, github |
| `bold-playful` | 大胆彩色 | 4 | 高饱和/插画/硬边粗野/超大数字,强烈抓眼 | duolingo, canva, huggingface |

> 本库**网页/落地页优先**;做 PPT/海报就借其配色 + 字体气质,尺寸自行换算。`reference.html` 是网页范本。
> 美学素材策展自 nexu-io/open-design(Apache-2.0);本库与所列各品牌无关联,品牌名仅描述其公开视觉风格。

## 配图(另一条线,不是第 7 家族)

用户要的是**正文里一张手绘风插画**(把一个判断/流程/状态/隐喻画出来),而不是整页排版 → 走 [`illustration/prompt.md`](illustration/prompt.md):复制那段提示词、替换变量,粘给任意图像 AI 出图。纯白手绘、一图一锚点、黑/橙/红/蓝语义色、≥35% 留白 —— **去 AI 味最锋利的一刀**。(方法论吸收自 Ian Xiaohei Illustrations,MIT,见 `NOTICE`。)
