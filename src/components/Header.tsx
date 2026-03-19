import { Link } from "@tanstack/react-router"
import ThemeToggle from "./ThemeToggle"
import { useEffect, useState } from "react"

export default function Header() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const formattedDate = now.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  })

  const formattedTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* Logo + Title */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <img
              src="/Logo.png"
              alt="Weather Monitor"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-bold text-foreground leading-tight">Weather Monitor</h1>
            <p className="text-xs text-muted-foreground">{formattedDate}</p>
          </div>
        </Link>

        {/* Center: Live time */}
        <div className="hidden md:flex items-center gap-1.5 text-sm font-mono font-semibold text-muted-foreground bg-muted/50 px-4 py-1.5 rounded-full border border-border/50">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          {formattedTime}
        </div>

        {/* Right: Theme toggle */}
        <ThemeToggle />

      </div>
    </header>
  )
}
