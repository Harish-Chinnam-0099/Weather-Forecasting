// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"

// import LocationSearch from "./LocationSearch"
// import LocationPopup from "#/components/location-popup"

// type Props = {
//   weather: any
//   locationName: string
//   temps: number
//   todayMin: number
//   todayMax: number
//   bgClass: string
//   handleLocationSelect: (lat: number, lon: number, name: string) => void
// }

// export default function TodayWeather({
//   weather,
//   locationName,
//   temps,
//   todayMin,
//   todayMax,
//   bgClass,
//   handleLocationSelect,
// }: Props) {

//   return (

//     <div className={`container mx-auto p-6 space-y-8 min-h-screen ${bgClass}`}>

//       <LocationSearch onSelect={handleLocationSelect} />

//       <h2 className="text-xl font-semibold">
//         Weather in {locationName}
//       </h2>

//       <LocationPopup weather={weather} />

//       <Card>

//         <CardHeader>
//           <CardTitle>Today's Weather</CardTitle>
//         </CardHeader>

//         <CardContent>

//           <div className="text-3xl font-bold">
//             {temps}°C
//           </div>

//           <div className="text-gray-500">
//             Min Temp: {todayMin}°C
//           </div>

//           <div className="text-gray-500">
//             Max Temp: {todayMax}°C
//           </div>

//         </CardContent>

//       </Card>

//     </div>
//   )
// }


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import WeatherIcon from "./weather-icon"

export function TodayWeatherCard({
  temps,
  todayMin,
  todayMax,
  humidity,
  rain,
  timezone,
  weathercode,
  isDay,
}: any) {
const currentTime=new Date().toLocaleTimeString([],{
  hour:"2-digit",
  minute:"2-digit",
  timeZone: timezone,
})
  return (

    <Card className="h-full">

      <CardHeader>
        <CardTitle>{`Today Weather : ${currentTime}`} </CardTitle>
      </CardHeader>

      <CardContent className="flex justify-between">
        <div >
        <WeatherIcon weatherCode={weathercode} isDay={isDay}/>
        <div className="text-3xl font-bold">
          {temps}°C
        </div>

        <div className="text-gray-500">
          Min Temp: {todayMin}°C
        </div>

        <div className="text-gray-500">
          Max Temp: {todayMax}°C
        </div>
         
         <div className="text-gray-500">
          Humidity: {humidity}%
         </div>
         <div className="text-gray-500">
          Rainfall:{rain}mm
         </div>
        </div>
      </CardContent>

    </Card>

  )
}

export  function WeatherDescription() {
  return (
    <Card className="h-full">
      <CardContent>
    <div className="text-sm text-gray-500 space-y-1">

      <h2 className="font-semibold">Description</h2>

      <p>☀️ <strong>Clear Sky</strong> — Clear weather, no clouds</p>

      <p>🌤️ <strong>Mainly Clear</strong> — Mostly sunny with very few clouds</p>

      <p>⛅ <strong>Partly Cloudy</strong> — Sun and clouds mixed</p>

      <p>🌫️ <strong>Fog</strong> — Low visibility due to fog</p>

      <p>🌧️ <strong>Light Rain</strong> — Light rainfall</p>

      <p>❄️ <strong>Moderate Snow</strong> — Normal snowfall</p>

      <p>⛈️ <strong>Thunderstorm</strong> — Rain with lightning and thunder</p>

    </div>
     </CardContent>
    </Card>
  )
}