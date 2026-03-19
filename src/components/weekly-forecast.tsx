import WeatherIcon from "./weather-icon"
import { format, parseISO } from "date-fns"
import { Droplets, CalendarDays } from "lucide-react"
import { cn } from "#/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card"
import type { WeatherDaily } from "#/types/types"

/**
 * Relative temperature bar — shows where this day's min/max sits
 * within the full 10-day range. Color-coded by temperature.
 */
function TempBar({
  min,
  max,
  globalMin,
  globalMax,
}: {
  min: number
  max: number
  globalMin: number
  globalMax: number
}) {
  const range = globalMax - globalMin || 1
  const left = ((min - globalMin) / range) * 100
  const width = Math.max(((max - min) / range) * 100, 8) // min 8% so bar is always visible

  const color =
    max >= 35 ? "bg-red-400"
    : max >= 28 ? "bg-orange-400"
    : max >= 20 ? "bg-amber-400"
    : max >= 12 ? "bg-sky-400"
    : "bg-blue-500"

  return (
    <div className="w-full h-1 bg-border/60 rounded-full overflow-hidden">
      <div
        className={cn("h-full rounded-full", color)}
        style={{ marginLeft: `${left}%`, width: `${width}%` }}
      />
    </div>
  )
}

export default function ForecastCards({ daily }: { daily: WeatherDaily }) {
  const todayStr = new Date().toISOString().split("T")[0]
  const todayIndex = daily.time.indexOf(todayStr)
  const safeIndex = todayIndex >= 0 ? todayIndex : 2

  const forecastDays = daily.time.slice(safeIndex, safeIndex + 10)

  // Global min/max across all 10 days — used for relative temp bar sizing
  const allMaxes = forecastDays.map((_, o) => daily.temperature_2m_max[safeIndex + o])
  const allMins  = forecastDays.map((_, o) => daily.temperature_2m_min[safeIndex + o])
  const globalMax = Math.max(...allMaxes)
  const globalMin = Math.min(...allMins)

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          <CalendarDays className="w-3.5 h-3.5" />
          10-Day Forecast
        </CardTitle>
      </CardHeader>

      <CardContent className="pb-5">
        {/*
          Hidden scrollbar — works in Webkit, Firefox, and IE/Edge.
          Cards are always the same solid bg-muted so they're readable
          in both light and dark without depending on --primary.
        */}
        <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex gap-2.5" style={{ minWidth: "max-content" }}>
            {forecastDays.map((day, offset) => {
              const i = safeIndex + offset
              const isToday = offset === 0
              const label    = isToday ? "Today" : format(parseISO(day), "EEE")
              const dateLbl  = format(parseISO(day), "MMM d")
              const max      = Math.round(daily.temperature_2m_max[i])
              const min      = Math.round(daily.temperature_2m_min[i])
              const precip   = daily.precipitation_probability_max[i] ?? 0

              return (
                <div
                  key={day}
                  className={cn(
                    // Fixed width so all cards align perfectly
                    "flex flex-col items-center gap-2 px-3.5 py-4 rounded-2xl w-[84px] shrink-0",
                    "border transition-colors duration-150",
                    isToday
                      // Sky-500 — visible & distinct in BOTH light and dark
                      ? "bg-sky-500/10 dark:bg-sky-400/15 border-sky-400/50 dark:border-sky-400/30 shadow-sm"
                      // bg-card = solid white (light) / solid dark (dark) — never blends into page
                      : "bg-card border-border hover:bg-muted/60 hover:border-border/80"
                  )}
                >
                  {/* Day label */}
                  <span
                    className={cn(
                      "text-xs font-bold leading-none",
                      // Explicit sky color — doesn't become invisible in dark mode
                      isToday ? "text-sky-600 dark:text-sky-400" : "text-foreground"
                    )}
                  >
                    {label}
                  </span>

                  {/* Date */}
                  <span className="text-[11px] text-muted-foreground leading-none">{dateLbl}</span>

                  {/* Weather icon */}
                  <WeatherIcon weatherCode={daily.weathercode[i]} isDay={1} size="sm" />

                  {/* Precip chance — space-holder keeps cards aligned when no rain */}
                  <div className="h-4 flex items-center">
                    {precip > 0 && (
                      <div className="flex items-center gap-0.5 text-blue-500 dark:text-blue-400">
                        <Droplets className="w-3 h-3 shrink-0" />
                        <span className="text-[11px] font-semibold">{precip}%</span>
                      </div>
                    )}
                  </div>

                  {/* High temp */}
                  <span className="text-sm font-bold text-foreground leading-none">{max}°</span>

                  {/* Relative temperature range bar */}
                  <div className="w-full px-0.5">
                    <TempBar min={min} max={max} globalMin={globalMin} globalMax={globalMax} />
                  </div>

                  {/* Low temp */}
                  <span className="text-[11px] text-muted-foreground leading-none">{min}°</span>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
