// import { useState, useEffect } from "react"

// export function useLocation() {
//   const [location, setLocation] = useState<{
//     lat: number
//     lon: number
//   } | null>(null)

//   useEffect(() => {
//     if (!navigator.geolocation) return

//     navigator.geolocation.getCurrentPosition((position) => {
//       setLocation({
//         lat: position.coords.latitude,
//         lon: position.coords.longitude,
//       })
//     })
//   }, [])

//   return location
// }