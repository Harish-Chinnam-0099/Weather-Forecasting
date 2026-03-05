export async function getWeather(lat: number, lon: number) {

  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&past_days=2&forecast_days=7&timezone=auto`

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(res.statusText)
  }

  return res.json()
}