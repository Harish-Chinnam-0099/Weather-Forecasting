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
    <>
      {/* <style>{`
        @keyframes sunGlow {
          0%, 100% {
            filter: drop-shadow(0 0 4px rgba(255, 140, 0, 0.6));
          }
          50% {
            filter: drop-shadow(0 0 8px rgba(255, 140, 0, 0.9));
          }
        }
        @keyframes sunsetGlow {
          0%, 100% {
            filter: drop-shadow(0 0 4px rgba(220, 38, 38, 0.6));
          }
          50% {
            filter: drop-shadow(0 0 8px rgba(220, 38, 38, 0.9));
          }
        }
        .sunrise-icon {
          animation: sunGlow 2s ease-in-out infinite;
        }
        .sunset-icon {
          animation: sunsetGlow 2s ease-in-out infinite;
        }
      `}</style> */}

<style>{`
  @keyframes sunriseMove {
    0%,100% {
      transform: translateY(2px);
    }
    50% {
      transform: translateY(-2px);
    }
  }

  @keyframes sunsetMove {
    0%,100% {
      transform: translateY(-2px);
    }
    50% {
      transform: translateY(2px);
    }
  }

  .sunrise-icon {
    color: #f59e0b;
    animation: sunriseMove 3s ease-in-out infinite;
  }

  .sunset-icon {
    color: #6366f1;
    animation: sunsetMove 3s ease-in-out infinite;
  }
`}</style>

      <Card>

        <CardHeader>
          <CardTitle>Sun Cycle</CardTitle>
        </CardHeader>

        <CardContent>

          <div className="grid grid-cols-2 gap-4">

            {/* Sunrise */}

            <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-950/40 dark:to-yellow-950/40 border border-amber-300 dark:border-amber-700/50 shadow-sm hover:shadow-md transition-shadow">

              <Sunrise className="w-10 h-10 text-amber-600 dark:text-amber-400 mb-2 sunrise-icon" />

              <p className="text-sm text-amber-700 dark:text-amber-300">
                Sunrise
              </p>

              <p className="text-lg font-semibold text-amber-900 dark:text-amber-100">
                {sunriseTime}
              </p>

            </div>


            {/* Sunset */}

            <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-950/40 dark:to-orange-950/40 border border-red-300 dark:border-red-700/50 shadow-sm hover:shadow-md transition-shadow">

              <Sunset className="w-10 h-10 text-red-600 dark:text-red-400 mb-2 sunset-icon" />

              <p className="text-sm text-red-700 dark:text-red-300">
                Sunset
              </p>

              <p className="text-lg font-semibold text-red-900 dark:text-red-100">
                {sunsetTime}
              </p>

            </div>

          </div>

        </CardContent>

      </Card>
    </>
  )
}