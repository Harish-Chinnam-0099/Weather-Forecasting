export default function WeatherIcon({
  weatherCode,
  isDay,
}: {
  weatherCode: number
  isDay: number
}) {

  const isNight = isDay === 0

  if (weatherCode === 0) {
    return <span className="text-4xl">{isNight ? "🌙" : "☀️"}</span>
  }

  if (weatherCode >= 1 && weatherCode <= 3) {
    return <span className="text-4xl">{isNight ? "🌙☁️" : "⛅"}</span>
  }

  if (weatherCode >= 45 && weatherCode <= 48) {
    return <span className="text-4xl">🌫️</span>
  }

  if (weatherCode >= 51 && weatherCode <= 67) {
    return <span className="text-4xl">🌧️</span>
  }

  if (weatherCode >= 71 && weatherCode <= 77) {
    return <span className="text-4xl">❄️</span>
  }

  if (weatherCode >= 95) {
    return <span className="text-4xl">⛈️</span>
  }

  return <span className="text-4xl">{isNight ? "🌙" : "🌤️"}</span>
}