import { useState } from "react"
import { searchLocation, reverseGeocode } from "../api/searchLocation"
import type { SearchedPlace } from "#/types/types"

type Props = {
  onSelect: (place: SearchedPlace | null, lat: number, lon: number, name: string) => void
}

export default function LocationSearch({ onSelect }: Props) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])

  const handleSearch = async (value: string) => {
    setQuery(value)
    if (value.length < 2) {
      setResults([])
      return
    }
    const data = await searchLocation(value)
    setResults(data || [])
  }

  const handleDropdownSelect = (loc: any) => {
    const place: SearchedPlace = {
      lat: loc.latitude,
      lon: loc.longitude,
      name: loc.name,
      country: loc.country ?? "",
      countryCode: (loc.country_code as string ?? "").toUpperCase(),
    }
    onSelect(place, place.lat, place.lon, `${place.name}, ${place.country}`)
    setQuery("")
    setResults([])
  }

  const handleCurrentLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      const geoData = await reverseGeocode(lat, lon)

      if (geoData) {
        const place: SearchedPlace = {
          lat,
          lon,
          name: geoData.name,
          country: geoData.country,
          countryCode: geoData.countryCode,
        }
        onSelect(place, lat, lon, `${geoData.name}, ${geoData.country}`)
      } else {
        onSelect(null, lat, lon, "Current Location")
      }
    })
  }

  return (
    <div className="mb-6 space-y-2">
      <input
        className="border p-2 w-full rounded text-foreground bg-background font-bold placeholder:text-muted-foreground"
        placeholder="Search location..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />

      <button
        onClick={handleCurrentLocation}
        // className="px-3 py-1 text-sm bg-primary text-gray-500 rounded hover:opacity-90"
        className="px-3 py-1 text-sm font-bold bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-colors"
        >
        Use Current Location
      </button>

      {results.length > 0 && (
        <div className="mt-2 space-y-1">
          {results.map((loc: any) => (
            <div
              key={loc.id}
               className="cursor-pointer p-2 border rounded hover text-l text-black drop-shadow-md"
              onClick={() => handleDropdownSelect(loc)}
            >
              {loc.name}, {loc.country}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
