"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function HourlyGraph({ data }: { data: any }) {
  if (!data) return null

  const today = new Date().toISOString().split("T")[0]

  const hours = data.hourly.time
  const temps = data.hourly.temperature_2m

  const todayData = hours
    .map((time: string, i: number) => ({
      time,
      temp: temps[i],
    }))
    .filter((item: any) => item.time.startsWith(today))

  const chartData = todayData.map((item: any) => ({
    hour: item.time.split("T")[1],
    max: item.temp + 1,
    min: item.temp - 1,
  }))

  return (
    <div className="w-full h-[350px] mt-6">
      <h2 className="text-lg font-semibold mb-4">
        Today Hourly Temperature
      </h2>

<div className="w-full h-[300px]">
  <ResponsiveContainer width="100%" height={300}>    
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="hour" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="max"
            stroke="#ff7300"
            name="Max Temp"
          />

          <Line
            type="monotone"
            dataKey="min"
            stroke="#007bff"
            name="Min Temp"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
    </div>
  )
}