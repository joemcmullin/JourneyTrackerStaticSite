/**
 * Brand mark system — the real Journey Tracker mark (victory figure over the
 * sunrise arrow, artwork supplied by Joe), not a redrawn glyph.
 *  - /brand/logo-tile.png  · white figure + orange arrow on dark squircle (chrome, favicon)
 *  - /brand/logo-mark.png  · teal figure + orange arrow, transparent (light surfaces)
 * `armed` plays a soft rise-in on the tile (CSS, reduced-motion safe).
 */

export function GlyphTile({ size = 48, armed = false, className = '' }) {
  return (
    <img
      src="/brand/logo-tile.png"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={`${armed ? 'mark-enter' : ''} ${className}`}
      style={{ width: size, height: size }}
    />
  )
}

export function Wordmark({ className = '' }) {
  return (
    <span className={`font-sans font-extrabold tracking-tight ${className}`}>
      <span className="text-text-hi">Journey</span>{' '}
      <span className="text-gradient">Tracker</span>
    </span>
  )
}

/** Compact lockup for navbar + footer. */
export function BrandBadge({ armed = false, size = 34, textClass = 'text-[1.05rem]' }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <GlyphTile size={size} armed={armed} />
      <Wordmark className={textClass} />
    </span>
  )
}
