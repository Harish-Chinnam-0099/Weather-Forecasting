import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import WeatherIcon from "./weather-icon"
import { Umbrella, Thermometer, Wind, Snowflake, CloudFog, ThumbsUp } from "lucide-react"
import { cn } from "#/lib/utils"
import type { WeatherData } from "#/types/types"

type Props = {
  weather: WeatherData
  open: boolean
  onOpenChange: (open: boolean) => void
  locationName: string
}

type Advice = {
  icon: React.ReactNode
  text: string
  colorClass: string
  bgClass: string
}

function getAdvice(code: number, temp: number): Advice {
  if (code >= 95) {
    return {
      icon: <Wind className="w-5 h-5" />,
      text: "Thunderstorm alert — stay indoors and avoid open or elevated areas.",
      colorClass: "text-red-600 dark:text-red-400",
      bgClass: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800/30",
    }
  }
  if (code >= 71 && code <= 77) {
    return {
      icon: <Snowflake className="w-5 h-5" />,
      text: "Snowfall expected — dress warmly and drive with care on icy roads.",
      colorClass: "text-blue-500 dark:text-blue-400",
      bgClass: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/30",
    }
  }
  if (code >= 51 && code <= 67) {
    return {
      icon: <Umbrella className="w-5 h-5" />,
      text: "Rain expected — carry an umbrella or a raincoat before heading out.",
      colorClass: "text-blue-600 dark:text-blue-400",
      bgClass: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/30",
    }
  }
  if (code >= 45 && code <= 48) {
    return {
      icon: <CloudFog className="w-5 h-5" />,
      text: "Foggy conditions — reduce speed and keep headlights on while driving.",
      colorClass: "text-slate-500 dark:text-slate-400",
      bgClass: "bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-700/30",
    }
  }
  if (temp > 35) {
    return {
      icon: <Thermometer className="w-5 h-5" />,
      text: "Extreme heat — stay hydrated, wear sunscreen, and avoid midday sun.",
      colorClass: "text-orange-600 dark:text-orange-400",
      bgClass: "bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800/30",
    }
  }
  if (temp < 10) {
    return {
      icon: <Snowflake className="w-5 h-5" />,
      text: "Cold weather — dress in layers and keep extremities covered.",
      colorClass: "text-cyan-600 dark:text-cyan-400",
      bgClass: "bg-cyan-50 dark:bg-cyan-950/30 border-cyan-200 dark:border-cyan-800/30",
    }
  }
  return {
    icon: <ThumbsUp className="w-5 h-5" />,
    text: "Great conditions to be outside. Enjoy the weather!",
    colorClass: "text-green-600 dark:text-green-400",
    bgClass: "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800/30",
  }
}

export default function LocationPopup({ weather, open, onOpenChange, locationName }: Props) {
  if (!weather) return null

  const temp = weather.current.temperature_2m
  const feelsLike = weather.current.apparent_temperature
  const weatherCode = weather.current.weathercode
  const humidity = weather.current.relative_humidity_2m
  const advice = getAdvice(weatherCode, temp)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm rounded-3xl border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-semibold">
            <WeatherIcon weatherCode={weatherCode} isDay={weather.current.is_day} size="sm" />
            <span className="truncate">{locationName || "Current Location"}</span>
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Current conditions advisory
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-1">
          {/* Advice banner */}
          <div className={cn("flex items-start gap-3 p-4 rounded-2xl border", advice.bgClass)}>
            <span className={cn("shrink-0 mt-0.5", advice.colorClass)}>{advice.icon}</span>
            <p className="text-sm text-foreground leading-relaxed">{advice.text}</p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-2xl bg-muted/40 border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">Temperature</p>
              <p className="text-2xl font-black text-foreground leading-none">{Math.round(temp)}°C</p>
            </div>
            <div className="p-3 rounded-2xl bg-muted/40 border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">Feels Like</p>
              <p className="text-2xl font-black text-foreground leading-none">{Math.round(feelsLike)}°C</p>
            </div>
            <div className="p-3 rounded-2xl bg-muted/40 border border-border/50 col-span-2">
              <p className="text-xs text-muted-foreground mb-1">Humidity</p>
              <div className="flex items-center gap-3">
                <p className="text-lg font-bold text-foreground">{humidity}%</p>
                <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-400 rounded-full transition-all"
                    style={{ width: `${humidity}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
