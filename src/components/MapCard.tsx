import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card"
import { Map } from "lucide-react"

export default function MapCard({ lat, lon, name }: { lat: number; lon: number; name: string }) {
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${(lon - 0.05).toFixed(4)},${(lat - 0.05).toFixed(4)},${(lon + 0.05).toFixed(4)},${(lat + 0.05).toFixed(4)}&layer=mapnik&marker=${lat},${lon}`

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          <Map className="w-3.5 h-3.5" />
          Map — {name}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        {/* Responsive height: shorter on mobile, taller on desktop */}
        <div className="h-52 sm:h-64 md:h-72 lg:h-80 w-full overflow-hidden">
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            title={`Map of ${name}`}
            className="border-0 w-full h-full"
            loading="lazy"
          />
        </div>
      </CardContent>
    </Card>
  )
}
