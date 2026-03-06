export async function getWeather(lat: number, lon: number) {

  const url =
    // `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}
    // &hourly=temperature_2m
    // &current=rain,relative_humidity_2m,temperature_2m
    // &daily=rain_sum,sunset,sunrise,temperature_2m_max,temperature_2m_min
    // &past_days=2
    // &forecast_days=7
    // &timezone=auto`

`https://api.open-meteo.com/v1/forecast
?latitude=${lat}&longitude=${lon}
&daily=weathercode,rain_sum,sunset,sunrise,temperature_2m_max,temperature_2m_min
&hourly=temperature_2m,relative_humidity_2m
&current=is_day,relative_humidity_2m,weathercode,rain,temperature_2m
&timezone=auto
&past_days=2
&forecast_days=16`

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(res.statusText)
  }

  return res.json()
}

