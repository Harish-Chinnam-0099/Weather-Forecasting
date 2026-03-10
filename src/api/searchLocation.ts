export async function searchLocation(query: string) {

  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${query}`
  )

  const data = await res.json()

  return data.results
}

export async function reverseGeocode(lat: number, lon: number) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
  )

  const data = await res.json()

  if (!data?.address) return null

  return {
    name:
      data.address.city ||
      data.address.town ||
      data.address.village ||
      data.address.hamlet ||
      data.address.state ||
      "",
    country: data.address.country || "",
    countryCode: (data.address.country_code as string || "").toUpperCase(),
  }
}