import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudFog,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  Snowflake,
} from "lucide-react"
import { cn } from "#/lib/utils"

const SIZES = {
  xs: "w-4 h-4",
  sm: "w-6 h-6",
  md: "w-10 h-10",
  lg: "w-14 h-14",
  xl: "w-20 h-20",
}

type Size = keyof typeof SIZES

export default function WeatherIcon({
  weatherCode,
  isDay,
  size = "md",
  className,
}: {
  weatherCode: number
  isDay: number
  size?: Size
  className?: string
}) {
  const cls = cn(SIZES[size], className)
  const isNight = isDay === 0

  if (weatherCode === 0) {
    return isNight
      ? <Moon className={cn(cls, "text-blue-300")} />
      : <Sun className={cn(cls, "text-yellow-400")} />
  }

  if (weatherCode >= 1 && weatherCode <= 3) {
    return isNight
      ? <CloudMoon className={cn(cls, "text-slate-400")} />
      : <CloudSun className={cn(cls, "text-amber-400")} />
  }

  if (weatherCode >= 45 && weatherCode <= 48) {
    return <CloudFog className={cn(cls, "text-slate-400")} />
  }

  if (weatherCode >= 51 && weatherCode <= 57) {
    return <CloudDrizzle className={cn(cls, "text-blue-400")} />
  }

  if (weatherCode >= 61 && weatherCode <= 67) {
    return <CloudRain className={cn(cls, "text-blue-500")} />
  }

  if (weatherCode >= 71 && weatherCode <= 77) {
    return <Snowflake className={cn(cls, "text-cyan-300")} />
  }

  if (weatherCode >= 95) {
    return <CloudLightning className={cn(cls, "text-yellow-400")} />
  }

  return isNight
    ? <CloudMoon className={cn(cls, "text-slate-400")} />
    : <Cloud className={cn(cls, "text-slate-400")} />
}
