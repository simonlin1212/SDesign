import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import GradientCanvas from './components/GradientCanvas'
import FamilyCarousel from './components/FamilyCarousel'
import FamilyPage from './components/FamilyPage'
import { useI18n } from './i18n'
import data from './data/skins.json'

gsap.registerPlugin(ScrollTrigger)
const families = (data as any).families
const parseHash = () => {
  const m = location.hash.match(/^#\/f\/(.+)$/)
  return m ? decodeURIComponent(m[1]) : 'home'
}

export default function App() {
  const root = useRef<HTMLDivElement>(null)
  const { lang, toggle, t } = useI18n()
  const [view, setView] = useState<string>(parseHash)

  // Lenis 丝滑滚动
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    ;(window as any).__lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(tick); lenis.destroy() }
  }, [])

  // hash 路由(每个类别一个独立页面,浏览器前进/后退可用)
  useEffect(() => {
    const on = () => { setView(parseHash()); (window as any).__lenis?.scrollTo(0, { immediate: true }) }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])

  // 首页进场动效
  useEffect(() => {
    if (view !== 'home') return
    const ctx = gsap.context(() => {
      gsap.from('.hero-reveal', { yPercent: 60, opacity: 0, duration: 1.2, ease: 'power3.out', stagger: 0.12, delay: 0.1 })
      gsap.from('.sec-title', { scrollTrigger: { trigger: '.sec-title', start: 'top 92%', once: true }, y: 40, opacity: 0, duration: 1, ease: 'power3.out' })
    }, root)
    const r = () => ScrollTrigger.refresh()
    const tt = setTimeout(r, 400)
    window.addEventListener('load', r)
    return () => { clearTimeout(tt); window.removeEventListener('load', r); ctx.revert() }
  }, [view])

  const go = (key: string) => { location.hash = key && key !== 'home' ? `#/f/${key}` : '#/' }
  const fam = view !== 'home' ? families.find((f: any) => f.key === view) : null

  return (
    <div ref={root} className="relative">
      <GradientCanvas />
      <div className="pointer-events-none fixed inset-0 z-0 bg-black/20" />

      <div className="relative z-10">
        <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 text-sm">
          <button onClick={() => go('home')} className="font-display text-lg tracking-tight">SDesign</button>
          <div className="flex items-center gap-4">
            <span className="text-white/60 hidden sm:block">{t('author')}</span>
            <button onClick={toggle} className="rounded-full border border-white/25 px-3 py-1 text-xs font-medium hover:bg-white hover:text-black transition">
              {lang === 'zh' ? 'EN' : '中'}
            </button>
          </div>
        </header>

        {fam ? (
          <FamilyPage family={fam} onBack={() => go('home')} />
        ) : (
          <>
            <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
              <p className="hero-reveal text-[11px] md:text-sm tracking-[0.45em] uppercase text-white/55 mb-7">Anti-Slop Design Systems</p>
              <h1 className="hero-reveal font-display leading-[0.88] tracking-tight text-[clamp(3.5rem,15vw,13rem)] drop-shadow-[0_4px_40px_rgba(0,0,0,0.4)]">SDesign</h1>
              <p className="hero-reveal mt-7 text-[clamp(1.15rem,3vw,2rem)] font-medium">
                {t('taglineA')} <span style={{ color: '#ff5a1f' }}>{t('taglineHi')}</span> {t('taglineB')}
              </p>
              <p className="hero-reveal mt-3 text-white/65 text-[clamp(0.9rem,1.6vw,1.05rem)]">{t('sub')}</p>
              <div className="hero-reveal mt-12 flex items-center gap-4">
                <a className="rounded-full bg-white text-black font-semibold px-7 py-3 hover:bg-white/85 transition" href="#families">{t('browse')}</a>
                <a className="rounded-full border border-white/25 px-7 py-3 text-white/85 hover:bg-white/10 transition" href="https://github.com/simonlin1212/SDesign" target="_blank" rel="noopener">GitHub</a>
              </div>
              <div className="scroll-cue absolute bottom-8 text-white/50 text-xs tracking-widest">↓ {t('scroll')}</div>
            </section>

            <section id="families" className="relative py-24 md:py-32">
              <div className="px-6 md:px-10 max-w-6xl mx-auto mb-12">
                <h2 className="sec-title font-display text-[clamp(2rem,6vw,4.5rem)] leading-tight">
                  {t('secTitleA')}<br /><span className="text-white/45">{t('secTitleB')}</span>
                </h2>
                <p className="sec-title mt-5 max-w-2xl text-white/65 text-lg">{t('secDesc')}</p>
              </div>
              <FamilyCarousel families={families} onOpen={go} />
            </section>

            <footer className="relative px-6 py-16 text-center text-white/45 text-sm">{t('footer')}</footer>
          </>
        )}
      </div>
    </div>
  )
}
