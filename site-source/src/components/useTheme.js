import { useCallback, useEffect, useState } from 'react'

const ORDER = ['light', 'dark', 'system']

function systemPrefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function apply(mode) {
  const dark = mode === 'dark' || (mode === 'system' && systemPrefersDark())
  document.documentElement.classList.toggle('dark', dark)
}

/** Light → Dark → System cycle, persisted, live OS tracking on System. */
export function useTheme() {
  const [mode, setMode] = useState(() => localStorage.getItem('theme') || 'system')

  useEffect(() => {
    apply(mode)
    localStorage.setItem('theme', mode)
    if (mode !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => apply('system')
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [mode])

  const cycle = useCallback(() => {
    setMode((m) => ORDER[(ORDER.indexOf(m) + 1) % ORDER.length])
  }, [])

  return { mode, cycle }
}
