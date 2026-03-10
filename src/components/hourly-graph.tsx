// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts"
// import type { WeatherData } from "#/types/types"

// const todayIndex = 2

// export default function HourlyGraph({ data }: { data: WeatherData }) {
//   if (!data) return null

//   const today = new Date().toISOString().split("T")[0]
//   const dailyMax = data.daily.temperature_2m_max[todayIndex]
//   const dailyMin = data.daily.temperature_2m_min[todayIndex]

//   const chartData = data.hourly.time
//     .map((time, i) => ({
//       hour: time.split("T")[1].slice(0, 5),
//       temp: data.hourly.temperature_2m[i],
//       max: dailyMax,
//       min: dailyMin,
//       time,
//     }))
//     .filter((item) => item.time.startsWith(today))

//   return (
//     <div className="w-full h-[350px] mt-6">
//       <h2 className="text-lg font-semibold mb-4 text-foreground">
//         Today's Hourly Temperature
//       </h2>

//       <div className="w-full h-[300px]">
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="hour" />
//             <YAxis unit="°C" />
//             <Tooltip formatter={(v) => `${v}°C`} />
//             <Legend />
//             <Line
//               type="monotone"
//               dataKey="temp"
//               stroke="#ff7300"
//               name="Temperature"
//               dot={false}
//             />
//             <Line
//               type="monotone"
//               dataKey="max"
//               stroke="#ef4444"
//               name="Max Temp"
//               dot={false}
//               strokeDasharray="5 5"
//             />
//             <Line
//               type="monotone"
//               dataKey="min"
//               stroke="#3b82f6"
//               name="Min Temp"
//               dot={false}
//               strokeDasharray="5 5"
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   )
// }





import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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
    <div className="w-full mt-6">
      <h2 className="text-lg font-semibold text-black drop-shadow-md">
        Today's Hourly Temperature
      </h2>

      <div className="w-full h-[260px] sm:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>

            {/* Grid */}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(156,163,175,0.25)"
            />

            {/* X Axis */}
            <XAxis
              dataKey="hour"
              interval={2}
              tick={{ fontSize: 12 }}
            />

            {/* Y Axis */}
            <YAxis
              unit="°C"
              tick={{ fontSize: 12 }}
              width={40}
            />

            {/* Tooltip */}
            <Tooltip
              formatter={(v) => `${v}°C`}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                backgroundColor: "var(--background)",
                color: "var(--foreground)",
              }}
            />

            {/* Temperature line */}
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#ff7300"
              strokeWidth={3}
              dot={false}
              name="Temperature"
            />

            {/* Max temp */}
            {/* <Line
            //   type="monotone"
            //   dataKey="max"
            //   stroke="#ef4444"
            //   strokeWidth={2}
            //   strokeDasharray="5 5"
            //   dot={false}
            // />

            // {/* Min temp */}
            {/* // <Line */}
            {/* //   type="monotone"
            //   dataKey="min"
            //   stroke="#3b82f6"
            //   strokeWidth={2}
            //   strokeDasharray="5 5"
            //   dot={false}
            // /> */} 
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}