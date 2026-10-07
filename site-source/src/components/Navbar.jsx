import { Sun, Moon, Monitor } from 'lucide-react'
import { BrandBadge } from './BrandMark'
import { useTheme } from './useTheme'

const APP_STORE = 'https://apps.apple.com/app/id6760089056'

/**
 * Persistent chrome (2026-10-07, owner decision): the navbar is on screen from
 * first paint and stays fixed while the page scrolls — it no longer hides
 * behind the hero. It now owns the brand lockup (the hero dropped its copy)
 * and carries the site-wide page links, matching the inner pages' header.
 */
export default function Navbar() {
  const { mode, cycle } = useTheme()
  const ThemeIcon = mode === 'light' ? Sun : mode === 'dark' ? Moon : Monitor

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[min(94vw,68rem)] -translate-x-1/2">
      <nav
        aria-label="Primary"
        className="hairline flex items-center justify-between gap-4 rounded-[2rem] bg-[var(--bg)]/70 px-5 py-3 shadow-lg shadow-black/5 backdrop-blur-xl"
      >
        <a href="/" className="shrink-0 hover:-translate-y-[1px]" aria-label="Journey Tracker — home">
          <BrandBadge armed />
        </a>

        <div className="hidden items-center gap-6 text-[0.92rem] font-semibold text-text-mid lg:flex">
          <a href="/features/dose-tracker/" className="hover:-translate-y-[1px] hover:text-text-hi">Dose Tracker</a>
          <a href="/features/labs/" className="hover:-translate-y-[1px] hover:text-text-hi">Labs</a>
          <a href="/medications/" className="hover:-translate-y-[1px] hover:text-text-hi">Medications</a>
          <a href="/how-it-works/" className="hover:-translate-y-[1px] hover:text-text-hi">How It Works</a>
          <a href="#pricing" className="hover:-translate-y-[1px] hover:text-text-hi">Pricing</a>
          <a href="/faq/" className="hover:-translate-y-[1px] hover:text-text-hi">FAQ</a>
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
            className="btn-magnetic relative hidden overflow-hidden rounded-full bg-accent px-5 py-2.5 text-[0.9rem] font-bold text-[#1e2a27] sm:block"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[var(--gold)] to-[var(--accent)] transition-transform duration-500 hover:translate-x-0" aria-hidden="true" />
            <span className="relative">Download</span>
          </a>
        </div>
      </nav>
    </header>
  )
}
