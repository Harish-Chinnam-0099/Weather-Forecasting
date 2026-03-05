import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sun, Moon } from 'lucide-react'

type ThemeMode = 'light' | 'dark'

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyThemeMode(mode: ThemeMode) {
  document.documentElement.classList.remove('light', 'dark')
  document.documentElement.classList.add(mode)
  document.documentElement.setAttribute('data-theme', mode)
  document.documentElement.style.colorScheme = mode
}

const STYLES = `
  @keyframes spin-in {
    from { transform: rotate(-90deg) scale(0.5); opacity: 0; }
    to   { transform: rotate(0deg)   scale(1);   opacity: 1; }
  }
  @keyframes spin-out {
    from { transform: rotate(0deg)  scale(1);   opacity: 1; }
    to   { transform: rotate(90deg) scale(0.5); opacity: 0; }
  }
  .icon-enter { animation: spin-in  0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
  .icon-exit  { animation: spin-out 0.25s ease-in forwards; }
  .icon-wrap  { display: flex; align-items: center; justify-content: center; transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
  .theme-toggle-btn:hover .icon-wrap { transform: scale(1.2) rotate(15deg); }
`

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('light')
  const [animating, setAnimating] = useState(false)
  const [prevMode, setPrevMode] = useState<ThemeMode | null>(null)

  useEffect(() => {
    const initial = getInitialMode()
    setMode(initial)
    applyThemeMode(initial)
  }, [])

  function toggleMode() {
    const next: ThemeMode = mode === 'light' ? 'dark' : 'light'
    setPrevMode(mode)
    setAnimating(true)
    setTimeout(() => {
      setMode(next)
      applyThemeMode(next)
      window.localStorage.setItem('theme', next)
      setAnimating(false)
      setPrevMode(null)
    }, 250)
  }

  const displayMode = animating && prevMode ? prevMode : mode
  const label = `Switch to ${mode === 'light' ? 'dark' : 'light'} mode`

  return (
    <>
      <style>{STYLES}</style>
      <Button
        variant="outline"
        size="icon"
        onClick={toggleMode}
        aria-label={label}
        title={label}
        className="theme-toggle-btn rounded-full"
      >
        <span className={`icon-wrap ${animating ? 'icon-exit' : 'icon-enter'}`}>
          {displayMode === 'light'
            ? <Sun className="h-6 w-6 text-yellow-500" />
            : <Moon className="h-6 w-6 text-blue-500" />}
        </span>
      </Button>
    </>
  )
}