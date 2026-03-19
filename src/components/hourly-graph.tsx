import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card"
import type { WeatherData } from "#/types/types"

export default function HourlyGraph({ data }: { data: WeatherData }) {
  if (!data) return null

  const today = new Date().toISOString().split("T")[0]

  const chartData = data.hourly.time
    .map((time, i) => ({
      hour: time.split("T")[1].slice(0, 5),
      temp: Math.round(data.hourly.temperature_2m[i]),
      precip: data.hourly.precipitation_probability[i] ?? 0,
      time,
    }))
    .filter((item) => item.time.startsWith(today))

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Today's Hourly Forecast
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[260px] sm:h-[290px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 8, right: 12, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="rgba(156,163,175,0.15)" />

              <XAxis
                dataKey="hour"
                interval={2}
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                yAxisId="temp"
                unit="°"
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                width={34}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                yAxisId="precip"
                orientation="right"
                unit="%"
                domain={[0, 100]}
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                width={34}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--card)",
                  color: "var(--foreground)",
                  fontSize: "12px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
                formatter={(value, name) => [
                  name === "temp" ? `${value}°C` : `${value}%`,
                  name === "temp" ? "Temperature" : "Precip. Chance",
                ]}
                labelStyle={{ color: "var(--muted-foreground)", marginBottom: "4px" }}
              />

              <Bar
                yAxisId="precip"
                dataKey="precip"
                fill="#3b82f6"
                opacity={0.25}
                radius={[3, 3, 0, 0]}
                name="precip"
              />

              <Line
                yAxisId="temp"
                type="monotone"
                dataKey="temp"
                stroke="#f97316"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
                name="temp"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-5 mt-3 justify-center text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-0.5 bg-orange-500 rounded-full" />
            <span>Temperature</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-3 bg-blue-500/30 rounded-sm" />
            <span>Precip. Chance</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
