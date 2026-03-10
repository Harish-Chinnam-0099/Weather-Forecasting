import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card"
import { MapPin } from "lucide-react"
import { getNearbyPlaces } from "#/api/places"
import type { NearbyPlace } from "#/types/types"

export default function PlacesCard({ lat, lon }: { lat: number; lon: number }) {

  const { data: places = [], isLoading, isError } = useQuery<NearbyPlace[]>({
    queryKey: ["places", lat, lon],
    queryFn: () => getNearbyPlaces(lat, lon),
    enabled: !!lat && !!lon,
    staleTime: 1000 * 60 * 10,  // 10 minutes
    gcTime: 1000 * 60 * 15,     // 15 minutes
  })
  return (

    <Card>

      <CardHeader>
        <CardTitle>Popular Places Nearby</CardTitle>
      </CardHeader>

      <CardContent>

        {isLoading && (
          <p className="text-sm text-muted-foreground">Loading places...</p>
        )}

        {isError && (
          <p className="text-sm text-muted-foreground">Could not load places. Please try again.</p>
        )}

        {!isLoading && !isError && places.length === 0 && (
          <p className="text-sm text-muted-foreground">No notable places found nearby.</p>
        )}

        {!isLoading && !isError && places.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {places.map((place: NearbyPlace) => (
              <a
                key={place.id}
                href={`https://www.openstreetmap.org/${place.osmType}/${place.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-border rounded-lg space-y-1 hover:bg-muted transition-colors block text-foreground"
              >
                <div className="flex items-start gap-1">
                  <MapPin className="w-3 h-3 mt-1 text-primary shrink-0" />
                  <p className="font-medium text-sm leading-tight">{place.name}</p>
                </div>
                <p className="text-xs text-muted-foreground">{place.type}</p>
              </a>
            ))}
          </div>
        )}

      </CardContent>

    </Card>

  )

}
