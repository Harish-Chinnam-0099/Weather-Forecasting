export interface WeatherCurrent {
  temperature_2m: number
  relative_humidity_2m: number
  rain: number
  weathercode: number
  is_day: number
}

export interface WeatherDaily {
  time: string[]
  weathercode: number[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  rain_sum: number[]
  sunrise: string[]
  sunset: string[]
}

export interface WeatherHourly {
  time: string[]
  temperature_2m: number[]
  relative_humidity_2m: number[]
}

export interface WeatherData {
  timezone: string
  current: WeatherCurrent
  daily: WeatherDaily
  hourly: WeatherHourly
}

export interface SearchedPlace {
  lat: number
  lon: number
  name: string
  country: string
  countryCode: string
}

export interface CountryInfo {
  name: { common: string; official: string }
  capital: string[]
  population: number
  currencies: Record<string, { name: string; symbol: string }>
  languages: Record<string, string>
  flags: { svg: string; png: string; alt?: string }
  region: string
  subregion: string
  area: number
}

export interface NearbyPlace {
  id: number
  osmType: "node" | "way"
  name: string
  type: string
  lat: number
  lon: number
}

export interface WikiPhoto {
  id: string
  title: string
  url: string
}
