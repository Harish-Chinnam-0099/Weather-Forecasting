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
      <h2 className="text-lg font-semibold mb-4 text-gray-500">
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





// "use client"
// import {ResponsiveLine} from "@nivo/line"

// export default function HourlyGraph({ data }: { data: any }) {
//   if (!data) return null

//   const today = new Date().toISOString().split("T")[0]

//   const hours = data.hourly.time
//   const temps = data.hourly.temperature_2m

//   const todayData = hours
//     .map((time: string, i: number) => ({
//       time,
//       temp: temps[i],
//     }))
//     .filter((item: any) => item.time.startsWith(today))

//   const chartData = [
//     {
//       id: "Max Temp",
//       data: todayData.map((item: any) => ({
//         x: item.time.split("T")[1],
//         y: item.temp + 1,
//       })),
//     },
//     {
//       id: "Min Temp",
//       data: todayData.map((item: any) => ({
//         x: item.time.split("T")[1],
//         y: item.temp - 1,
//       })),
//     },
//   ]

//   return (
//     <div className="w-full h-[350px] mt-6">
//       <h2 className="text-lg font-semibold mb-4 text-gray-500">
//         Today Hourly Temperature
//       </h2>

//       <div className="w-full h-[300px]">
//         <ResponsiveLine
//           data={chartData}
//           margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
//           xScale={{ type: "point" }}
//           yScale={{ type: "linear", min: "auto", max: "auto" }}
//           axisBottom={{
//             legend: "Hour",
//             legendOffset: 36,
//             legendPosition: "middle",
//           }}
//           axisLeft={{
//             legend: "Temperature °C",
//             legendOffset: -40,
//             legendPosition: "middle",
//           }}
//           pointSize={6}
//           pointBorderWidth={2}
//           useMesh={true}
//         />
//       </div>
//     </div>
//   )
// }