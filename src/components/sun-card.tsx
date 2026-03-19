import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card"
import { Sunrise, Sunset } from "lucide-react"

export default function SunCard({
  sunrise,
  sunset,
}: {
  sunrise: string
  sunset: string
}) {
  const sunriseDate = new Date(sunrise)
  const sunsetDate = new Date(sunset)
  const now = new Date()

  const sunriseTime = sunriseDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  const sunsetTime = sunsetDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  const totalMs = sunsetDate.getTime() - sunriseDate.getTime()
  const elapsedMs = now.getTime() - sunriseDate.getTime()
  const progress = Math.max(0, Math.min(1, elapsedMs / totalMs))

  const isBeforeSunrise = now < sunriseDate
  const isAfterSunset = now > sunsetDate

  const dayHours = Math.floor(totalMs / (1000 * 60 * 60))
  const dayMins = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60))

  // SVG arc geometry
  const W = 220
  const H = 120
  const cx = W / 2
  const cy = H - 10
  const r = 85

  const startX = cx - r
  const endX = cx + r

  // Sun position angle: starts at π (left/sunrise), moves to 0 (right/sunset)
  const angle = Math.PI - progress * Math.PI
  const sunX = cx + r * Math.cos(angle)
  const sunY = cy - r * Math.sin(angle)

  return (
    <Card className="h-full">
      <CardHeader className="pb-0">
        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Sun Cycle
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-2">
        {/* SVG Arc */}
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
          {/* Background arc */}
          <path
            d={`M ${startX} ${cy} A ${r} ${r} 0 0 1 ${endX} ${cy}`}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.1"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Progress arc (only if daytime has started) */}
          {!isBeforeSunrise && (
            <path
              d={`M ${startX} ${cy} A ${r} ${r} 0 0 1 ${isAfterSunset ? endX : sunX} ${isAfterSunset ? cy : sunY}`}
              fill="none"
              stroke="#fbbf24"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity={isAfterSunset ? 0.35 : 1}
            />
          )}

          {/* Horizon line */}
          <line
            x1={startX - 8}
            y1={cy}
            x2={endX + 8}
            y2={cy}
            stroke="currentColor"
            strokeOpacity="0.12"
            strokeWidth="1.5"
          />

          {/* Sun dot */}
          {!isBeforeSunrise && (
            <circle cx={sunX} cy={sunY} r="7" fill="#fbbf24" opacity={isAfterSunset ? 0.3 : 1}>
              {!isAfterSunset && (
                <animate attributeName="r" values="6;8;6" dur="3s" repeatCount="indefinite" />
              )}
            </circle>
          )}

          {/* Sunrise label */}
          <text
            x={startX}
            y={cy + 18}
            textAnchor="middle"
            fontSize="9"
            fill="currentColor"
            opacity="0.5"
          >
            {sunriseTime}
          </text>

          {/* Sunset label */}
          <text
            x={endX}
            y={cy + 18}
            textAnchor="middle"
            fontSize="9"
            fill="currentColor"
            opacity="0.5"
          >
            {sunsetTime}
          </text>
        </svg>

        {/* Info row */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
              <Sunrise className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Sunrise</p>
              <p className="text-sm font-bold text-foreground">{sunriseTime}</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs font-semibold text-foreground">{dayHours}h {dayMins}m</p>
            <p className="text-xs text-muted-foreground">daylight</p>
          </div>

          <div className="flex items-center gap-2">
            <div>
              <p className="text-xs text-muted-foreground text-right">Sunset</p>
              <p className="text-sm font-bold text-foreground">{sunsetTime}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0">
              <Sunset className="w-4 h-4 text-orange-500" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
