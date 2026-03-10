import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Sunrise, Sunset } from "lucide-react"

export default function SunCard({
  sunrise,
  sunset,
}: {
  sunrise: string
  sunset: string
}) {

  const sunriseTime = new Date(sunrise).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  const sunsetTime = new Date(sunset).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <Card>

      <CardHeader>
        <CardTitle>Sun Cycle</CardTitle>
      </CardHeader>

      <CardContent>

        <div className="grid grid-cols-2 gap-4">

          {/* Sunrise */}

          <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-secondary border border-border">

            <Sunrise className="w-8 h-8 text-primary mb-2" />

            <p className="text-sm text-muted-foreground">
              Sunrise
            </p>

            <p className="text-lg font-semibold text-foreground">
              {sunriseTime}
            </p>

          </div>


          {/* Sunset */}

          <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-secondary border border-border">

            <Sunset className="w-8 h-8 text-primary mb-2" />

            <p className="text-sm text-muted-foreground">
              Sunset
            </p>

            <p className="text-lg font-semibold text-foreground">
              {sunsetTime}
            </p>

          </div>

        </div>

      </CardContent>

    </Card>
  )
}