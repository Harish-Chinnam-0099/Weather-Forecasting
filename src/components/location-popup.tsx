import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import type { WeatherData } from "#/types/types"

export default function LocationPopup({ weather }: { weather: WeatherData }) {
  if (!weather) return null

  const temp = weather.current.temperature_2m
  const weatherCode = weather.current.weathercode

  let advice = "Great weather to go outside!"

  if (weatherCode >= 95) {
    advice = "Thunderstorm alert. Better to stay indoors."
  } else if (weatherCode >= 71 && weatherCode <= 77) {
    advice = "Snowfall expected. Wear warm clothes and be careful outside."
  } else if (weatherCode >= 51 && weatherCode <= 67) {
    advice = "It's raining outside. Carry an umbrella or raincoat."
  } else if (weatherCode >= 45 && weatherCode <= 48) {
    advice = "Foggy weather. Drive carefully and maintain visibility."
  } else if (temp > 35) {
    advice = "Very hot outside. Stay hydrated and avoid direct sunlight."
  } else if (temp < 15) {
    advice = "Cold weather. Wear warm clothes before going outside."
  }

  return (
    <Dialog defaultOpen>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Current Weather Advice</DialogTitle>
          <DialogDescription>
            Weather suggestion based on current conditions
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <p>Temperature: <b>{temp}°C</b></p>
          <p>Advice: {advice}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
