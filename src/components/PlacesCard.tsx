import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card"
import { Skeleton } from "#/components/ui/skeleton"
import { MapPin, ExternalLink, Landmark } from "lucide-react"
import { getNearbyPlaces } from "#/api/places"
import type { NearbyPlace } from "#/types/types"

function PlaceTypeBadge({ type }: { type: string }) {
  const label = type.replace(/_/g, " ")
  return (
    <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-primary/8 dark:bg-primary/15 text-primary font-medium capitalize">
      {label}
    </span>
  )
}

export default function PlacesCard({ lat, lon }: { lat: number; lon: number }) {
  const { data: places = [], isLoading, isError } = useQuery<NearbyPlace[]>({
    queryKey: ["places", lat, lon],
    queryFn: () => getNearbyPlaces(lat, lon),
    enabled: !!lat && !!lon,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 15,
  })

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          <Landmark className="w-3.5 h-3.5" />
          Popular Places Nearby
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Skeleton loading */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-2xl" />
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="py-8 text-center">
            <MapPin className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Could not load places. Please try again.</p>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && places.length === 0 && (
          <div className="py-8 text-center">
            <MapPin className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No notable places found nearby.</p>
          </div>
        )}

        {/* Places grid: 1-col mobile, 2-col sm, 3-col lg */}
        {!isLoading && !isError && places.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {places.map((place: NearbyPlace) => (
              <a
                key={place.id}
                href={`https://www.openstreetmap.org/${place.osmType}/${place.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 p-3.5 border border-border/60 rounded-2xl hover:border-primary/30 hover:bg-primary/5 transition-all duration-150"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 min-w-0">
                    <MapPin className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />
                    <p className="font-semibold text-sm text-foreground leading-snug">{place.name}</p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <PlaceTypeBadge type={place.type} />
              </a>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
