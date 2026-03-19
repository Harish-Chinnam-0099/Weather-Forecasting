import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import WeatherIcon from "./weather-icon"
import { Droplets, Thermometer, TrendingDown, TrendingUp, CalendarDays } from "lucide-react"
import type { WeatherData } from "#/types/types"

export default function DateWeatherCard({ weather }: { weather: WeatherData }) {
  const [date, setDate] = useState<Date | undefined>()
  const [open, setOpen] = useState(false)

  if (!weather) return null

  const daily = weather.daily
  const minDate = new Date(daily.time[0] + "T00:00:00")
  const maxDate = new Date(daily.time[daily.time.length - 1] + "T00:00:00")

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return
    setDate(selectedDate)
    setOpen(true)
  }

  let selectedWeather: {
    max: number
    min: number
    rain: number
    weathercode: number
    precipChance: number
    windMax: number
  } | null = null

  if (date) {
    const selectedDay = date.toLocaleDateString("en-CA")
    const index = daily.time.findIndex((d) => d === selectedDay)
    if (index !== -1) {
      selectedWeather = {
        max: daily.temperature_2m_max[index],
        min: daily.temperature_2m_min[index],
        rain: daily.rain_sum[index],
        weathercode: daily.weathercode[index],
        precipChance: daily.precipitation_probability_max[index] ?? 0,
        windMax: daily.wind_speed_10m_max[index] ?? 0,
      }
    }
  }

  return (
    <>
      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <CalendarDays className="w-3.5 h-3.5" />
            Forecast Explorer
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            Select any date within the 16-day forecast window
          </p>
        </CardHeader>

        {/* On mobile: stacked. On md+: calendar left, hint right */}
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">

            {/* Calendar */}
            <div className="flex justify-center p-4 sm:p-6 border-b md:border-b-0 md:border-r border-border/50">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                disabled={{ before: minDate, after: maxDate }}
                className="rounded-xl"
              />
            </div>

            {/* Right panel — hint or selected date */}
            <div className="flex-1 flex items-center justify-center p-6 min-h-[180px]">
              {!date ? (
                <div className="text-center space-y-2 max-w-[180px]">
                  <CalendarDays className="w-10 h-10 text-muted-foreground/40 mx-auto" />
                  <p className="text-sm font-medium text-muted-foreground">Pick a date</p>
                  <p className="text-xs text-muted-foreground/70 leading-relaxed">
                    Tap any highlighted date to see the forecast
                  </p>
                </div>
              ) : selectedWeather ? (
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-3">
                    <WeatherIcon
                      weatherCode={selectedWeather.weathercode}
                      isDay={1}
                      size="md"
                    />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {date.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}
                      </p>
                      <p className="text-xs text-muted-foreground">Forecast details</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 rounded-2xl bg-muted/40 border border-border/50">
                      <div className="flex items-center gap-1 text-muted-foreground mb-1">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span className="text-xs">High</span>
                      </div>
                      <p className="text-xl font-bold text-foreground">{Math.round(selectedWeather.max)}°C</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-muted/40 border border-border/50">
                      <div className="flex items-center gap-1 text-muted-foreground mb-1">
                        <TrendingDown className="w-3.5 h-3.5" />
                        <span className="text-xs">Low</span>
                      </div>
                      <p className="text-xl font-bold text-foreground">{Math.round(selectedWeather.min)}°C</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-muted/40 border border-border/50">
                      <div className="flex items-center gap-1 text-muted-foreground mb-1">
                        <Droplets className="w-3.5 h-3.5" />
                        <span className="text-xs">Precip.</span>
                      </div>
                      <p className="text-base font-bold text-foreground">{selectedWeather.precipChance}%</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-muted/40 border border-border/50">
                      <div className="flex items-center gap-1 text-muted-foreground mb-1">
                        <Thermometer className="w-3.5 h-3.5" />
                        <span className="text-xs">Rainfall</span>
                      </div>
                      <p className="text-base font-bold text-foreground">{selectedWeather.rain} mm</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center">
                  No forecast available for this date.
                </p>
              )}
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Mobile-only dialog for selected date (on sm screens where right panel may be small) */}
      <Dialog open={open && !selectedWeather} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm rounded-3xl">
          <DialogHeader>
            <DialogTitle>Weather on {date?.toDateString()}</DialogTitle>
            <DialogDescription>Forecast details for the selected date.</DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">No forecast available for this date.</p>
        </DialogContent>
      </Dialog>
    </>
  )
}
