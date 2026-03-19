import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card"
import { Skeleton } from "#/components/ui/skeleton"
import { getCityPhotos } from "#/api/photos"
import { Camera, ImageOff } from "lucide-react"

export default function PhotosCard({ cityName }: { cityName: string }) {
  const { data: photos = [], isLoading } = useQuery({
    queryKey: ["photos", cityName],
    queryFn: () => getCityPhotos(cityName),
    enabled: !!cityName,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 15,
  })

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          <Camera className="w-3.5 h-3.5" />
          Photos — {cityName}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Skeleton grid */}
        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-40 sm:h-48 w-full rounded-2xl" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && photos.length === 0 && (
          <div className="py-12 text-center">
            <ImageOff className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No photos found for this location.</p>
          </div>
        )}

        {/* Photo grid: 2-col mobile, 3-col sm+ */}
        {!isLoading && photos.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-muted"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Hover overlay with title */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-3">
                  <p className="text-xs text-white font-medium leading-tight line-clamp-2">
                    {photo.title.replace("File:", "").replace(/_/g, " ").replace(/\.[^.]+$/, "")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
