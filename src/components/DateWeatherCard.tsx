import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
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

  let selectedWeather = null

  if (date) {
    const selectedDay = date.toLocaleDateString("en-CA")
    const index = daily.time.findIndex((d) => d === selectedDay)

    if (index !== -1) {
      selectedWeather = {
        max: daily.temperature_2m_max[index],
        min: daily.temperature_2m_min[index],
        rain: daily.rain_sum[index],
      }
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Select Date Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            disabled={{ before: minDate, after: maxDate }}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Weather on {date?.toDateString()}</DialogTitle>
            <DialogDescription>Forecast details for the selected date.</DialogDescription>
          </DialogHeader>

          {selectedWeather ? (
            <div className="space-y-2">
              <p>Max Temp: {selectedWeather.max}°C</p>
              <p>Min Temp: {selectedWeather.min}°C</p>
              <p>Rain: {selectedWeather.rain} mm</p>
            </div>
          ) : (
            <p>No forecast available for this date.</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
