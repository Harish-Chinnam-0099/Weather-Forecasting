import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card"

export default function MapCard({ lat, lon, name }: { lat: number; lon: number; name: string }) {

  // Use OpenStreetMap Leaflet library for better zoom control
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${(lon - 0.005).toFixed(4)},${(lat - 0.005).toFixed(4)},${(lon + 0.005).toFixed(4)},${(lat + 0.005).toFixed(4)}&layer=mapnik&marker=${lat},${lon}`

  return (

    <Card>

      <CardHeader>
        <CardTitle>Map — {name}</CardTitle>
      </CardHeader>

      <CardContent className="p-0 overflow-hidden rounded-b-xl">
        <iframe
          src={mapUrl}
          width="100%"
          height="300"
          title={`Map of ${name}`}
          className="border-0"
          loading="lazy"
        />
      </CardContent>

    </Card>

  )

}
