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
const SHOTS = [
  { src: '/screenshots/ss3-home.jpg', alt: 'Home dashboard: next dose countdown, total loss, Strides walking map, followed A1C marker, and weekly recap' },
  { src: '/screenshots/ss3-levels-chart.jpg', alt: 'Estimated medication levels chart — each dose builds and fades' },
  { src: '/screenshots/ss3-dose-counter.jpg', alt: 'Dose counter: three months of logged doses at a glance' },
  { src: '/screenshots/ss3-injection-sites.jpg', alt: 'Injection site rotation on a body map, with the next recommended site' },
  { src: '/screenshots/ss3-labs-by-marker.jpg', alt: 'Labs by marker: every lab test on its own trend line' },
  { src: '/screenshots/ss3-marker-detail.jpg', alt: "Total Cholesterol detail: trend line with dated history on the provider's range" },
  { src: '/screenshots/ss3-logbook.jpg', alt: 'Logbook: the whole journey in one continuous scroll' },
  { src: '/screenshots/ss3-stride.jpg', alt: 'A Stride: mapped walk with route, stats, and photos' },
  { src: '/screenshots/ss3-reports.jpg', alt: 'Reports: therapy, weight, labs, and body composition PDFs for your appointment' },
  { src: '/screenshots/ss3-health-data.jpg', alt: 'Health & Data settings: Apple Health sync and lab record controls' },
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
                  <img
                    src={s.src}
                    alt={i < SHOTS.length ? s.alt : ''}
                    loading="lazy"
                    width="540"
                    height="1173"
                    className="w-full rounded-[1.75rem]"
                  />
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
