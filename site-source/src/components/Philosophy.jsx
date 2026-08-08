import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { isStatic } from './motion'

gsap.registerPlugin(ScrollTrigger)

/**
 * The Manifesto — full-width horizon-teal band. Brand teal-depth texture
 * parallaxes slowly behind; golden particles drift above. The differentiating
 * statement reveals word by word on scroll.
 * Words are visible at rest; the reveal only runs when motion is allowed.
 */
export default function Philosophy() {
  const root = useRef(null)

  useEffect(() => {
    if (isStatic()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-word]',
        { opacity: 0.12, y: 8 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          ease: 'power2.inOut',
          // Fully legible by mid-viewport: reveal runs while the block rises
          // from the fold to center, not while the reader is already on it.
          scrollTrigger: { trigger: '[data-manifesto]', start: 'top 88%', end: 'top 52%', scrub: true },
        }
      )
      gsap.to('[data-parallax]', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const line = 'We track the whole journey — the doses, the labs, the walks, the wins.'

  return (
    <section ref={root} id="why" className="relative overflow-hidden bg-[#0a1f1c] py-32 text-[#faf7f2]">
      <img
        data-parallax
        src="/brand/texture-teal-depth.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-[120%] w-full object-cover opacity-60"
      />
      <img
        src="/brand/overlay-golden-particles.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-screen"
      />

      <div className="relative z-10 mx-auto w-[min(94vw,64rem)]">
        <p className="font-mono text-[0.75rem] uppercase tracking-[0.24em] text-gold">Why it exists</p>

        <p className="mt-10 text-[clamp(1.05rem,2vw,1.4rem)] font-medium leading-relaxed text-[#a8bdb6]">
          Most weight-loss apps track one number — and make you feel like one.
        </p>

        <p data-manifesto className="mt-8 max-w-[24ch] font-drama italic text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.15]">
          {line.split(' ').map((w, i) => (
            <span key={i} data-word className="inline-block">
              {['wins.'].includes(w) ? <span className="text-gradient">{w}</span> : w}
              &nbsp;
            </span>
          ))}
        </p>

        <p className="mt-10 max-w-[52ch] text-[1rem] leading-relaxed text-[#a8bdb6]">
          Because a GLP-1 journey is bigger than a scale. It's the morning you
          logged anyway. The lab result that finally moved. The jeans that fit.
          Journey Tracker keeps all of it — privately, on your device.
        </p>
      </div>
    </section>
  )
}
