import { useEffect, useRef } from 'react'
import { isStatic } from './motion'

/**
 * Screens — real captures in device frames, now contained to the same
 * centered column as the neighboring sections. The strip drifts slowly
 * leftward on a seamless loop, and a gradient mask rolls each shot in at
 * the right edge and out at the left. Interacting (drag/scroll/hover)
 * pauses the drift; it resumes after a moment of quiet. Static/reduced
 * motion: no drift, plain scrollable strip.
 */
/* The App Store shelf (1.10.0) in store order, then two screens from the same
   capture run that the store does not carry. */
const SHOTS = [
  { src: '/screenshots/ss4-home.jpg', alt: "Home screen: today's medicines on a dose ring, the next Zepbound dose and estimated level, A1C, weight and a Strides walking map" },
  { src: '/screenshots/ss4-medications.jpg', alt: 'Medications: every medicine on one daily schedule, grouped by the time you take it' },
  { src: '/screenshots/ss4-scan-label.jpg', alt: 'Scan the Label: a sample Ondansetron 4 mg pharmacy label, with the name, strength, form, directions and prescription status found' },
  { src: '/screenshots/ss4-dose-history.jpg', alt: 'Dose History: 236 planned doses, 235 taken, 1 skipped and 0 missed, with each day listed by time' },
  { src: '/screenshots/ss4-levels.jpg', alt: 'Zepbound page: the estimated level chart from the product label, the weekly schedule and the last injection site' },
  { src: '/screenshots/ss4-labs.jpg', alt: 'Labs by marker: Hemoglobin A1C followed at the top, with glucose, cholesterol, triglycerides, ALT and creatinine on their own trend lines' },
  { src: '/screenshots/ss4-injection-sites.jpg', alt: 'Injection Sites: a body map of past sites, with the left arm recommended next' },
  { src: '/screenshots/ss4-reports.jpg', alt: 'Reports: medication, weight progress, lab results and body composition PDFs to preview and share' },
  { src: '/screenshots/ss4-export-data.jpg', alt: 'Export Data: pack your records into one file as a full backup or spreadsheets' },
  { src: '/screenshots/ss4-logbook.jpg', alt: "Logbook: a week strip on top, then each day's walks, weight, labs, blood pressure and wins in one scroll" },
  { src: '/screenshots/ss4-strides.jpg', alt: 'Strides: walking distance by day, with each mapped walk listed below' },
]

export default function Gallery() {
  const trackRef = useRef(null)
  const drifting = SHOTS.concat(SHOTS) // doubled for a seamless wrap

  useEffect(() => {
    if (isStatic()) return
    const track = trackRef.current
    if (!track) return

    let raf = 0
    let paused = false
    let resumeTimer = 0

    const step = () => {
      if (!paused && document.visibilityState === 'visible') {
        track.scrollLeft += 0.6
        const half = track.scrollWidth / 2
        if (track.scrollLeft >= half) track.scrollLeft -= half
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)

    const pause = () => {
      paused = true
      clearTimeout(resumeTimer)
      resumeTimer = setTimeout(() => { paused = false }, 2500)
    }
    const events = ['pointerdown', 'pointerenter', 'wheel', 'touchstart']
    events.forEach((e) => track.addEventListener(e, pause, { passive: true }))

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(resumeTimer)
      events.forEach((e) => track.removeEventListener(e, pause))
    }
  }, [])

  const shots = isStaticSafe() ? SHOTS : drifting

  return (
    <section id="screens" className="relative overflow-hidden bg-surface py-28">
      <div className="mx-auto w-[min(94vw,74rem)]">
        <p className="font-mono text-[0.75rem] uppercase tracking-[0.24em] text-accent">Screens</p>
        <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,2.9rem)] font-extrabold tracking-tight text-text-hi">
          Straight from <span className="font-drama italic text-gradient">the app.</span>
        </h2>

        {/* Contained strip with rolling edge fade */}
        <div className="gallery-fade mt-12">
          <div ref={trackRef} className="gallery-track flex gap-6 overflow-x-auto px-10 pb-6">
            {shots.map((s, i) => (
              <figure key={`${s.src}-${i}`} className="w-[230px] shrink-0" aria-hidden={i >= SHOTS.length}>
                <div className="rounded-[2.2rem] border-[7px] border-[#10201d] bg-[#10201d] shadow-xl shadow-black/15">
                  <picture>
                    <source srcSet={s.src.replace('.jpg', '.webp')} type="image/webp" />
                    <img
                      src={s.src}
                      alt={i < SHOTS.length ? s.alt : ''}
                      loading="lazy"
                      width="540"
                      height="1173"
                      decoding="async"
                      className="w-full rounded-[1.75rem]"
                    />
                  </picture>
                </div>
              </figure>
            ))}
          </div>
        </div>

        <p className="mt-4 font-mono text-[0.75rem] text-text-lo">
          drag to explore · every screen shown is the shipping app
        </p>
      </div>
    </section>
  )
}

/** isStatic, but safe for the initial render pass. */
function isStaticSafe() {
  try { return isStatic() } catch { return false }
}
