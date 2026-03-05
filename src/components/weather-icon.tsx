export default function WeatherIcon({ temp }: { temp: number }) {

  if (temp > 30) {
    return <span className="text-4xl">☀️</span>
  }

  if (temp > 20) {
    return <span className="text-4xl">⛅</span>
  }

  if (temp > 10) {
    return <span className="text-4xl">☁️</span>
  }

  return <span className="text-4xl">❄️</span>
}