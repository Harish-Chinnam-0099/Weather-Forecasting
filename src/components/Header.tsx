import { Link } from "@tanstack/react-router";
import ThemeToggle from "./ThemeToggle";

export default function Header() {

  return(
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 text-foreground
    supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to='/'>
        <img src="/Logo.png"
        alt="Weather Logo"
        className="h-14"/>
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
