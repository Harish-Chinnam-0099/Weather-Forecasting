import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import WeatherIcon from "./weather-icon"
import { format, parseISO } from "date-fns"
import type { WeatherDaily } from "#/types/types"

export default function ForecastCards({ daily }: { daily: WeatherDaily }) {
  const todayIndex = 2

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {daily.time.slice(0, 10).map((day, i) => {
        const max = daily.temperature_2m_max[i]
        const min = daily.temperature_2m_min[i]
        const rain = daily.rain_sum[i]

        let label: string
        if (i === todayIndex) label = "Today"
        else if (i === todayIndex - 1) label = "Yesterday"
        else if (i === todayIndex - 2) label = "2 Days Ago"
        else label = format(parseISO(day), "EEE, MMM d")

        return (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="text-sm">{label}</CardTitle>
            </CardHeader>
            <CardContent>
              <WeatherIcon weatherCode={daily.weathercode[i]} isDay={1} />
              <div className="text-sm text-muted-foreground">Max: {max}°C</div>
              <div className="text-sm text-muted-foreground">Min: {min}°C</div>
              <div className="text-sm text-muted-foreground">Rain: {rain}mm</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
