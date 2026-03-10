import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card"
import { getCityPhotos } from "#/api/photos"

export default function PhotosCard({ cityName }: { cityName: string }) {

  const { data: photos = [], isLoading } = useQuery({
    queryKey: ["photos", cityName],
    queryFn: () => getCityPhotos(cityName),
    enabled: !!cityName,
    staleTime: 1000 * 60 * 10,  // 10 minutes
    gcTime: 1000 * 60 * 15,     // 15 minutes
  })

  return (

    <Card>

      <CardHeader>
        <CardTitle>Photos — {cityName}</CardTitle>
      </CardHeader>

      <CardContent>

        {isLoading && (
          <p className="text-sm text-muted-foreground">Loading photos...</p>
        )}

        {!isLoading && photos.length === 0 && (
          <p className="text-sm text-muted-foreground">No photos found for this location.</p>
        )}

        {!isLoading && photos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="space-y-1">
                <img
                  src={photo.url}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <p className="text-xs text-muted-foreground truncate">📷 {photo.title}</p>
              </div>
            ))}
          </div>
        )}

      </CardContent>

    </Card>

  )

}
