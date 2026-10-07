import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { isStatic } from './motion'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════════════════════════════
   PROTOCOL — "Sticky Stacking Archive"
   Three full-screen cards pin and stack: Track → Understand → Celebrate.
   Each card carries a real app screenshot in a phone frame. With reduced motion the
   cards simply flow as a normal vertical stack.
   ═══════════════════════════════════════════════════════════════ */

/* Owner decision 2026-10-07: the three beats show the real app, not motifs.
   Same phone framing as the Gallery, one screenshot per beat. */
function Shot({ src, alt }) {
  return (
    <div className="w-[min(60vw,250px)] rounded-[2.2rem] border-[7px] border-[#10201d] bg-[#10201d] shadow-xl shadow-black/15">
      <picture>
        <source srcSet={src.replace('.jpg', '.webp')} type="image/webp" />
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          width="540"
          height="1173"
          className="w-full rounded-[1.75rem]"
        />
      </picture>
    </div>
  )
}

const STEPS = [
  {
    n: '01',
    title: 'Track every signal',
    body: 'Weight, body composition, doses, symptoms, labs, photos, walks — two-tap logging and HealthKit sync mean the record keeps itself.',
    motif: <Shot src="/screenshots/ss3-labs-by-marker.jpg" alt="Labs by marker: every lab test on its own trend line" />,
  },
  {
    n: '02',
    title: 'See what’s working',
    body: 'Trends, stall detection, and dose-response insights turn months of entries into answers you can bring to your next appointment.',
    motif: <Shot src="/screenshots/ss3-weekly-recap.jpg" alt="Weekly recap: the last 7 days, highlights, and the week at a glance" />,
  },
  {
    n: '03',
    title: 'Celebrate every win',
    body: 'Milestones, streaks, and non-scale victories — because the jeans that fit again deserve a place in the record too.',
    motif: <Shot src="/screenshots/ss3-achievements.jpg" alt="Achievements: medallion streaks for weight, doses, and hydration" />,
  },
]

export default function Protocol() {
  const root = useRef(null)

  useEffect(() => {
    if (isStatic()) return
    const mm = window.matchMedia('(max-width: 767px)')
    if (mm.matches) return // stack normally on mobile
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('[data-step]')
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top top+=90',
          end: i === cards.length - 1 ? 'bottom top' : () => `+=${card.offsetHeight}`,
          pin: i !== cards.length - 1,
          pinSpacing: false,
        })
        if (i > 0) {
          // The card underneath stays crisp until the incoming card actually
          // overlaps it — recede only during the top half of the handoff, so
          // a pinned card is never blurry while it's the one being read.
          gsap.to(cards[i - 1].querySelector('[data-step-inner]'), {
            scale: 0.93,
            opacity: 0.55,
            filter: 'blur(10px)',
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top 48%', end: 'top top+=90', scrub: true },
          })
        }
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative mx-auto w-[min(94vw,74rem)] py-28">
      <p className="font-mono text-[0.75rem] uppercase tracking-[0.24em] text-accent">The rhythm</p>
      <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,2.9rem)] font-extrabold tracking-tight text-text-hi">
        Three beats, <span className="font-drama italic text-gradient">every week.</span>
      </h2>

      <div className="mt-14 space-y-8">
        {STEPS.map((s) => (
          <div key={s.n} data-step>
            <div
              data-step-inner
              className="hairline grid min-h-[54vh] items-center gap-10 rounded-[3rem] bg-card p-10 shadow-xl shadow-black/[0.05] md:grid-cols-[1fr_auto] md:p-16"
            >
              <div>
                <span className="font-mono text-[0.85rem] font-semibold text-accent">{s.n}</span>
                <h3 className="mt-3 text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold tracking-tight text-text-hi">{s.title}</h3>
                <p className="mt-4 max-w-[46ch] text-[1.02rem] leading-relaxed text-text-mid">{s.body}</p>
              </div>
              <div className="justify-self-center">{s.motif}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
