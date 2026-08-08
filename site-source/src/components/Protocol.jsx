import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { isStatic } from './motion'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════════════════════════════
   PROTOCOL — "Sticky Stacking Archive"
   Three full-screen cards pin and stack: Track → Understand → Celebrate.
   Each card carries its own living SVG motif. With reduced motion the
   cards simply flow as a normal vertical stack.
   ═══════════════════════════════════════════════════════════════ */

/* Motif 1: slowly rotating concentric progress rings */
function Rings() {
  return (
    <svg viewBox="0 0 200 200" className="h-44 w-44" aria-hidden="true">
      <g className="origin-center animate-[spin_24s_linear_infinite] motion-reduce:animate-none">
        {[80, 62, 44].map((r, i) => (
          <circle
            key={r}
            cx="100" cy="100" r={r}
            fill="none"
            stroke={i === 1 ? 'var(--accent)' : 'var(--momentum)'}
            strokeOpacity={0.85 - i * 0.2}
            strokeWidth="3"
            strokeDasharray={`${r * 4.4} ${r * 2}`}
            strokeLinecap="round"
          />
        ))}
      </g>
      <circle cx="100" cy="100" r="7" fill="var(--gold)" />
    </svg>
  )
}

/* Motif 2: scanning laser line across a dot grid */
function Scanner() {
  return (
    <svg viewBox="0 0 200 200" className="h-44 w-44" aria-hidden="true">
      {Array.from({ length: 7 }).map((_, row) =>
        Array.from({ length: 7 }).map((_, col) => (
          <circle key={`${row}-${col}`} cx={30 + col * 23.5} cy={30 + row * 23.5} r="3" fill="var(--momentum)" opacity="0.35" />
        ))
      )}
      <rect x="20" y="0" width="160" height="3.5" rx="2" fill="var(--accent)" className="animate-[scan_3.2s_ease-in-out_infinite] motion-reduce:animate-none">
      </rect>
      <style>{`@keyframes scan { 0%,100% { transform: translateY(24px); } 50% { transform: translateY(172px); } }`}</style>
    </svg>
  )
}

/* Motif 3: pulsing milestone waveform (EKG of the journey) */
function Waveform() {
  return (
    <svg viewBox="0 0 220 120" className="h-44 w-52" aria-hidden="true">
      <path
        d="M 5 70 L 45 70 L 60 40 L 75 92 L 90 55 L 110 70 L 150 70 L 163 30 L 176 70 L 215 70"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="100"
        strokeDasharray="100"
        className="animate-[wave_2.8s_ease-in-out_infinite] motion-reduce:animate-none"
      />
      <style>{`@keyframes wave { 0% { stroke-dashoffset: 100; } 55%, 100% { stroke-dashoffset: 0; } }`}</style>
      <circle cx="163" cy="30" r="6" fill="var(--gold)" />
    </svg>
  )
}

const STEPS = [
  {
    n: '01',
    title: 'Track every signal',
    body: 'Weight, body composition, doses, symptoms, labs, photos, walks — two-tap logging and HealthKit sync mean the record keeps itself.',
    motif: <Rings />,
  },
  {
    n: '02',
    title: 'See what’s working',
    body: 'Trends, stall detection, and dose-response insights turn months of entries into answers you can bring to your next appointment.',
    motif: <Scanner />,
  },
  {
    n: '03',
    title: 'Celebrate every win',
    body: 'Milestones, streaks, and non-scale victories — because the jeans that fit again deserve a place in the record too.',
    motif: <Waveform />,
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
