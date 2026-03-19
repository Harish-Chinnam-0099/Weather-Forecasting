import { useState, useEffect, useRef } from "react"
import { searchLocation, reverseGeocode } from "../api/searchLocation"
import type { GeocodingResult } from "../api/searchLocation"
import type { SearchedPlace } from "#/types/types"
import { Search, MapPin, Loader2, Navigation } from "lucide-react"

type Props = {
  onSelect: (place: SearchedPlace | null, lat: number, lon: number, name: string) => void
}

export default function LocationSearch({ onSelect }: Props) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<GeocodingResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isLocating, setIsLocating] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Debounced search — fires 350ms after user stops typing
  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      setShowDropdown(false)
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    const timer = setTimeout(async () => {
      const data = await searchLocation(query)
      setResults(data)
      setShowDropdown(data.length > 0)
      setIsSearching(false)
    }, 350)

    return () => clearTimeout(timer)
  }, [query])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleDropdownSelect = (loc: GeocodingResult) => {
    const place: SearchedPlace = {
      lat: loc.latitude,
      lon: loc.longitude,
      name: loc.name,
      country: loc.country ?? "",
      countryCode: (loc.country_code ?? "").toUpperCase(),
    }
    onSelect(place, place.lat, place.lon, `${place.name}, ${place.country}`)
    setQuery("")
    setResults([])
    setShowDropdown(false)
  }

  const handleCurrentLocation = () => {
    setIsLocating(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude: lat, longitude: lon } = position.coords
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
        } catch {
          onSelect(null, position.coords.latitude, position.coords.longitude, "Current Location")
        } finally {
          setIsLocating(false)
        }
      },
      () => {
        setIsLocating(false)
      }
    )
  }

  return (
    <div ref={wrapperRef} className="relative">
      <div className="flex gap-2">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          {isSearching && (
            <Loader2 className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground animate-spin" />
          )}
          <input
            className="w-full pl-10 pr-10 py-3 rounded-2xl border border-border bg-card/80 dark:bg-card/60 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all text-sm font-medium shadow-sm"
            placeholder="Search city, country or region…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => results.length > 0 && setShowDropdown(true)}
            aria-label="Search location"
            aria-autocomplete="list"
            aria-expanded={showDropdown}
          />
        </div>

        {/* Current location button */}
        <button
          onClick={handleCurrentLocation}
          disabled={isLocating}
          className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 whitespace-nowrap shadow-sm"
          aria-label="Use current location"
        >
          {isLocating
            ? <Loader2 className="w-4 h-4 animate-spin" />
            : <Navigation className="w-4 h-4" />
          }
          <span className="hidden sm:inline">My Location</span>
        </button>
      </div>

      {/* Dropdown results */}
      {showDropdown && results.length > 0 && (
        <div
          role="listbox"
          className="absolute top-full left-0 right-0 mt-2 z-50 bg-card border border-border rounded-2xl shadow-xl overflow-hidden"
        >
          {results.map((loc) => (
            <button
              key={loc.id}
              role="option"
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors border-b border-border/40 last:border-0"
              onClick={() => handleDropdownSelect(loc)}
            >
              <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">{loc.name}</p>
                <p className="text-xs text-muted-foreground">
                  {loc.admin1 ? `${loc.admin1}, ` : ""}{loc.country}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
