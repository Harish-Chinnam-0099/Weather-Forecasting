import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import type { WeatherData } from "#/types/types"

const todayIndex = 2

export default function HourlyGraph({ data }: { data: WeatherData }) {
  if (!data) return null

  const today = new Date().toISOString().split("T")[0]
  const dailyMax = data.daily.temperature_2m_max[todayIndex]
  const dailyMin = data.daily.temperature_2m_min[todayIndex]

  const chartData = data.hourly.time
    .map((time, i) => ({
      hour: time.split("T")[1].slice(0, 5),
      temp: data.hourly.temperature_2m[i],
      max: dailyMax,
      min: dailyMin,
      time,
    }))
    .filter((item) => item.time.startsWith(today))

  return (
    <div className="w-full h-[350px] mt-6">
      <h2 className="text-lg font-semibold mb-4 text-foreground">
        Today's Hourly Temperature
      </h2>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis unit="°C" />
            <Tooltip formatter={(v) => `${v}°C`} />
            <Legend />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#ff7300"
              name="Temperature"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="max"
              stroke="#ef4444"
              name="Max Temp"
              dot={false}
              strokeDasharray="5 5"
            />
            <Line
              type="monotone"
              dataKey="min"
              stroke="#3b82f6"
              name="Min Temp"
              dot={false}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
