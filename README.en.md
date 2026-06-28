<p align="center">
  <img src="assets/hero.png" width="860" alt="SDesign — anti-slop design systems">
</p>

<h1 align="center">SDesign · Anti-Slop Design Systems</h1>

<p align="center">
  Make your AI produce web pages & landing pages that <b>don't look AI-made</b>.<br>
  Pick an <b>aesthetic</b>, copy its prompt, paste it to your AI — and get output with real designer taste, not the default AI slop.
</p>

<p align="center">
  🎨 6 aesthetic families · ✨ 64 <b>genuinely different</b> designs · ⚡ copy &amp; paste · 🧹 built-in anti-slop rules · 🆓 free · zero install · no login
</p>

<p align="center">
  <img src="https://img.shields.io/badge/release-v2.1-2ea44f">
  <img src="https://img.shields.io/badge/aesthetics-6-ff5a1f">
  <img src="https://img.shields.io/badge/designs-64-orange">
  <img src="https://img.shields.io/badge/license-MIT-blue">
  <img src="https://img.shields.io/badge/works%20with-Claude%20%C2%B7%20ChatGPT%20%C2%B7%20Codex-444">
</p>

<p align="center"><a href="README.md">中文</a> · <b>English</b></p>

<p align="center">
  <a href="https://sdesign.one/"><b>🔗 Live Demo</b></a> —— see all 64 designs in your browser, copy-paste ready, no install
</p>

---

<p align="center">
  <a href="https://sdesign.one/">
    <img src="assets/showcase.png" width="920" alt="6 aesthetic families, one representative design each — click for live demo">
  </a>
</p>

## What is this

By default, AI spits out the same look every time: centered giant headline, three identical cards, purple-blue gradients, emoji, "elevate your workflow." **SDesign fixes that.**

- 🎨 **6 aesthetic families · 64 unique designs** — each with **exact design tokens** (colors / fonts / radii) + a **reference page** + a **per-aesthetic note**. Every one is a genuinely different design — **no recolored filler templates**.
- 🧹 **Anti-slop rules** — a mechanical, enforceable discipline that keeps the AI in line (verified on both Claude-class and weaker models).
- ⚡ **Plug & play** — copy one prompt, paste to any AI (Claude / ChatGPT / Codex…), and the page it builds stays on-aesthetic and **doesn't drift**.
- 🖍️ **Illustration (hand-drawn, anti-slop)** — a second track: drop a hand-drawn sketch illustration into your article body ([`illustration/`](illustration/)), not a full-page layout. Polished AI illustrations are themselves peak AI-slop; hand-drawn sketches go the other way.

---

## How to use (two ways)

### A · Copy a prompt (works with any AI, zero friction)
1. Browse [`aesthetics/`](aesthetics/), pick a family → pick a design system (e.g. `tech-dark/linear-app/`).
2. Open its `prompt.md`, copy the whole code block.
3. Paste it to your AI, then add "build me an X page."
4. The output lands on that aesthetic — with no AI slop.

### B · Install into Claude Code (let the agent pick)
Drop this repo into your project; Claude Code reads [`SKILL.md`](SKILL.md) and auto-selects the aesthetic and applies the rules.

> 💡 This library is **web / landing-page first** (tokens are CSS units). For decks or posters, borrow its **palette + type feel + anti-slop discipline**; convert exact sizes yourself.

---

## 6 aesthetic families · 64 unique designs

| Family | # | One-liner | Representative designs |
|---|---|---|---|
| Minimal Editorial | 32 | Neutral palette + single accent + whitespace, built to read | Airbnb · Stripe · Notion |
| Tech Dark | 15 | Dark + high contrast + neon accent, dev-grade (incl. terminal) | Linear · Supabase · Warp |
| Warm Humanist | 7 | Cream warmth + serif + whitespace, human | Claude · Cursor · Arc |
| Cinematic Dark | 3 | Cinematic gradients + huge type + dark, dramatic | Raycast · SpaceX · Runway |
| Data Dense | 3 | Charts-first + dark dashboards, high density | Binance · ClickHouse · GitHub |
| Bold & Playful | 4 | Saturated / illustration / hard-edge / giant numerals | Duolingo · Canva · Hugging Face |

> Full design list under each `aesthetics/<family>/`, or [`index.json`](index.json).

---

## Why SDesign

| | Generic "design resource" lists | open-design (raw) | **SDesign** |
|---|---|---|---|
| **Count** | hundreds of entries, hard to vet | claims 150+, **~half is one template recolored** | **64, each genuinely different** (filler dropped) |
| **Prompt** | usually assemble it yourself | dev framework / desktop app | **one self-contained prompt**, copy & go |
| **Anti-slop** | mostly general advice | no dedicated constraints | **hard rules, conditioned per aesthetic** — even weak models obey |
| **Form factor** | a list / doc | desktop app + MCP | **one skill**, just hand it to Claude |

**The core difference: not more entries — more "genuinely different" + "paste and it ships."** We looked at each one and dropped the recolored templates open-design used to pad its count.

---

## Repo structure

```
SDesign-V2/
├── SKILL.md                 Claude Code entry (6-family routing + rules)
├── rules/anti-slop.md       Anti-slop rules (single source of truth, inlined into every prompt)
├── aesthetics/<family>/<design-system>/
│   ├── prompt.md            ★ One-shot prompt (copy this)
│   ├── tokens.json          Exact design tokens
│   ├── reference.html       Reference page (from open-design)
│   └── reference.png        Reference screenshot
├── illustration/            Illustration sub-capability (hand-drawn anti-slop article art)
├── scripts/                 fetch / build / audit (re-runnable)
├── website/                 Live-demo site source (Vite + React, auto-deployed to GitHub Pages)
├── assets/                  README images
└── index.json               Machine-readable index
```

Each design system's `prompt.md` is **self-contained** — tokens, the per-aesthetic note, and the anti-slop rules are welded into one block. Copy and use; install nothing.

---

## Rebuild / extend

Edit [`scripts/skins.json`](scripts/skins.json) (add design systems, swap brands, reclassify / tweak notes), then:
```bash
node scripts/fetch-from-od.mjs   # pull tokens + reference from open-design
node scripts/build-prompts.mjs   # generate prompt.md + index.json
```
Audit your output for slop: `node scripts/audit.mjs your-output.html`

---

## Credits & License

- Aesthetic assets curated from [nexu-io/open-design](https://github.com/nexu-io/open-design) (Apache-2.0); see [`NOTICE`](NOTICE).
- This repo's code & docs: MIT (see [`LICENSE`](LICENSE)).
- Free, pure sharing. If it helps, a ⭐ is appreciated.

> ⚠️ **Brand-neutrality notice**: SDesign is **not affiliated with** any of the brands listed (Linear, Apple, Claude, Stripe, etc.) and ships **no official assets**. Brand names are used only to **describe their public visual style** (as inspiration). Trademarks belong to their respective owners.
