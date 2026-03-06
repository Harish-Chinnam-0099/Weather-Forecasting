import { useState } from "react"
import { searchLocation } from "../api/searchLocation"

export default function LocationSearch({ onSelect }: any) {

  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])

  const handleSearch = async (value: string) => {

    setQuery(value)

    if (value.length < 2) return

    const data = await searchLocation(value)

    setResults(data || [])
  }

  const useCurrentLocation = () => {

    navigator.geolocation.getCurrentPosition((position) => {

      const lat = position.coords.latitude
      const lon = position.coords.longitude

      onSelect(lat, lon, "Current Location")

    })
  }

  return (

    <div className="mb-6 space-y-2">

      {/* SEARCH INPUT */}

      <input
        className="border p-2 w-full rounded text-gray-500 font-bold"
        placeholder="Search location..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {/* CURRENT LOCATION BUTTON */}

      <button
        onClick={useCurrentLocation}
        className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
      >
        Use Current Location
      </button>

      {/* SEARCH RESULTS */}

      <div className="mt-2 space-y-1">
        {results?.map((loc: any) => (

          <div
            key={loc.id}
            className="cursor-pointer p-2 border rounded hover:bg-muted"
            onClick={() =>
              onSelect(
                loc.latitude,
                loc.longitude,
                `${loc.name}, ${loc.country}`
              )
            }
          >
            {loc.name}, {loc.country}

          </div>

        ))}

      </div>

    </div>
  )
}