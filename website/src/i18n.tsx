import { createContext, useContext, useState, type ReactNode } from 'react'

export type Lang = 'zh' | 'en'

const STR: Record<string, { zh: string; en: string }> = {
  author: { zh: '作者 · Simon 林', en: 'by Simon Lin' },
  taglineA: { zh: '让你的 AI 做出', en: 'AI design that' },
  taglineHi: { zh: '不像 AI 做的', en: "doesn't look AI-made" },
  taglineB: { zh: '设计', en: '' },
  sub: {
    zh: '64 个精选设计 · 6 种美学 · 复制一段提示词,粘给任意 AI',
    en: '64 curated designs · 6 aesthetics · copy a prompt, paste to any AI',
  },
  browse: { zh: '浏览美学', en: 'Browse' },
  scroll: { zh: '向下滚', en: 'scroll' },
  secTitleA: { zh: '6 种美学,', en: '6 aesthetics,' },
  secTitleB: { zh: '64 个精选设计。', en: '64 curated designs.' },
  secDesc: {
    zh: '每套设计系统 = 一段自包含提示词,粘给任意 AI 就出片、不飘。左右滑动,点开看全部。',
    en: 'Each design system is a self-contained prompt. Paste to any AI — on-aesthetic, no drift. Swipe, then click to open.',
  },
  skinsWord: { zh: '套设计系统', en: 'design systems' },
  openAll: { zh: '查看全部', en: 'View all' },
  back: { zh: '返回全部美学', en: 'All aesthetics' },
  copy: { zh: '复制提示词', en: 'Copy prompt' },
  copied: { zh: '已复制 ✓', en: 'Copied ✓' },
  footer: {
    zh: 'SDesign · 去 AI 味设计系统库 · 纯分享免费 · 素材策展自 open-design',
    en: 'SDesign · Anti-slop design systems · Free & open · Curated from open-design',
  },
}

const Ctx = createContext<{ lang: Lang; toggle: () => void; t: (k: string) => string }>({
  lang: 'zh',
  toggle: () => {},
  t: (k) => k,
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('zh')
  const toggle = () => setLang((l) => (l === 'zh' ? 'en' : 'zh'))
  const t = (k: string) => STR[k]?.[lang] ?? k
  return <Ctx.Provider value={{ lang, toggle, t }}>{children}</Ctx.Provider>
}

export const useI18n = () => useContext(Ctx)
