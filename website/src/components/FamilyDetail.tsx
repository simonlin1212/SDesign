import { useEffect, useState } from 'react'
import { useI18n } from '../i18n'

export default function FamilyDetail({ family, onClose }: { family: any; onClose: () => void }) {
  const { lang, t } = useI18n()
  const [copied, setCopied] = useState<string | null>(null)

  // 打开详情时停掉背景丝滑滚动,详情自己原生滚动
  useEffect(() => {
    const l = (window as any).__lenis
    l?.stop()
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      l?.start()
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const copy = async (skin: any) => {
    try {
      await navigator.clipboard.writeText(skin.prompt || '')
    } catch {}
    setCopied(skin.od)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#0a0a12]/96 backdrop-blur-xl animate-[fadeIn_.25s_ease]">
      <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-10 py-5 bg-gradient-to-b from-[#0a0a12] via-[#0a0a12]/80 to-transparent">
        <div>
          <div className="font-display text-2xl md:text-3xl">{lang === 'zh' ? family.zh : family.en}</div>
          <div className="text-white/50 text-sm">
            {family.skins.length} {t('skinsWord')} · {lang === 'zh' ? family.en : family.zh}
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="close"
          className="h-10 w-10 grid place-items-center rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition text-lg"
        >✕</button>
      </div>

      {family.note && (
        <p className="px-6 md:px-10 max-w-3xl text-white/60 -mt-1 mb-7 leading-relaxed">{family.note}</p>
      )}

      <div className="px-6 md:px-10 pb-28 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {family.skins.map((s: any) => (
          <div key={s.od} className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]">
            <div className="aspect-[4/3] overflow-hidden bg-black">
              <img
                src={s.img}
                alt={s.name}
                loading="lazy"
                className="h-full w-full object-cover object-top transition duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex items-center justify-between gap-3 p-4">
              <div className="flex items-center gap-2 min-w-0">
                <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: s.accent }} />
                <span className="truncate font-medium">{s.name}</span>
              </div>
              <button
                onClick={() => copy(s)}
                disabled={!s.prompt}
                className="shrink-0 rounded-full px-3.5 py-1.5 text-sm border border-white/25 hover:bg-white hover:text-black transition disabled:opacity-40"
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
