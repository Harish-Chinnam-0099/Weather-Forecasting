import { Link } from "@tanstack/react-router";
import ThemeToggle from "./ThemeToggle";

export default function Header() {

  return(
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 text-foreground
    supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to='/' className="flex items-center">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/40 dark:to-blue-900/40 flex items-center justify-center p-1 shadow-sm">
          <img src="/Logo.png"
          alt="Weather Logo"
          className="w-full h-full rounded-full object-cover"/>
        </div>
        </Link>
        <div>
          <h1 className="text-foreground font-semibold">Weather Forecasting Site</h1>
        </div>
        <div>
          <ThemeToggle/>
        </div>
      </div>
    </header>
  )
}
