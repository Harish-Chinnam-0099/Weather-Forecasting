export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/80 backdrop-blur-sm mt-8">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">

          {/* Brand */}
          <div className="text-center sm:text-left">
            <p className="font-semibold text-foreground">Weather Monitor</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>

          {/* Data sources */}
          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="font-medium text-foreground/60">Data from:</span>
            <a
              href="https://open-meteo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Open-Meteo
            </a>
            <span className="opacity-30">·</span>
            <a
              href="https://nominatim.openstreetmap.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Nominatim
            </a>
            <span className="opacity-30">·</span>
            <a
              href="https://restcountries.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              RestCountries
            </a>
            <span className="opacity-30">·</span>
            <a
              href="https://www.openstreetmap.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              OpenStreetMap
            </a>
          </div>

        </div>
      </div>
    </footer>
  )
}
