import CountryCard from "#/components/CountryCard"
import PlacesCard from "#/components/PlacesCard"
import PhotosCard from "#/components/PhotosCard"
import MapCard from "#/components/MapCard"

type Props = {
  name: string
  country: string
  countryCode: string
  lat: number
  lon: number
}

export default function LocationDetailsSection({ name, country, countryCode, lat, lon }: Props) {

  return (

    <div className="space-y-6 border-t border-border pt-6">

      <h2 className="text-xl font-semibold text-foreground">
        Explore {name}, {country}
      </h2>

      {/* Country info and Map */}
      <div className="grid md:grid-cols-2 gap-4">
        <CountryCard countryCode={countryCode} />
        <MapCard lat={lat} lon={lon} name={name} />
      </div>

      {/* Popular places near the location */}
      <PlacesCard lat={lat} lon={lon} />

      {/* Photos of the city */}
      <PhotosCard cityName={name} />

    </div>

  )

}
