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

          <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-orange-50">

            <Sunrise className="w-8 h-8 text-orange-500 mb-2" />

            <p className="text-sm text-gray-500">
              Sunrise
            </p>

            <p className="text-lg font-semibold text-gray-500">
              {sunriseTime}
            </p>

          </div>


          {/* Sunset */}

          <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-purple-50">

            <Sunset className="w-8 h-8 text-purple-500 mb-2" />

            <p className="text-sm text-gray-500">
              Sunset
            </p>

            <p className="text-lg font-semibold text-gray-500">
              {sunsetTime}
            </p>

          </div>

        </div>

      </CardContent>

    </Card>
  )
}