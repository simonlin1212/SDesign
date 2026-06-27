import { useEffect, useState } from 'react'
import { useI18n } from '../i18n'

export default function FamilyPage({ family, onBack }: { family: any; onBack: () => void }) {
  const { lang, t } = useI18n()
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    ;(window as any).__lenis?.scrollTo(0, { immediate: true })
  }, [family?.key])

  if (!family) return null

  const copy = async (s: any) => {
    try { await navigator.clipboard.writeText(s.prompt || '') } catch {}
    setCopied(s.od)
    setTimeout(() => setCopied(null), 1600)
  }

  return (
    <div className="min-h-screen px-6 md:px-10 pt-28 md:pt-32 pb-32 max-w-7xl mx-auto">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-white/65 hover:text-white transition mb-8">
        <span className="text-lg">←</span> {t('back')}
      </button>

      <h1 className="font-display leading-[0.95] text-[clamp(2.5rem,8vw,6rem)]">
        {lang === 'zh' ? family.zh : family.en}
      </h1>
      <div className="mt-3 flex items-center gap-3 text-white/55">
        <span>{lang === 'zh' ? family.en : family.zh}</span>
        <span>·</span>
        <span>{family.skins.length} {t('skinsWord')}</span>
      </div>
      {family.note && <p className="mt-5 max-w-3xl text-white/65 leading-relaxed">{family.note}</p>}

      {/* 大面积:2 列大图,整页可滚动 */}
      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {family.skins.map((s: any, i: number) => (
          <div
            key={s.od}
            className="reveal-up group rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03]"
            style={{ animationDelay: `${Math.min(i, 8) * 0.05}s` }}
          >
            <div className="aspect-[16/11] overflow-hidden bg-black">
              <img
                src={s.img}
                alt={s.name}
                loading="lazy"
                className="h-full w-full object-cover object-top transition-[object-position] duration-[1400ms] ease-out group-hover:object-bottom"
              />
            </div>
            <div className="flex items-center justify-between gap-3 p-5">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="h-3 w-3 rounded-full shrink-0" style={{ background: s.accent, boxShadow: `0 0 12px ${s.accent}` }} />
                <span className="truncate text-lg font-medium">{s.name}</span>
              </div>
              <button
                onClick={() => copy(s)}
                disabled={!s.prompt}
                className="shrink-0 rounded-full px-4 py-2 text-sm border border-white/25 hover:bg-white hover:text-black transition disabled:opacity-40"
              >
                {copied === s.od ? t('copied') : t('copy')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
