// import { createFileRoute } from "@tanstack/react-router"
// import { useQuery } from "@tanstack/react-query"
// import { useState, useEffect } from "react"

// import { getWeather } from "../api/weather"
// import WeatherIcon from "#/components/weather-icon"
// import HourlyGraph from "#/components/hourly-graph"
// import LocationSearch from "#/components/LocationSearch"
// import LocationPopup from "#/components/location-popup"

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

//   const [lat, setLat] = useState<number | null>(null)
//   const [lon, setLon] = useState<number | null>(null)
//   const [locationName, setLocationName] = useState("Detecting location...")

//   // AUTO DETECT LOCATION
//   useEffect(() => {

//     navigator.geolocation.getCurrentPosition(

//       (position) => {

//         const latitude = position.coords.latitude
//         const longitude = position.coords.longitude

//         setLat(latitude)
//         setLon(longitude)

//         setLocationName("Current Location")

//       },

//       () => {

//         setLat(17.385)
//         setLon(78.4867)
//         setLocationName("Hyderabad")

//       }

//     )

//   }, [])

//   const handleLocationSelect = (
//     latitude: number,
//     longitude: number,
//     name: string
//   ) => {

//     setLat(latitude)
//     setLon(longitude)
//     setLocationName(name)

//   }

//   const { data: weather, isLoading } = useQuery({

//     queryKey: ["weather", lat, lon],

//     queryFn: () => getWeather(lat!, lon!),

//     enabled: !!lat && !!lon,

//   })
//   useEffect(() => {

//   const fetchCityName = async () => {

//     if (!lat || !lon) return

//     try {

//       const res = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
//       )

//       const data = await res.json()

//       if (data?.address) {

//         const city =
//           data.address.city ||
//           data.address.town ||
//           data.address.village ||
//           data.address.state

//         setLocationName(city)
//       }

//     } catch (error) {

//       console.log("Failed to fetch city name")

//     }

//   }

//   fetchCityName()

// }, [lat, lon])

//   if (!lat || !lon) {
//     return <div className="p-6">Getting your location...</div>
//   }

//   if (isLoading) {
//     return <div className="p-6">Loading weather...</div>
//   }

//   if (!weather || !weather.daily) {
//     return <div className="p-6">Weather data unavailable</div>
    
//   }

//   const daily = weather.daily
//   const current=weather.current
//   const todayIndex = 2

//   const todayMax = daily.temperature_2m_max[todayIndex]
//   const todayMin = daily.temperature_2m_min[todayIndex]
//   const temps=current.temperature_2m

//   const currentTemp=weather.hourly.temperature_2m[0]
//   let bgClass="bg-sky-100"
//   if(currentTemp>35){
//     bgClass="bg-orange-200"
//   }
//   if(currentTemp<15){
//     bgClass="bg-blue-200"
//   }

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
//          <div className="text-gray-500">
//           Max Temp:{todayMax}°C
//          </div>
//         </CardContent>

//       </Card>

//       <HourlyGraph data={weather} />


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
//                 <WeatherIcon temp={max} />
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

import LocationSearch from "../components/LocationSearch"
import LocationPopup from "../components/location-popup"
import HourlyGraph from "#/components/hourly-graph"
import ForecastCards from "#/components/weekly-forecast"
import {TodayWeatherCard}  from "#/components/weather-card"
import SunCard from "#/components/sun-card"
import DateWeatherCard from "#/components/DateWeatherCard"
import { WeatherDescription } from "#/components/weather-card"

export const Route = createFileRoute("/")({
  component: Index,
})

function Index() {

  const [lat, setLat] = useState<number | null>(null)
  const [lon, setLon] = useState<number | null>(null)
  const [locationName, setLocationName] = useState("")

  // Detect device location
  useEffect(() => {

    navigator.geolocation.getCurrentPosition(

      (position) => {

        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        setLat(latitude)
        setLon(longitude)
        setLocationName("Your Location")

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
    useEffect(() => {

  const fetchCityName = async () => {

    if (!lat || !lon) return

    try {

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      )

      const data = await res.json()

      if (data?.address) {

        const city =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          data.address.state

        setLocationName(city)
      }

    } catch (error) {

      console.log("Failed to fetch city name")

    }

  }

  fetchCityName()

}, [lat, lon])

  if (!lat || !lon) {
    return <div className="p-6">Getting your location...</div>
  }

  if (isLoading) {
    return <div className="p-6">Loading weather...</div>
  }

  if (!weather || !weather.daily) {
    return <div className="p-6">Weather data unavailable</div>
  }
  const timezone=weather.timezone
  const daily = weather.daily
  const current = weather.current
  // const hourly=weather.hourly
 
  const todayIndex = 2

  const todayMax = daily.temperature_2m_max[todayIndex]
  const todayMin = daily.temperature_2m_min[todayIndex]
  const humidity =current.relative_humidity_2m
  const temps = current.temperature_2m
  const rain =daily.rain_sum[0]
  const sunrise=daily.sunrise[todayIndex]
  const sunset=daily.sunset[todayIndex]
  const isDay=weather.current.is_day

  // const chartData = weather.hourly.time.slice(0, 24).map((t: any, i: number) => ({
  //   hour: new Date(t).getHours(),
  //   max: weather.hourly.temperature_2m[i],
  //   min: weather.hourly.temperature_2m[i],
  // }))

  const currentTemp = temps

  let bgClass = "bg-sky-100"

  if (currentTemp > 35) {
    bgClass = "bg-orange-200"
  }

  if (currentTemp < 15) {
    bgClass = "bg-blue-200"
  }

  return (

    <div className={`container mx-auto p-6 space-y-6 min-h-screen ${bgClass}`}>

      <LocationSearch onSelect={handleLocationSelect} />

      <h2 className="text-xl font-semibold text-gray-500">
        Weather in {locationName}
      </h2>

      <LocationPopup weather={weather} />
 
      <div className="grid md:grid-cols-3 gap-4 item-stretch">
        <div className="col-span-1">
      <TodayWeatherCard
        temps={temps}
        todayMin={todayMin}
        todayMax={todayMax}
        humidity={humidity}
        timezone={timezone}
        rain={rain}
        weatherCode={weather.current.weathercode}
        isDay={isDay}
      />
      </div>
      <div className="col-span-1">
        <WeatherDescription/>
      </div>
      <div className="col-span-1">
      <DateWeatherCard weather={weather}/>
      </div>
      </div>
      
      <SunCard
      sunrise={sunrise}
      sunset={sunset}/>

      <HourlyGraph data={weather} />

      <ForecastCards daily={daily} />

    </div>

  )
}