/**
 * Static-mode gate. When true, every scripted animation is skipped and the
 * page rests in its final, fully-visible state. True for:
 *  - prefers-reduced-motion users
 *  - ?static=1 (headless QA + OG-card rendering)
 * Entrance animations must also wait for the tab to be visible — see runWhenVisible.
 */
export function isStatic() {
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    new URLSearchParams(window.location.search).has('static')
  )
}

/**
 * Run an entrance animation only once the document is actually visible.
 * If the tab never becomes visible (scraper, prerender), nothing runs and
 * the resting state — fully visible — is what gets captured.
 * Returns a cleanup function.
 */
export function runWhenVisible(run) {
  if (document.visibilityState === 'visible') return run() || (() => {})
  let cleanup = () => {}
  const onVis = () => {
    if (document.visibilityState !== 'visible') return
    document.removeEventListener('visibilitychange', onVis)
    cleanup = run() || (() => {})
  }
  document.addEventListener('visibilitychange', onVis)
  return () => {
    document.removeEventListener('visibilitychange', onVis)
    cleanup()
  }
}
