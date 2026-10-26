import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════
   FEATURES — three functional micro-UIs, not marketing cards.
   1. Medicines → Today's Doses (each dose ticks over to taken)
   2. Labs      → Diagnostic Shuffler (cards cycle with spring bounce)
   3. Feedback  → Recap Typewriter (today and this week type themselves)
   Owner decision 2026-10-26: the three pillars are every medicine, labs, and
   daily and weekly feedback, with the rest of the record listed below.
   ═══════════════════════════════════════════════════════════════ */

import { isStatic } from './motion'

const spring = { duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }
const reduced = isStatic

/* ── 1 · Today's Doses ───────────────────────────────────────── */
/* The app's sample medicines: Zepbound is the one brand, the rest go by generic name. */
const MEDS = [
  { time: '08:00', name: 'Zepbound', dose: '2.5 mg' },
  { time: '08:00', name: 'Lisinopril', dose: '10 mg' },
  { time: '08:00', name: 'Vitamin D3', dose: '2000 IU' },
  { time: '20:00', name: 'Magnesium Glycinate', dose: '120 mg' },
]

function TodaysDoses() {
  const [taken, setTaken] = useState(() => (reduced() ? 3 : 0))
  useEffect(() => {
    if (reduced()) return
    let alive = true
    const loop = async () => {
      const wait = (ms) => new Promise((r) => setTimeout(r, ms))
      while (alive) {
        setTaken(0); await wait(1000)
        for (let n = 1; n <= 3 && alive; n++) { setTaken(n); await wait(900) }
        await wait(2400)
      }
    }
    loop()
    return () => { alive = false }
  }, [])

  return (
    <div className="hairline h-[190px] rounded-2xl bg-card p-4 shadow-md shadow-black/5" aria-label="Animated demo: today's medicines checked off as taken">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-text-lo">Today · Thu</span>
        <span className="font-mono text-[0.7rem] text-momentum">{taken} of {MEDS.length} taken</span>
      </div>
      <ul className="mt-3 space-y-2.5">
        {MEDS.map((m, i) => (
          <li key={m.name} className="flex items-center gap-2.5">
            <span className="w-9 shrink-0 font-mono text-[0.68rem] text-text-lo">{m.time}</span>
            <span className="min-w-0 flex-1 truncate text-[0.82rem] font-bold text-text-hi">
              {m.name} <span className="font-normal text-text-lo">{m.dose}</span>
            </span>
            <span
              aria-hidden="true"
              className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[0.62rem] font-bold transition-colors duration-300 ${
                i < taken ? 'bg-momentum text-white' : 'hairline text-transparent'
              }`}
            >
              ✓
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ── 2 · Diagnostic Shuffler ─────────────────────────────────── */
/* One card per way results arrive: Apple Health, a scanned report, typed in. */
const LABS = [
  { label: 'Hemoglobin A1C', value: '4.9%', trend: '5 readings · from Apple Health' },
  { label: 'LDL Cholesterol', value: '93.1', trend: '4 readings · from a scanned report' },
  { label: 'Blood Glucose', value: '86.2', trend: '6 readings · typed in' },
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
    <div className="relative h-[190px]" aria-label="Lab results cycling: Hemoglobin A1C, LDL cholesterol, blood glucose">
      {order.map((labIdx, pos) => {
        const lab = LABS[labIdx]
        return (
          <motion.div
            key={labIdx}
            aria-hidden={pos !== 0}
            animate={{ y: pos * 26, scale: 1 - pos * 0.06, zIndex: 3 - pos, opacity: 1 - pos * 0.25 }}
            transition={spring}
            className="hairline absolute inset-x-0 top-0 rounded-2xl bg-card p-4 shadow-md shadow-black/5"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-text-lo">{lab.label}</span>
              <span className="text-[1.35rem] font-extrabold text-momentum">{lab.value}</span>
            </div>
            <div className="mt-2 font-mono text-[0.72rem] text-[#a54a0e] dark:text-gold">{lab.trend}</div>
          </motion.div>
        )
      })}
    </div>
  )
}

/* ── 3 · Recap Typewriter ────────────────────────────────────── */
/* Today's line, then the weekly recap's own numbers from the app's sample week.
   Keep each line under ~34 characters so it never wraps in a narrow card. */
const FEED_LINES = [
  '> today · 3 of 4 doses taken',
  '> this week · weight ▼ 0.3 lb',
  '> 48 doses · BP avg 118/75',
  '> 8 new lab results · 4 Strides',
  '> 1 win logged this week',
]

function RecapFeed() {
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
    <div className="hairline h-[190px] overflow-hidden rounded-2xl bg-[#0a1f1c] p-4 shadow-md shadow-black/5" aria-label="Recap demo: today and this week, typed out line by line">
      <div className="flex items-center gap-2">
        <span className="status-dot h-2 w-2 rounded-full bg-[#34C759]" aria-hidden="true" />
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-text-lo">Your recap</span>
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
    title: 'Every medicine, one schedule',
    body: 'Your GLP-1, tablets, vitamins and supplements on one daily schedule. Scan the pharmacy label to add one. Every dose counts as taken, skipped or missed.',
    ui: <TodaysDoses />,
  },
  {
    title: 'Labs, finally organized',
    body: 'Every panel in one timeline. A1C, cholesterol and glucose side by side, from Apple Health, a scanned report or typed in.',
    ui: <LabShuffler />,
  },
  {
    title: 'Feedback every day and every week',
    body: 'Weight, doses, symptoms, blood pressure and Strides land in one record. Home shows your day. The weekly recap shows how the week went.',
    ui: <RecapFeed />,
  },
]

/* Everything else the record holds, so the three cards never read as the whole app. */
const TRACKED = [
  'Weight', 'Body measurements', 'Symptoms', 'Blood pressure', 'Fasting',
  'Hydration', 'Protein', 'Strides', 'Progress photos', 'Non-scale victories',
]

export default function Features() {
  return (
    <section id="features" className="relative mx-auto w-[min(94vw,74rem)] py-28">
      <p className="font-mono text-[0.75rem] uppercase tracking-[0.24em] text-accent">What it does</p>
      <h2 className="mt-3 max-w-[24ch] text-[clamp(1.9rem,3.6vw,2.9rem)] font-extrabold leading-tight tracking-tight text-text-hi">
        Track everything.{' '}
        <span className="font-drama italic text-gradient">See how it’s going.</span>
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

      <div className="mt-10">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-text-lo">Also in the record</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {TRACKED.map((t) => (
            <li key={t} className="hairline rounded-full bg-card px-3.5 py-1.5 text-[0.85rem] font-semibold text-text-mid">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
