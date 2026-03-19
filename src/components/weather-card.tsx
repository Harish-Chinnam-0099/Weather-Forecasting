import WeatherIcon from "./weather-icon"
import { Wind, Droplets, Eye, Gauge, Thermometer, MapPin, Umbrella, Sun } from "lucide-react"
import { cn } from "#/lib/utils"

export function getWeatherLabel(code: number): string {
  if (code === 0) return "Clear Sky"
  if (code <= 3) return "Partly Cloudy"
  if (code <= 48) return "Foggy"
  if (code <= 57) return "Drizzle"
  if (code <= 67) return "Rainy"
  if (code <= 77) return "Snowy"
  if (code >= 95) return "Thunderstorm"
  return "Cloudy"
}

export function getWeatherDetail(code: number): string {
  if (code === 0) return "Clear skies and excellent visibility"
  if (code <= 3) return "Mix of sun and clouds"
  if (code <= 48) return "Reduced visibility — drive carefully"
  if (code <= 57) return "Light drizzle — carry an umbrella"
  if (code <= 67) return "Rain expected — stay dry"
  if (code <= 77) return "Snowfall — dress warmly"
  if (code >= 95) return "Thunderstorm — stay indoors"
  return "Overcast skies"
}

function getWindDirection(deg: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
  return dirs[Math.round(deg / 45) % 8]
}

function getUVLabel(uv: number): string {
  if (uv <= 2) return "Low"
  if (uv <= 5) return "Moderate"
  if (uv <= 7) return "High"
  if (uv <= 10) return "Very High"
  return "Extreme"
}

function MetricTile({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ElementType
  label: string
  value: string
  sub?: string
}) {
  return (
    <div className="flex flex-col gap-1.5 bg-white/40 dark:bg-white/5 border border-white/70 dark:border-white/10 rounded-2xl p-3 sm:p-4 backdrop-blur-sm">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Icon className="w-3.5 h-3.5 shrink-0" />
        <span className="text-xs font-semibold uppercase tracking-wide truncate">{label}</span>
      </div>
      <p className="text-base sm:text-lg font-bold text-foreground leading-none">{value}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  )
}

type WeatherHeroCardProps = {
  temps: number
  feelsLike: number
  todayMin: number
  todayMax: number
  humidity: number
  rain: number
  timezone: string
  weathercode: number
  isDay: number
  windSpeed: number
  windDirection: number
  pressure: number
  visibility: number
  locationName: string
  uvIndex: number
}

export function WeatherHeroCard({
  temps,
  feelsLike,
  todayMin,
  todayMax,
  humidity,
  rain,
  timezone,
  weathercode,
  isDay,
  windSpeed,
  windDirection,
  pressure,
  visibility,
  locationName,
  uvIndex,
}: WeatherHeroCardProps) {
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: timezone,
  })

  const isHot = temps > 30
  const isCold = temps < 10

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl p-5 sm:p-6 md:p-8",
        "border backdrop-blur-sm shadow-xl shadow-black/5",
        isHot
          ? "bg-gradient-to-br from-orange-50/90 via-amber-50/70 to-red-50/90 dark:from-orange-950/50 dark:via-amber-950/30 dark:to-red-950/50 border-orange-200/60 dark:border-orange-800/30"
          : isCold
            ? "bg-gradient-to-br from-blue-50/90 via-cyan-50/70 to-slate-50/90 dark:from-blue-950/50 dark:via-cyan-950/30 dark:to-slate-950/50 border-blue-200/60 dark:border-blue-800/30"
            : "bg-gradient-to-br from-sky-50/90 via-blue-50/70 to-cyan-50/90 dark:from-sky-950/50 dark:via-blue-950/30 dark:to-cyan-950/50 border-sky-200/60 dark:border-sky-800/30"
      )}
    >
      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-sky-400/10 dark:bg-sky-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col xl:flex-row items-start xl:items-center gap-6 xl:gap-10">

        {/* ── Temperature block ── */}
        <div className="flex-1 min-w-0">
          {/* Location + Time */}
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-4">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="font-semibold truncate">{locationName || "Detecting location…"}</span>
            <span className="opacity-40 mx-0.5">·</span>
            <span className="shrink-0 tabular-nums">{currentTime}</span>
          </div>

          {/* Icon + Temp — stacked on xs, side-by-side on sm+ */}
          <div className="flex items-center gap-4 sm:gap-6">
            <WeatherIcon weatherCode={weathercode} isDay={isDay} size="xl" />
            <div className="min-w-0">
              <div className="text-6xl sm:text-7xl md:text-8xl font-black text-foreground tracking-tighter leading-none">
                {Math.round(temps)}°
              </div>
              <div className="text-lg sm:text-xl font-semibold text-foreground/80 mt-1.5">
                {getWeatherLabel(weathercode)}
              </div>
              <div className="text-sm text-muted-foreground mt-1 leading-relaxed">
                {getWeatherDetail(weathercode)}
              </div>
              <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground mt-2">
                <span className="flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 shrink-0" />
                  Feels {Math.round(feelsLike)}°
                </span>
                <span className="opacity-40">·</span>
                <span>H: {Math.round(todayMax)}°</span>
                <span>L: {Math.round(todayMin)}°</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Metrics grid ── */}
        {/* 2-col on mobile, 3-col on sm-lg, 2-col on xl (sidebar) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-2 gap-2.5 w-full xl:w-72 shrink-0">
          <MetricTile
            icon={Wind}
            label="Wind"
            value={`${Math.round(windSpeed)} km/h`}
            sub={getWindDirection(windDirection)}
          />
          <MetricTile
            icon={Droplets}
            label="Humidity"
            value={`${humidity}%`}
          />
          <MetricTile
            icon={Eye}
            label="Visibility"
            value={`${(visibility / 1000).toFixed(1)} km`}
          />
          <MetricTile
            icon={Gauge}
            label="Pressure"
            value={`${Math.round(pressure)}`}
            sub="hPa"
          />
          <MetricTile
            icon={Umbrella}
            label="Rainfall"
            value={`${rain} mm`}
          />
          <MetricTile
            icon={Sun}
            label="UV Index"
            value={String(Math.round(uvIndex))}
            sub={getUVLabel(uvIndex)}
          />
        </div>

      </div>
    </div>
  )
}
