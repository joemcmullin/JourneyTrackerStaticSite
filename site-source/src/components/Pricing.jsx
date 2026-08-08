import { Check } from 'lucide-react'

const APP_STORE = 'https://apps.apple.com/app/id6760089056'

/**
 * Membership — the app's real model: free basic tier, Pro subscription
 * (monthly / annual), and a one-time Lifetime purchase. All billing happens
 * through the App Store; no invented price points on the site.
 */
const TIERS = [
  {
    name: 'Free',
    tag: 'Start here',
    blurb: 'The essentials, free forever.',
    features: [
      'Recent weight history',
      'Basic dose logging',
      'Activity recording',
      'Private, on-device storage',
    ],
    cta: 'Download free',
    featured: false,
  },
  {
    name: 'Pro',
    tag: '7-day free trial',
    blurb: 'The whole journey, unlimited.',
    features: [
      'Unlimited weight & body history',
      'Labs, insights & stall detection',
      'Progress photos & milestones',
      'iCloud sync, imports & widgets',
      'All 8 themes · injection sites',
    ],
    cta: 'Start free trial',
    featured: true,
  },
  {
    name: 'Lifetime',
    tag: 'One-time',
    blurb: 'Pay once. Yours for good.',
    features: [
      'Everything in Pro',
      'No subscription, ever',
      'All future updates included',
      'Billed once via your Apple ID',
    ],
    cta: 'Get Lifetime',
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto w-[min(94vw,74rem)] py-28">
      <p className="font-mono text-[0.75rem] uppercase tracking-[0.24em] text-accent">Membership</p>
      <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,2.9rem)] font-extrabold tracking-tight text-text-hi">
        No pressure. <span className="font-drama italic text-gradient">Just progress.</span>
      </h2>
      <p className="mt-4 max-w-[52ch] text-[0.98rem] leading-relaxed text-text-mid">
        Billed privately through your Apple&nbsp;ID — we never see your payment
        details, and everything you log stays yours either way.
      </p>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {TIERS.map((t) => (
          <article
            key={t.name}
            className={`rounded-[2rem] p-7 transition-transform duration-300 hover:-translate-y-1 ${
              t.featured
                ? 'bg-[#0a1f1c] text-[#faf7f2] shadow-2xl shadow-black/20 ring-2 ring-[var(--gold)] md:scale-[1.04]'
                : 'hairline bg-card shadow-lg shadow-black/[0.04]'
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className={`text-[1.25rem] font-extrabold ${t.featured ? 'text-[#faf7f2]' : 'text-text-hi'}`}>{t.name}</h3>
              <span
                className={`rounded-full px-3 py-1 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] ${
                  t.featured ? 'bg-[var(--gold)]/15 text-gold' : 'bg-[var(--momentum)]/10 text-momentum'
                }`}
              >
                {t.tag}
              </span>
            </div>
            <p className={`mt-2 font-drama text-[1.15rem] italic ${t.featured ? 'text-[#a8bdb6]' : 'text-text-mid'}`}>{t.blurb}</p>

            <ul className={`mt-6 space-y-3 text-[0.92rem] ${t.featured ? 'text-[#cfe0da]' : 'text-text-mid'}`}>
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <Check size={16} strokeWidth={3} className={`mt-0.5 shrink-0 ${t.featured ? 'text-gold' : 'text-momentum'}`} aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href={APP_STORE}
              className={`btn-magnetic mt-8 block rounded-full py-3 text-center text-[0.95rem] font-bold ${
                t.featured ? 'bg-accent text-white' : 'hairline text-text-hi hover:bg-card-hover'
              }`}
            >
              {t.cta}
            </a>
          </article>
        ))}
      </div>

      <p className="mt-8 text-center font-mono text-[0.78rem] text-text-lo">
        Monthly · annual · or one-time lifetime — all through the App Store.
      </p>
    </section>
  )
}
