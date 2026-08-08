/**
 * Golden-hour close — the brand banner as a full-bleed backdrop with the
 * final ask composed over its clean left side (words OVER the image; the
 * photography is the stage, never the message).
 */
const APP_STORE = 'https://apps.apple.com/app/id6760089056'

export default function CtaBand() {
  return (
    <section className="relative overflow-hidden">
      <img
        src="/brand/banner.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-right"
      />
      {/* Legibility veil, heaviest over the copy side */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#faf7f2]/95 via-[#faf7f2]/80 to-[#faf7f2]/10 dark:from-[#0a1f1c]/95 dark:via-[#0a1f1c]/80 dark:to-[#0a1f1c]/20" />

      <div className="relative z-10 mx-auto w-[min(94vw,74rem)] py-32">
        <h2 className="max-w-[18ch] text-[clamp(2rem,4.2vw,3.4rem)] font-extrabold leading-[1.08] tracking-tight text-text-hi">
          Tomorrow morning is a good time to{' '}
          <span className="font-drama italic text-gradient">start.</span>
        </h2>
        <p className="mt-5 max-w-[42ch] text-[1.02rem] leading-relaxed text-text-mid">
          Free to download. Seven days of everything. Private from the first tap.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <a href={APP_STORE} className="btn-magnetic inline-block" aria-label="Download Journey Tracker on the App Store">
            <img src="/app-store-badge.svg" alt="Download on the App Store" width="180" height="60" className="h-[54px] w-auto" />
          </a>
          {/* Desktop QR — scan instead of click when you're not on the phone */}
          <div className="hidden items-center gap-3.5 lg:flex">
            <div className="rounded-2xl bg-white/85 p-2 shadow-md shadow-black/10 dark:bg-white/90">
              <img src="/qr-app-store.svg" alt="QR code linking to Journey Tracker on the App Store" width="88" height="88" />
            </div>
            <span className="max-w-[14ch] text-[0.82rem] font-semibold leading-snug text-text-mid">
              Or scan with your iPhone
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
