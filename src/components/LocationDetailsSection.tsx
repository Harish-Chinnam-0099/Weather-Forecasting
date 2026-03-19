import CountryCard from "#/components/CountryCard"
import PlacesCard from "#/components/PlacesCard"
import PhotosCard from "#/components/PhotosCard"
import MapCard from "#/components/MapCard"
import { Globe } from "lucide-react"

type Props = {
  name: string
  country: string
  countryCode: string
  lat: number
  lon: number
}

export default function LocationDetailsSection({ name, country, countryCode, lat, lon }: Props) {
  return (
    <div className="space-y-5">

      {/* Section header */}
      <div className="flex items-center gap-3 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-primary/10 flex items-center justify-center">
            <Globe className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-base font-bold text-foreground">
            Explore {name}, {country}
          </h2>
        </div>
        <div className="flex-1 h-px bg-border/50" />
      </div>

      {/* Country info + Map — equal columns, stack on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        <CountryCard countryCode={countryCode} />
        <MapCard lat={lat} lon={lon} name={name} />
      </div>

      {/* Popular places */}
      <PlacesCard lat={lat} lon={lon} />

      {/* City photos */}
      <PhotosCard cityName={name} />

    </div>
  )
}
