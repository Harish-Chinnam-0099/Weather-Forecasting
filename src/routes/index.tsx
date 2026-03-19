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
import { WeatherHeroCard } from "#/components/weather-card"
import SunCard from "#/components/sun-card"
import DateWeatherCard from "#/components/DateWeatherCard"
import LocationDetailsSection from "#/components/LocationDetailsSection"
import type { SearchedPlace } from "#/types/types"

export const Route = createFileRoute("/")({
  component: Index,
})

const TEMP_HOT = 30
const TEMP_COLD = 10

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-0.5">
      {children}
    </p>
  )
}

function LoadingSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-5">
      {/* Search */}
      <Skeleton className="h-12 w-full rounded-2xl" />
      {/* Hero */}
      <Skeleton className="h-64 sm:h-72 w-full rounded-3xl" />
      {/* Chart + Sun */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Skeleton className="lg:col-span-2 h-80 rounded-3xl" />
        <Skeleton className="h-80 rounded-3xl" />
      </div>
      {/* Forecast strip */}
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-40 w-24 shrink-0 rounded-2xl" />
        ))}
      </div>
      {/* Calendar */}
      <Skeleton className="h-72 w-full rounded-3xl" />
    </div>
  )
}

function Index() {
  const [lat, setLat] = useState<number | null>(null)
  const [lon, setLon] = useState<number | null>(null)
  const [manualName, setManualName] = useState<string | null>(null)
  const [searchedPlace, setSearchedPlace] = useState<SearchedPlace | null>(null)
  const [popupOpen, setPopupOpen] = useState(false)
  const queryClient = useQueryClient()

  // Auto-detect location on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        setLat(latitude)
        setLon(longitude)
        const geoData = await reverseGeocode(latitude, longitude)
        if (geoData) {
          setSearchedPlace({
            lat: latitude,
            lon: longitude,
            name: geoData.name,
            country: geoData.country,
            countryCode: geoData.countryCode,
          })
        }
        setPopupOpen(true)
      },
      async () => {
        // Geolocation denied — fallback to Hyderabad
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
        setPopupOpen(true)
      }
    )
  }, [])

  // Invalidate location-specific caches when place changes
  useEffect(() => {
    if (searchedPlace) {
      queryClient.invalidateQueries({ queryKey: ["country", searchedPlace.countryCode] })
      queryClient.invalidateQueries({ queryKey: ["photos", searchedPlace.name] })
      queryClient.invalidateQueries({ queryKey: ["places", searchedPlace.lat, searchedPlace.lon] })
    }
  }, [searchedPlace, queryClient])

  // Called when user picks from search or clicks "My Location"
  const handleSelect = (place: SearchedPlace | null, latitude: number, longitude: number, name: string) => {
    setLat(latitude)
    setLon(longitude)
    setManualName(name)
    setSearchedPlace(place)
    setPopupOpen(true)
  }

  const { data: weather, isLoading, isError } = useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => getWeather(lat!, lon!),
    enabled: !!lat && !!lon,
  })

  // Reverse-geocode only for auto-detected location (no manual name set)
  const { data: nominatimName } = useQuery({
    queryKey: ["nominatim", lat, lon],
    queryFn: () => reverseGeocode(lat!, lon!).then((d) => d?.name ?? ""),
    enabled: manualName === null && !!lat && !!lon,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  })

  const locationName = manualName ?? searchedPlace?.name ?? nominatimName ?? ""

  if (!lat || !lon || isLoading) return <LoadingSkeleton />

  if (isError || !weather?.daily) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-24 text-center space-y-2">
        <p className="text-xl font-semibold text-foreground">Unable to load weather data</p>
        <p className="text-sm text-muted-foreground">
          Please try refreshing or search for a different location.
        </p>
      </div>
    )
  }

  const { timezone, daily, current } = weather

  // Dynamic today index — robust, not hardcoded
  const todayStr = new Date().toISOString().split("T")[0]
  const todayIndex = daily.time.indexOf(todayStr)
  const safeIndex = todayIndex >= 0 ? todayIndex : 2

  const temps          = current.temperature_2m
  const feelsLike      = current.apparent_temperature
  const todayMax       = daily.temperature_2m_max[safeIndex]
  const todayMin       = daily.temperature_2m_min[safeIndex]
  const humidity       = current.relative_humidity_2m
  const rain           = daily.rain_sum[safeIndex]
  const sunrise        = daily.sunrise[safeIndex]
  const sunset         = daily.sunset[safeIndex]
  const isDay          = current.is_day
  const weathercode    = current.weathercode
  const windSpeed      = current.wind_speed_10m
  const windDirection  = current.wind_direction_10m
  const pressure       = current.surface_pressure
  const visibility     = current.visibility
  const uvIndex        = daily.uv_index_max[safeIndex] ?? 0

  const getPageBackground = () => {
    const isNight = !isDay
    if (temps > TEMP_HOT) {
      return isNight
        ? "bg-gradient-to-b from-orange-950/40 via-red-950/10 to-background"
        : "bg-gradient-to-b from-amber-50 via-orange-50/40 to-background"
    }
    if (temps < TEMP_COLD) {
      return isNight
        ? "bg-gradient-to-b from-blue-950/40 via-cyan-950/10 to-background"
        : "bg-gradient-to-b from-blue-50 via-cyan-50/40 to-background"
    }
    return isNight
      ? "bg-gradient-to-b from-slate-900/40 via-slate-800/10 to-background"
      : "bg-gradient-to-b from-sky-50 via-blue-50/40 to-background"
  }

  return (
    <div className={`min-h-screen transition-colors duration-700 ${getPageBackground()}`}>
      {/* Max-width wrapper — keeps content readable on ultra-wide screens */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-5">

        {/* ── Search ── */}
        <LocationSearch onSelect={handleSelect} />

        {/* ── Weather advisory popup ── */}
        <LocationPopup
          weather={weather}
          open={popupOpen}
          onOpenChange={setPopupOpen}
          locationName={locationName}
        />

        {/* ── Hero card ── */}
        <WeatherHeroCard
          temps={temps}
          feelsLike={feelsLike}
          todayMin={todayMin}
          todayMax={todayMax}
          humidity={humidity}
          rain={rain}
          timezone={timezone}
          weathercode={weathercode}
          isDay={isDay}
          windSpeed={windSpeed}
          windDirection={windDirection}
          pressure={pressure}
          visibility={visibility}
          locationName={locationName}
          uvIndex={uvIndex}
        />

        {/* ── Hourly forecast + Sun cycle ── */}
        <div>
          <SectionLabel>Hourly Overview</SectionLabel>
          <div className="grid lg:grid-cols-3 gap-4 items-stretch">
            <div className="lg:col-span-2">
              <HourlyGraph data={weather} />
            </div>
            <div>
              <SunCard sunrise={sunrise} sunset={sunset} />
            </div>
          </div>
        </div>

        {/* ── 10-Day forecast ── */}
        <div>
          <ForecastCards daily={daily} />
        </div>

        {/* ── Forecast Explorer (calendar) ── */}
        <div>
          <SectionLabel>Forecast Explorer</SectionLabel>
          <DateWeatherCard weather={weather} />
        </div>

        {/* ── Location details ── */}
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
    </div>
  )
}
