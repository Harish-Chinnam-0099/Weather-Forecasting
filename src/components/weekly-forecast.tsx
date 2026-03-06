// import { Card } from "./ui/card";

// export default function WeeklyForecast({days}:{days:any[]}){
//     return(
//         <div className="grid grid-cols-4 gap-4">
//             {days.map((d,i)=>(
//                 <Card key={i} className="p-4">
//                     <p>{d.date}</p>
//                     <p>{d.max}/{d.min}</p>
//                 </Card>
//             ))}
//         </div>
//     )
// }


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import WeatherIcon from "./weather-icon"

export default function ForecastCards({ daily }: any) {
  
  const todayIndex = 2

  return (

    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">

      {daily.time.slice(0,10).map((day: string, i: number) => {
 
       const realIndex=i
        const max = daily.temperature_2m_max[realIndex]
        const min = daily.temperature_2m_min[realIndex]
        const rain=daily.rain_sum[realIndex]

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
            <WeatherIcon  weatherCode={daily.weathercode[i]} isDay={0}/>
              <div className="text-sm text-gray-500">
                Max: {max}°C
              </div>

              <div className="text-sm text-gray-500">
                Min: {min}°C
              </div>
              <div className="text-sm text-gray-500">
                Rain: {rain}mm
              </div>
            </CardContent>

          </Card>

        )
      })}

    </div>

  )
}