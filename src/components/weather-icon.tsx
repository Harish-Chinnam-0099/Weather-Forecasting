// export default function WeatherIcon({
//   temp,
//   rain,
// }: {
//   temp: number
//   rain: number
// }) {

//   // HEAVY RAIN
//   if (rain > 10) {
//     return <span className="text-4xl">⛈️</span>
//   }

//   // NORMAL RAIN
//   if (rain > 0) {
//     return <span className="text-4xl">🌧️</span>
//   }


//   // HOT SUNNY
//   if (temp >= 40) {
//     return <span className="text-4xl">🔥</span>
//   }

//   // SUNNY
//   if (temp >= 28) {
//     return <span className="text-4xl">☀️</span>
//   }

//   // PARTLY CLOUDY
//   if (temp >= 20) {
//     return <span className="text-4xl">⛅</span>
//   }

//   // CLOUDY
//   if (temp >= 10) {
//     return <span className="text-4xl">☁️</span>
//   }

//   // COLD
//   if (temp >= 0) {
//     return <span className="text-4xl">🥶</span>
//   }

//   // FREEZING
//   return <span className="text-4xl">❄️</span>
// }

// export default function WeatherIcon({
//   weatherCode,
// }: {
//   weatherCode: number
// }) {

//   if (weatherCode === 0) {
//     return <span className="text-4xl">☀️</span>
//   }

//   if (weatherCode >= 1 && weatherCode <= 3) {
//     return <span className="text-4xl">⛅</span>
//   }

//   if (weatherCode >= 45 && weatherCode <= 48) {
//     return <span className="text-4xl">🌫️</span>
//   }

//   if (weatherCode >= 51 && weatherCode <= 67) {
//     return <span className="text-4xl">🌧️</span>
//   }

//   if (weatherCode >= 71 && weatherCode <= 77) {
//     return <span className="text-4xl">❄️</span>
//   }

//   if (weatherCode >= 95) {
//     return <span className="text-4xl">⛈️</span>
//   }

//  return <span className="text-4xl">🌤️</span>
// }




export default function WeatherIcon({
  weatherCode,
  isDay,
}: {
  weatherCode: number
  isDay: number
}) {

  const isNight = isDay === 0

  if (weatherCode === 0) {
    return <span className="text-4xl">{isNight ? "🌙" : "☀️"}</span>
  }

  if (weatherCode >= 1 && weatherCode <= 3) {
    return <span className="text-4xl">{isNight ? "🌙☁️" : "⛅"}</span>
  }

  if (weatherCode >= 45 && weatherCode <= 48) {
    return <span className="text-4xl">🌫️</span>
  }

  if (weatherCode >= 51 && weatherCode <= 67) {
    return <span className="text-4xl">🌧️</span>
  }

  if (weatherCode >= 71 && weatherCode <= 77) {
    return <span className="text-4xl">❄️</span>
  }

  if (weatherCode >= 95) {
    return <span className="text-4xl">⛈️</span>
  }

  return <span className="text-4xl">{isNight ? "🌙" : "🌤️"}</span>
}