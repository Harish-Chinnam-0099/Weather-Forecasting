export async function searchLocation(query: string) {

  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${query}`
  )

  const data = await res.json()

  return data.results
}