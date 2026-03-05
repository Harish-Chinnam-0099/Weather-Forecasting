// import { createFileRoute } from "@tanstack/react-router"
// import { useQuery } from "@tanstack/react-query"
// import { useState } from "react"

// import { getWeather } from "../api/weather"

// import HourlyGraph from "#/components/hourly-graph"
// import LocationPopup from "#/components/location-popup"
// import LocationSearch from "#/components/LocationSearch"

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"

// export const Route = createFileRoute("/")({
//   component: Index,
// })

// function Index() {

//   // DEFAULT LOCATION (Hyderabad)
//   const [lat, setLat] = useState(17.385)
//   const [lon, setLon] = useState(78.4867)

//   // WEATHER API
//   const { data: weather, isLoading } = useQuery({
//     queryKey: ["weather", lat, lon],
//     queryFn: () => getWeather(lat, lon),
//   })

//   if (isLoading) {
//     return <div className="p-6">Loading weather...</div>
//   }

//   if (!weather || !weather.daily) {
//     return <div className="p-6">Weather data unavailable</div>
//   }

//   const daily = weather.daily
//   const todayIndex = 2

//   const todayMax = daily.temperature_2m_max[todayIndex]
//   const todayMin = daily.temperature_2m_min[todayIndex]

//   return (
//     <div className="container mx-auto p-6 space-y-8">

//       {/* LOCATION SEARCH */}

//       <LocationSearch
//         onSelect={(latitude: number, longitude: number) => {
//           setLat(latitude)
//           setLon(longitude)
//         }}
//       />

//       {/* WEATHER ADVICE POPUP */}

//       <LocationPopup weather={weather} />


//       {/* TODAY WEATHER CARD */}

//       <Card>

//         <CardHeader>
//           <CardTitle>Today's Weather</CardTitle>
//         </CardHeader>

//         <CardContent>

//           <div className="text-3xl font-bold">
//             {todayMax}°C
//           </div>

//           <div className="text-gray-500">
//             Min Temp: {todayMin}°C
//           </div>

//         </CardContent>

//       </Card>


//       {/* HOURLY GRAPH */}

//       <HourlyGraph data={weather} />


//       {/* DAILY WEATHER CARDS */}

//       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">

//         {daily.time.map((day: string, i: number) => {

//           const max = daily.temperature_2m_max[i]
//           const min = daily.temperature_2m_min[i]

//           let label = day

//           if (i === todayIndex) label = "Today"
//           if (i === todayIndex - 1) label = "Yesterday"
//           if (i === todayIndex - 2) label = "2 Days Ago"

//           return (
//             <Card key={i}>

//               <CardHeader>
//                 <CardTitle className="text-sm">
//                   {label}
//                 </CardTitle>
//               </CardHeader>

//               <CardContent>

//                 <div className="text-lg font-semibold">
//                   {max}°C
//                 </div>

//                 <div className="text-sm text-gray-500">
//                   Min: {min}°C
//                 </div>

//               </CardContent>

//             </Card>
//           )
//         })}

//       </div>

//     </div>
//   )
// }


import { createFileRoute } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { useState, useEffect } from "react"

import { getWeather } from "../api/weather"
import WeatherIcon from "#/components/weather-icon"
import HourlyGraph from "#/components/hourly-graph"
import LocationSearch from "#/components/LocationSearch"
import LocationPopup from "#/components/location-popup"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const Route = createFileRoute("/")({
  component: Index,
})

function Index() {

  const [lat, setLat] = useState<number | null>(null)
  const [lon, setLon] = useState<number | null>(null)
  const [locationName, setLocationName] = useState("Detecting location...")

  // AUTO DETECT LOCATION
  useEffect(() => {

    navigator.geolocation.getCurrentPosition(

      (position) => {

        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        setLat(latitude)
        setLon(longitude)

        setLocationName("Current Location")

      },

      () => {

        setLat(17.385)
        setLon(78.4867)
        setLocationName("Hyderabad")

      }

    )

  }, [])

  const handleLocationSelect = (
    latitude: number,
    longitude: number,
    name: string
  ) => {

    setLat(latitude)
    setLon(longitude)
    setLocationName(name)

  }

  const { data: weather, isLoading } = useQuery({

    queryKey: ["weather", lat, lon],

    queryFn: () => getWeather(lat!, lon!),

    enabled: !!lat && !!lon,

  })

  if (!lat || !lon) {
    return <div className="p-6">Getting your location...</div>
  }

  if (isLoading) {
    return <div className="p-6">Loading weather...</div>
  }

  if (!weather || !weather.daily) {
    return <div className="p-6">Weather data unavailable</div>
    
  }

  const daily = weather.daily
  const todayIndex = 2

  const todayMax = daily.temperature_2m_max[todayIndex]
  const todayMin = daily.temperature_2m_min[todayIndex]

  const currentTemp=weather.hourly.temperature_2m[0]
  let bgClass="bg-sky-100"
  if(currentTemp>35){
    bgClass="bg-orange-200"
  }
  if(currentTemp<15){
    bgClass="bg-blue-200"
  }

  return (

    <div className={`container mx-auto p-6 space-y-8 min-h-screen ${bgClass}`}>

      <LocationSearch onSelect={handleLocationSelect} />
      <h2 className="text-xl font-semibold">
        Weather in {locationName}
      </h2>


      <LocationPopup weather={weather} />


      <Card>

        <CardHeader>
          <CardTitle>Today's Weather</CardTitle>
        </CardHeader>

        <CardContent>
          
          <div className="text-3xl font-bold">
            {todayMax}°C
          </div>

          <div className="text-gray-500">
            Min Temp: {todayMin}°C
          </div>

        </CardContent>

      </Card>

      <HourlyGraph data={weather} />


      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">

        {daily.time.map((day: string, i: number) => {

          const max = daily.temperature_2m_max[i]
          const min = daily.temperature_2m_min[i]

          let label = day

          if (i === todayIndex) label = "Today"
          if (i === todayIndex - 1) label = "Yesterday"
          if (i === todayIndex - 2) label = "2 Days Ago"

          return (

            <Card key={i}>

              <CardHeader>
                <CardTitle className="text-sm">
                  {label}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <WeatherIcon temp={max} />
                <div className="text-lg font-semibold">
                  {max}°C
                </div>

                <div className="text-sm text-gray-500">
                  Min: {min}°C
                </div>

              </CardContent>

            </Card>

          )

        })}

      </div>

    </div>

  )

}


