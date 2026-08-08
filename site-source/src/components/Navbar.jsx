import { useEffect, useRef, useState } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { BrandBadge } from './BrandMark'
import { useTheme } from './useTheme'

const APP_STORE = 'https://apps.apple.com/app/id6760089056'

/**
 * Reveal-on-scroll chrome: fully hidden while the hero owns the top of the
 * page, slides + fades in once the hero's bottom sentinel leaves the viewport.
 * IntersectionObserver — never a pixel threshold.
 */
export default function Navbar() {
  const [shown, setShown] = useState(false)
  const { mode, cycle } = useTheme()
  const armedOnce = useRef(false)
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    const sentinel = document.getElementById('hero-end')
    if (!sentinel) return
    const io = new IntersectionObserver(
      ([e]) => {
        const show = !e.isIntersecting && e.boundingClientRect.top < 0
        setShown(show)
        if (show && !armedOnce.current) {
          armedOnce.current = true
          setArmed(true)
        }
      },
      { threshold: 0 }
    )
    io.observe(sentinel)
    return () => io.disconnect()
  }, [])

  const ThemeIcon = mode === 'light' ? Sun : mode === 'dark' ? Moon : Monitor

  return (
    <header
      className={`fixed top-4 left-1/2 z-50 w-[min(94vw,68rem)] -translate-x-1/2 transition-all duration-500 ${
        shown
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none -translate-y-[130%] opacity-0 invisible'
      }`}
      aria-hidden={!shown}
    >
      <nav
        aria-label="Primary"
        className="hairline flex items-center justify-between gap-4 rounded-[2rem] bg-[var(--bg)]/70 px-5 py-3 shadow-lg shadow-black/5 backdrop-blur-xl"
      >
        <a href="#top" className="shrink-0 hover:-translate-y-[1px]" aria-label="Journey Tracker — back to top">
          <BrandBadge armed={armed} />
        </a>

        <div className="hidden items-center gap-7 text-[0.92rem] font-semibold text-text-mid md:flex">
          <a href="#features" className="hover:-translate-y-[1px] hover:text-text-hi">Features</a>
          <a href="#why" className="hover:-translate-y-[1px] hover:text-text-hi">Why</a>
          <a href="#screens" className="hover:-translate-y-[1px] hover:text-text-hi">Screens</a>
          <a href="#pricing" className="hover:-translate-y-[1px] hover:text-text-hi">Pricing</a>
          <a href="#faqs" className="hover:-translate-y-[1px] hover:text-text-hi">FAQ</a>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={cycle}
            aria-label={`Theme: ${mode}. Click to change.`}
            title={`Theme: ${mode}`}
            className="hairline grid h-10 w-10 place-items-center rounded-full text-text-mid hover:text-text-hi"
          >
            <ThemeIcon size={17} strokeWidth={2.2} />
          </button>
          <a
            href={APP_STORE}
            className="btn-magnetic relative hidden overflow-hidden rounded-full bg-accent px-5 py-2.5 text-[0.9rem] font-bold text-white sm:block"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[var(--gold)] to-[var(--accent)] transition-transform duration-500 hover:translate-x-0" aria-hidden="true" />
            <span className="relative">Download</span>
          </a>
        </div>
      </nav>
    </header>
  )
}
