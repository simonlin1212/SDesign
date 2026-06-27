import { useRef } from 'react'
import { useI18n } from '../i18n'

export default function FamilyCarousel({ families, onOpen }: { families: any[]; onOpen: (key: string) => void }) {
  const { lang, t } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false })

  const onDown = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    drag.current = { down: true, startX: e.pageX, startScroll: el.scrollLeft, moved: false }
  }
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el || !drag.current.down) return
    const dx = e.pageX - drag.current.startX
    if (Math.abs(dx) > 5) drag.current.moved = true
    el.scrollLeft = drag.current.startScroll - dx
  }
  const onUp = () => { drag.current.down = false }
  const arrow = (d: number) => ref.current?.scrollBy({ left: d * Math.min(560, window.innerWidth * 0.55), behavior: 'smooth' })

  return (
    <div className="relative">
      <div
        ref={ref}
        onMouseDown={onDown}
        onMouseMove={onMove}
        onMouseUp={onUp}
        onMouseLeave={onUp}
        className="no-bar flex gap-5 overflow-x-auto px-6 md:px-10 pb-6 cursor-grab active:cursor-grabbing select-none snap-x snap-mandatory"
      >
        {families.map((f) => {
          const cover = f.skins.find((s: any) => s.od === f.cover) || f.skins[0]
          return (
            <button
              key={f.key}
              onClick={() => { if (!drag.current.moved) onOpen(f.key) }}
              className="snap-center shrink-0 group relative overflow-hidden rounded-3xl border border-white/10 text-left"
              style={{ width: 'clamp(280px, 38vw, 480px)', height: 'clamp(400px, 64vh, 660px)' }}
            >
              <img
                src={cover.img}
                alt={f.en}
                draggable={false}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-top transition duration-700 ease-out group-hover:scale-105"
              />
              {/* 不染色——让案例本身的颜色突出;仅底部加暗角承托标题 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7 flex items-end justify-between">
                <div>
                  <div className="font-display text-4xl md:text-5xl leading-[0.95]">{lang === 'zh' ? f.zh : f.en}</div>
                  <div className="mt-2 text-white/85 text-sm">
                    <span className="font-display text-xl tabular-nums">{f.skins.length}</span> {t('skinsWord')}
                  </div>
                </div>
                <span className="mb-1 h-10 w-10 grid place-items-center rounded-full border border-white/40 text-lg transition group-hover:bg-white group-hover:text-black">→</span>
              </div>
            </button>
          )
        })}
        <div className="shrink-0 w-2" />
      </div>

      <button onClick={() => arrow(-1)} aria-label="prev" className="hidden md:grid place-items-center absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/10 border border-white/20 backdrop-blur hover:bg-white/20 transition">←</button>
      <button onClick={() => arrow(1)} aria-label="next" className="hidden md:grid place-items-center absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/10 border border-white/20 backdrop-blur hover:bg-white/20 transition">→</button>
    </div>
  )
}
