// This function fetches country details using the country code (like "IN" for India)
export async function getCountryInfo(countryCode: string) {

  const res = await fetch(
    `https://restcountries.com/v3.1/alpha/${countryCode}?fields=name,capital,population,currencies,languages,flags,region,subregion,area`
  )

  if (!res.ok) return null

  const data = await res.json()

  return data

}
