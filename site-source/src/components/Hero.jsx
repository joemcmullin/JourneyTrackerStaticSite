import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { GlyphTile, Wordmark } from './BrandMark'
import { isStatic, runWhenVisible } from './motion'

const APP_STORE = 'https://apps.apple.com/app/id6760089056'

/**
 * The Opening Shot — 100dvh dawn scene.
 * Left: large brand lockup (draw-on), the headline, App Store CTA.
 * Right: real app UI in a device frame floating over golden aurora.
 * The navbar stays hidden while this section is on screen.
 */
export default function Hero() {
  const root = useRef(null)

  useEffect(() => {
    if (isStatic()) return
    return runWhenVisible(() => {
      const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-hero-stagger]',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.08, delay: 0.1 }
      )
      gsap.fromTo(
        '[data-hero-device]',
        { y: 60, opacity: 0, rotate: 4 },
        { y: 0, opacity: 1, rotate: 0, duration: 1.2, ease: 'power3.out', delay: 0.35 }
      )
      gsap.to('[data-hero-device]', {
        y: -14,
        duration: 3.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.6,
        })
      }, root)
      return () => ctx.revert()
    })
  }, [])

  return (
    <section ref={root} id="top" className="relative flex min-h-[100dvh] items-center overflow-hidden">
      {/* Dawn aurora — layered brand-gradient glows over the cream/teal bg */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute -right-[15%] -top-[25%] h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(circle,rgba(245,164,85,0.4),transparent_65%)]" />
        <div className="absolute right-[20%] top-[45%] h-[50vh] w-[50vh] rounded-full bg-[radial-gradient(circle,rgba(232,121,42,0.22),transparent_65%)]" />
        <div className="absolute -left-[10%] bottom-[-30%] h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,rgba(25,126,114,0.25),transparent_65%)]" />
        {/* Horizon line */}
        <div className="absolute inset-x-0 bottom-0 h-[38vh] bg-gradient-to-t from-[var(--bg-surface)] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto grid w-[min(94vw,74rem)] items-center gap-14 py-24 lg:grid-cols-[1.15fr_0.85fr]">
        {/* ── Copy column ─────────────────────────────────── */}
        <div>
          {/* Large brand lockup — the hero owns the identity up here */}
          <div data-hero-stagger className="mb-10 flex items-center gap-4">
            <GlyphTile size={72} armed />
            <div className="flex flex-col">
              <Wordmark className="text-[1.7rem] leading-none" />
              <span className="mt-1.5 font-mono text-[0.72rem] uppercase tracking-[0.22em] text-text-lo">
                GLP-1 companion · iPhone · iPad · Mac
              </span>
            </div>
          </div>

          <h1 data-hero-stagger className="max-w-[13ch] text-[clamp(2.5rem,5.2vw,4.4rem)] font-extrabold leading-[1.02] tracking-tight text-text-hi">
            The private companion for
          </h1>
          <p data-hero-stagger className="font-drama italic text-[clamp(3.4rem,8.5vw,7.5rem)] leading-[1.05] text-gradient">
            your comeback.
          </p>

          <p data-hero-stagger className="mt-7 max-w-[46ch] text-[1.08rem] leading-relaxed text-text-mid">
            Weight, doses, labs, walks, and every hard-won milestone of your
            GLP-1 journey — organized in one place that answers to nobody but you.
          </p>

          <div data-hero-stagger className="mt-9 flex flex-wrap items-center gap-5">
            <a href={APP_STORE} className="btn-magnetic" aria-label="Download Journey Tracker on the App Store">
              <img
                src="/app-store-badge.svg"
                alt="Download on the App Store"
                width="180"
                height="60"
                className="h-[52px] w-auto"
              />
            </a>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#34C759]/10 px-4 py-2 text-[0.85rem] font-bold text-[#1e8f43] dark:text-[#4cd674]">
              <span className="status-dot h-2 w-2 rounded-full bg-[#34C759]" aria-hidden="true" />
              Available now
            </span>
          </div>

          <p data-hero-stagger className="mt-5 font-mono text-[0.8rem] text-text-lo">
            7-day free trial · billed privately through your Apple&nbsp;ID · your data never touches our servers
          </p>

          {/* Desktop QR — on a computer, the fastest path is the phone camera */}
          <div data-hero-stagger className="mt-8 hidden items-center gap-4 lg:flex">
            <div className="hairline rounded-2xl bg-card p-2.5 shadow-md shadow-black/5">
              <img src="/qr-app-store.svg" alt="QR code linking to Journey Tracker on the App Store" width="104" height="104" />
            </div>
            <span className="max-w-[16ch] text-[0.85rem] font-semibold leading-snug text-text-mid">
              On your computer? Scan with your iPhone to download.
            </span>
          </div>
        </div>

        {/* ── Device column — real app UI, no stock photography ── */}
        <div data-hero-device className="relative mx-auto w-[min(78vw,320px)] lg:w-[340px]">
          <div aria-hidden="true" className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(245,164,85,0.35),transparent_70%)] blur-2xl" />
          <div className="relative rounded-[3rem] border-[10px] border-[#10201d] bg-[#10201d] shadow-2xl shadow-black/30">
            {/* Dynamic Island */}
            <div aria-hidden="true" className="absolute left-1/2 top-3 z-10 h-[26px] w-[96px] -translate-x-1/2 rounded-full bg-black" />
            <img
              src="/screenshots/ss2-home-strides.jpg"
              alt="Journey Tracker home screen: dose streak, next dose, current weight, Strides step tracking, and a weekly recap"
              className="w-full rounded-[2.4rem]"
              width="590"
              height="1278"
            />
          </div>
          <figcaption className="mt-4 text-center font-mono text-[0.72rem] uppercase tracking-[0.18em] text-text-lo">
            Real app · shipping today
          </figcaption>
        </div>
      </div>

      {/* Sentinel: the navbar reveals when this leaves the viewport */}
      <div id="hero-end" aria-hidden="true" className="absolute bottom-0 h-px w-px" />
    </section>
  )
}
