import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import WeatherIcon from "./weather-icon"

type TodayWeatherCardProps = {
  temps: number
  todayMin: number
  todayMax: number
  humidity: number
  rain: number
  timezone: string
  weathercode: number
  isDay: number
}

export function TodayWeatherCard({
  temps,
  todayMin,
  todayMax,
  humidity,
  rain,
  timezone,
  weathercode,
  isDay,
}: TodayWeatherCardProps) {
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: timezone,
  })

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Today's Weather · {currentTime}</CardTitle>
      </CardHeader>
      <CardContent>
        <WeatherIcon weatherCode={weathercode} isDay={isDay} />
        <div className="text-3xl font-bold text-foreground">{temps}°C</div>
        <div className="text-muted-foreground">Min: {todayMin}°C</div>
        <div className="text-muted-foreground">Max: {todayMax}°C</div>
        <div className="text-muted-foreground">Humidity: {humidity}%</div>
        <div className="text-muted-foreground">Rainfall: {rain}mm</div>
      </CardContent>
    </Card>
  )
}

function getWeatherLabel(code: number): string {
  if (code === 0) return "Clear Sky"
  if (code <= 3) return "Partly Cloudy"
  if (code <= 48) return "Foggy"
  if (code <= 67) return "Rainy"
  if (code <= 77) return "Snowy"
  if (code >= 95) return "Thunderstorm"
  return "Cloudy"
}

function getWeatherDetail(code: number): string {
  if (code === 0) return "No clouds, excellent visibility"
  if (code <= 3) return "Mix of sun and clouds"
  if (code <= 48) return "Low visibility — drive carefully"
  if (code <= 67) return "Carry an umbrella"
  if (code <= 77) return "Wear warm clothes"
  if (code >= 95) return "Lightning risk — stay indoors"
  return "Overcast skies"
}

type WeatherDescriptionProps = {
  weathercode: number
  isDay: number
}

export function WeatherDescription({ weathercode, isDay }: WeatherDescriptionProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Current Condition</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <WeatherIcon weatherCode={weathercode} isDay={isDay} />
          <div>
            <p className="font-semibold text-foreground">{getWeatherLabel(weathercode)}</p>
            <p className="text-sm text-muted-foreground">{getWeatherDetail(weathercode)}</p>
          </div>
        </div>

        <div className="text-sm text-muted-foreground space-y-1 border-border border-t pt-3">
          <p>☀️ Clear Sky — no clouds</p>
          <p>⛅ Partly Cloudy — sun and clouds mixed</p>
          <p>🌫️ Fog — low visibility</p>
          <p>🌧️ Rain — carry an umbrella</p>
          <p>❄️ Snow — wear warm clothes</p>
          <p>⛈️ Thunderstorm — stay indoors</p>
        </div>
      </CardContent>
    </Card>
  )
}
