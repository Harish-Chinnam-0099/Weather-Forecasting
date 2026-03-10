import type { WeatherData } from "#/types/types"

export async function getWeather(lat: number, lon: number): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    daily: "weathercode,rain_sum,sunset,sunrise,temperature_2m_max,temperature_2m_min",
    hourly: "temperature_2m,relative_humidity_2m",
    current: "is_day,relative_humidity_2m,weathercode,rain,temperature_2m",
    timezone: "auto",
    past_days: "2",
    forecast_days: "16",
  })

  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`)

  if (!res.ok) {
    throw new Error(res.statusText)
  }

  return res.json()
}
