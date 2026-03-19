import type { WeatherData } from "#/types/types"

export async function getWeather(lat: number, lon: number): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    daily:
      "weathercode,rain_sum,sunset,sunrise,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,uv_index_max",
    hourly: "temperature_2m,relative_humidity_2m,precipitation_probability",
    current:
      "is_day,relative_humidity_2m,weathercode,rain,temperature_2m,apparent_temperature,wind_speed_10m,wind_direction_10m,surface_pressure,visibility",
    timezone: "auto",
    past_days: "2",
    forecast_days: "16",
  })

  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`)

  if (!res.ok) {
    throw new Error(`Weather API error ${res.status}: ${res.statusText}`)
  }

  return res.json()
}
