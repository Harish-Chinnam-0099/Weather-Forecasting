import { createFileRoute } from "@tanstack/react-router"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState, useEffect } from "react"

import { getWeather } from "../api/weather"
import { reverseGeocode } from "../api/searchLocation"
import { Skeleton } from "#/components/ui/skeleton"
import LocationSearch from "../components/LocationSearch"
import LocationPopup from "../components/location-popup"
import HourlyGraph from "#/components/hourly-graph"
import ForecastCards from "#/components/weekly-forecast"
import { TodayWeatherCard, WeatherDescription } from "#/components/weather-card"
import SunCard from "#/components/sun-card"
import DateWeatherCard from "#/components/DateWeatherCard"
import LocationDetailsSection from "#/components/LocationDetailsSection"
import type { SearchedPlace } from "#/types/types"

export const Route = createFileRoute("/")({
  component: Index,
})

function LoadingSkeleton() {
  return (
    <div className="container mx-auto p-6 space-y-6 min-h-screen">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-12 w-full" />
      <div className="grid md:grid-cols-3 gap-4">
        <Skeleton className="h-52" />
        <Skeleton className="h-52" />
        <Skeleton className="h-52" />
      </div>
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-72 w-full" />
      <div className="grid grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-36" />
        ))}
      </div>
    </div>
  )
}

function Index() {
  const [lat, setLat] = useState<number | null>(null)
  const [lon, setLon] = useState<number | null>(null)
  // null = auto-detect mode (use Nominatim), string = manually chosen name
  const [manualName, setManualName] = useState<string | null>(null)
  const [searchedPlace, setSearchedPlace] = useState<SearchedPlace | null>(null)
  const queryClient = useQueryClient()

  // Auto-detect on page load (geolocation is callback-based, must use useEffect)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        setLat(lat)
        setLon(lon)

        const geoData = await reverseGeocode(lat, lon)
        if (geoData) {
          setSearchedPlace({
            lat,
            lon,
            name: geoData.name,
            country: geoData.country,
            countryCode: geoData.countryCode,
          })
        }
      },
      async () => {
        const lat = 17.385
        const lon = 78.4867
        setLat(lat)
        setLon(lon)
        setManualName("Hyderabad")

        const geoData = await reverseGeocode(lat, lon)
        if (geoData) {
          setSearchedPlace({
            lat,
            lon,
            name: geoData.name,
            country: geoData.country,
            countryCode: geoData.countryCode,
          })
        }
      }
    )
  }, [])

  // Clear location-specific caches when location changes
  useEffect(() => {
    if (searchedPlace) {
      queryClient.invalidateQueries({ queryKey: ["country", searchedPlace.countryCode] })
      queryClient.invalidateQueries({ queryKey: ["photos", searchedPlace.name] })
      queryClient.invalidateQueries({ queryKey: ["places", searchedPlace.lat, searchedPlace.lon] })
    }
  }, [searchedPlace, queryClient])

  // Called when user picks from search or clicks current location button
  const handleSelect = (place: SearchedPlace | null, latitude: number, longitude: number, name: string) => {
    setLat(latitude)
    setLon(longitude)
    setManualName(name)
    setSearchedPlace(place)
  }

  const { data: weather, isLoading } = useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => getWeather(lat!, lon!),
    enabled: !!lat && !!lon,
  })

  // Reverse-geocode only for the initial auto-detected location (manualName is null)
  const { data: nominatimCity } = useQuery({
    queryKey: ["nominatim", lat, lon],
    queryFn: async () => {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      )
      const data = await res.json()
      if (data?.address) {
        return (
          data.address.city ||
          data.address.town ||
          data.address.village ||
          data.address.hamlet ||
          data.address.state ||
          ""
        )
      }
      return ""
    },
    enabled: manualName === null && !!lat && !!lon,
    staleTime: 1000 * 60 * 30,  // 30 minutes
    gcTime: 1000 * 60 * 60,     // 1 hour
  })

  // Use manual name if set, otherwise use Nominatim result
  const locationName = manualName ?? nominatimCity ?? ""

  if (!lat || !lon || isLoading) {
    return <LoadingSkeleton />
  }

  if (!weather || !weather.daily) {
    return <div className="p-6">Weather data unavailable</div>
  }

  const todayIndex = 2

  const { timezone, daily, current } = weather
  const todayMax = daily.temperature_2m_max[todayIndex]
  const todayMin = daily.temperature_2m_min[todayIndex]
  const humidity = current.relative_humidity_2m
  const temps = current.temperature_2m
  const rain = daily.rain_sum[todayIndex]
  const sunrise = daily.sunrise[todayIndex]
  const sunset = daily.sunset[todayIndex]
  const isDay = current.is_day
  const weathercode = current.weathercode

  // Subtle background based on temperature
  const getTemperatureBackground = () => {
    if (temps > 30) {
      // Hot - warm subtle background
      return "bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30"
    } else if (temps < 15) {
      // Cold - cool subtle background
      return "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30"
    } else {
      // Moderate - neutral subtle background
      return "bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/30 dark:to-slate-800/30"
    }
  }

  return (
    <div className={`container mx-auto p-6 space-y-6 min-h-screen ${getTemperatureBackground()}`}>
      <LocationSearch onSelect={handleSelect} />

      <h2 className="text-xl font-semibold text-foreground">
        Weather in {locationName}
      </h2>

      <LocationPopup weather={weather} />

      <div className="grid md:grid-cols-3 gap-4 items-stretch">
        <div className="col-span-1">
          <TodayWeatherCard
            temps={temps}
            todayMin={todayMin}
            todayMax={todayMax}
            humidity={humidity}
            timezone={timezone}
            rain={rain}
            weathercode={weathercode}
            isDay={isDay}
          />
        </div>
        <div className="col-span-1">
          <WeatherDescription weathercode={weathercode} isDay={isDay} />
        </div>
        <div className="col-span-1">
          <DateWeatherCard weather={weather} />
        </div>
      </div>

      <SunCard sunrise={sunrise} sunset={sunset} />

      <HourlyGraph data={weather} />

      <ForecastCards daily={daily} />

      {searchedPlace && (
        <LocationDetailsSection
          name={searchedPlace.name}
          country={searchedPlace.country}
          countryCode={searchedPlace.countryCode}
          lat={searchedPlace.lat}
          lon={searchedPlace.lon}
        />
      )}
    </div>
  )
}
