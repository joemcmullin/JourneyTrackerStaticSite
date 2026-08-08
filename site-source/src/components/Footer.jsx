import { BrandBadge } from './BrandMark'

const SITE = 'https://journeytracker.app'

export default function Footer() {
  return (
    /* The `dark` class scopes the dark token set to the footer — it is always
       a dark surface, so the wordmark stays legible in both site themes. */
    <footer className="dark rounded-t-[4rem] bg-[#081815] px-6 pb-10 pt-20 text-[#a8bdb6]">
      <div className="mx-auto grid w-[min(94vw,74rem)] gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <BrandBadge size={38} textClass="text-[1.15rem]" />
          <p className="mt-4 max-w-[36ch] text-[0.9rem] leading-relaxed text-[#5f7a72]">
            The private GLP-1 companion for iPhone, iPad &amp; Mac. Your journey,
            your data, your comeback.
          </p>
        </div>

        <nav aria-label="Product">
          <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#5f7a72]">Product</h3>
          <ul className="mt-4 space-y-2.5 text-[0.9rem] font-medium">
            <li><a className="hover:text-[#faf7f2]" href="#features">Features</a></li>
            <li><a className="hover:text-[#faf7f2]" href="#screens">Screens</a></li>
            <li><a className="hover:text-[#faf7f2]" href="#pricing">Pricing</a></li>
            <li><a className="hover:text-[#faf7f2]" href="#faqs">FAQs</a></li>
            <li><a className="hover:text-[#faf7f2]" href="https://apps.apple.com/app/id6760089056">App Store</a></li>
          </ul>
        </nav>

        <nav aria-label="Support">
          <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#5f7a72]">Support</h3>
          <ul className="mt-4 space-y-2.5 text-[0.9rem] font-medium">
            <li><a className="hover:text-[#faf7f2]" href={`${SITE}/support.html`}>Help &amp; contact</a></li>
            <li><a className="hover:text-[#faf7f2]" href={`${SITE}/accessibility.html`}>Accessibility</a></li>
          </ul>
        </nav>

        <nav aria-label="Legal">
          <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#5f7a72]">Legal</h3>
          <ul className="mt-4 space-y-2.5 text-[0.9rem] font-medium">
            <li><a className="hover:text-[#faf7f2]" href={`${SITE}/privacy.html`}>Privacy</a></li>
            <li><a className="hover:text-[#faf7f2]" href={`${SITE}/terms.html`}>Terms</a></li>
            <li><a className="hover:text-[#faf7f2]" href={`${SITE}/health-data-privacy.html`}>Health data</a></li>
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-16 flex w-[min(94vw,74rem)] flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-6">
        <span className="font-mono text-[0.72rem] text-[#5f7a72]">
          © {new Date().getFullYear()} Apex Development Studio LLC
        </span>
        <span className="inline-flex items-center gap-2 font-mono text-[0.72rem] text-[#5f7a72]">
          <span className="status-dot h-2 w-2 rounded-full bg-[#34C759]" aria-hidden="true" />
          System operational
        </span>
      </div>
    </footer>
  )
}
