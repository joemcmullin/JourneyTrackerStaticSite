import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════
   FEATURES — three functional micro-UIs, not marketing cards.
   1. Labs      → Diagnostic Shuffler (cards cycle with spring bounce)
   2. Doses     → Cursor Protocol Scheduler (cursor picks dose day)
   3. Progress  → Telemetry Typewriter (live journey feed types itself)
   ═══════════════════════════════════════════════════════════════ */

import { isStatic } from './motion'

const spring = { duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }
const reduced = isStatic

/* ── 1 · Diagnostic Shuffler ─────────────────────────────────── */
const LABS = [
  { label: 'HbA1c', value: '5.4%', trend: '▼ 0.8 since start' },
  { label: 'Total Cholesterol', value: '168', trend: '▼ 22 mg/dL' },
  { label: 'Fasting Glucose', value: '92', trend: '▼ steady 6 wks' },
]

function LabShuffler() {
  const [order, setOrder] = useState([0, 1, 2])
  useEffect(() => {
    if (reduced()) return
    const t = setInterval(() => {
      setOrder((o) => [o[2], o[0], o[1]])
    }, 3000)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="relative h-[190px]" aria-label="Lab results cycling: HbA1c, cholesterol, fasting glucose">
      {order.map((labIdx, pos) => {
        const lab = LABS[labIdx]
        return (
          <motion.div
            key={labIdx}
            animate={{ y: pos * 26, scale: 1 - pos * 0.06, zIndex: 3 - pos, opacity: 1 - pos * 0.25 }}
            transition={spring}
            className="hairline absolute inset-x-0 top-0 rounded-2xl bg-card p-4 shadow-md shadow-black/5"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-text-lo">{lab.label}</span>
              <span className="text-[1.35rem] font-extrabold text-momentum">{lab.value}</span>
            </div>
            <div className="mt-2 font-mono text-[0.72rem] text-accent">{lab.trend}</div>
          </motion.div>
        )
      })}
    </div>
  )
}

/* ── 2 · Cursor Protocol Scheduler ───────────────────────────── */
const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function DoseScheduler() {
  const [phase, setPhase] = useState('idle') // idle → moving → clicked → saving → done
  useEffect(() => {
    if (reduced()) { setPhase('clicked'); return }
    let alive = true
    const loop = async () => {
      const wait = (ms) => new Promise((r) => setTimeout(r, ms))
      while (alive) {
        setPhase('idle'); await wait(900)
        setPhase('moving'); await wait(1100)
        setPhase('clicked'); await wait(900)
        setPhase('saving'); await wait(1100)
        setPhase('done'); await wait(1400)
      }
    }
    loop()
    return () => { alive = false }
  }, [])

  const cursorPos =
    phase === 'idle' ? { x: 180, y: 120, opacity: 0 }
    : phase === 'moving' ? { x: 46, y: 34, opacity: 1 }
    : phase === 'clicked' ? { x: 46, y: 34, opacity: 1, scale: 0.9 }
    : phase === 'saving' ? { x: 150, y: 106, opacity: 1 }
    : { x: 150, y: 106, opacity: 0 }

  return (
    <div className="relative h-[190px] select-none" aria-label="Animated demo: choosing Monday as dose day and saving">
      <div className="hairline rounded-2xl bg-card p-4 shadow-md shadow-black/5">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-text-lo">Dose day</span>
        <div className="mt-3 grid grid-cols-7 gap-1.5">
          {DAYS.map((d, i) => (
            <div
              key={i}
              className={`grid h-9 place-items-center rounded-lg text-[0.8rem] font-bold transition-colors duration-300 ${
                i === 1 && (phase === 'clicked' || phase === 'saving' || phase === 'done')
                  ? 'bg-accent text-white'
                  : 'bg-surface text-text-mid'
              }`}
            >
              {d}
            </div>
          ))}
        </div>
        <div
          className={`mt-3 inline-flex rounded-full px-4 py-1.5 text-[0.78rem] font-bold transition-colors duration-300 ${
            phase === 'done' ? 'bg-momentum text-white' : 'hairline text-text-mid'
          }`}
        >
          {phase === 'done' ? 'Saved ✓' : 'Save'}
        </div>
      </div>
      {/* Animated cursor */}
      <motion.svg
        viewBox="0 0 24 24"
        className="absolute left-0 top-0 h-5 w-5 drop-shadow"
        animate={cursorPos}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        aria-hidden="true"
      >
        <path d="M4 2 L20 12 L12.5 13.5 L9 21 Z" fill="var(--text-hi)" stroke="var(--bg)" strokeWidth="1.5" />
      </motion.svg>
    </div>
  )
}

/* ── 3 · Telemetry Typewriter ────────────────────────────────── */
const FEED_LINES = [
  '> week 12 · weight trend ▼ 1.1 lb/wk — steady',
  '> dose streak: 84 days · longest yet',
  '> milestone: first 15 lb — logged 6:41 AM',
  '> non-scale victory: "old jeans fit."',
]

function TelemetryFeed() {
  const [text, setText] = useState(() => (reduced() ? FEED_LINES.join('\n') : ''))
  const idx = useRef({ line: 0, ch: 0 })
  useEffect(() => {
    if (reduced()) return
    const t = setInterval(() => {
      const { line, ch } = idx.current
      if (line >= FEED_LINES.length) {
        idx.current = { line: 0, ch: 0 }
        setText('')
        return
      }
      const cur = FEED_LINES[line]
      if (ch < cur.length) {
        setText((s) => s + cur[ch])
        idx.current = { line, ch: ch + 1 }
      } else {
        setText((s) => s + '\n')
        idx.current = { line: line + 1, ch: 0 }
      }
    }, 34)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="hairline h-[190px] overflow-hidden rounded-2xl bg-[#0a1f1c] p-4 shadow-md shadow-black/5" aria-label="Live journey feed demo">
      <div className="flex items-center gap-2">
        <span className="status-dot h-2 w-2 rounded-full bg-[#34C759]" aria-hidden="true" />
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[#5f7a72]">Journey feed</span>
      </div>
      <pre className="mt-3 whitespace-pre-wrap font-mono text-[0.78rem] leading-[1.7] text-[#a8bdb6]">
        {text}
        <span className="cursor-blink text-gold">▍</span>
      </pre>
    </div>
  )
}

/* ── Section shell ───────────────────────────────────────────── */
const CARDS = [
  {
    title: 'Labs, finally organized',
    body: 'Every blood panel in one timeline — HbA1c, cholesterol, metabolic markers — side by side across your whole journey. Walk into appointments with the full picture.',
    ui: <LabShuffler />,
  },
  {
    title: 'Doses without memory games',
    body: 'Set your day, log in two taps, and let streaks do the motivating. Your symptom log stays accurate when your provider asks about week three.',
    ui: <DoseScheduler />,
  },
  {
    title: 'Progress you can feel',
    body: 'Weight trends, milestones, and non-scale victories — the whole story of how far you’ve come, told in numbers and in moments.',
    ui: <TelemetryFeed />,
  },
]

export default function Features() {
  return (
    <section id="features" className="relative mx-auto w-[min(94vw,74rem)] py-28">
      <p className="font-mono text-[0.75rem] uppercase tracking-[0.24em] text-accent">What it does</p>
      <h2 className="mt-3 max-w-[24ch] text-[clamp(1.9rem,3.6vw,2.9rem)] font-extrabold leading-tight tracking-tight text-text-hi">
        Three jobs. Done{' '}
        <span className="font-drama italic text-gradient">beautifully.</span>
      </h2>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {CARDS.map((c) => (
          <article
            key={c.title}
            className="hairline rounded-[2rem] bg-card p-6 shadow-lg shadow-black/[0.04] transition-transform duration-300 hover:-translate-y-1"
          >
            {c.ui}
            <h3 className="mt-6 text-[1.15rem] font-extrabold text-text-hi">{c.title}</h3>
            <p className="mt-2.5 text-[0.92rem] leading-relaxed text-text-mid">{c.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
