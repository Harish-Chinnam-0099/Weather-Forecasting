// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription
// } from "@/components/ui/dialog";

// export default function LocationPopup({ weather }: any) {

//   if (!weather) return null;


//   const temp = weather.hourly.temperature_2m[0];
//   const curr=weather.current.temperature_2m;
//   const rain =weather.current.rain

//   let advice = "Great weather to go outside!";

//   if(rain>0){
//     advice= "It's raining outside. Carry Raincoat or Umbrella !"
//   }
//   if (temp > 35) {
//     advice = "Very hot outside. Carry water.";
//   }

//   if (temp < 15) {
//     advice = "Cold weather. Wear warm clothes.";
//   }

//   return (
//     <Dialog defaultOpen>
//       <DialogContent>

//         <DialogHeader>
//           <DialogTitle>
//             Current Weather Advice
//           </DialogTitle>
//           <DialogDescription>
//             Weather suggestion based on current temperature !
//           </DialogDescription>
//         </DialogHeader>

//         <div className="space-y-2">

//           <p>
//             Temperature: <b>{curr}°C</b>
//           </p>

//           <p>
//             Advice: {advice}
//           </p>

//         </div>

//       </DialogContent>
//     </Dialog>
//   );
// }


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";

export default function LocationPopup({ weather }: any) {

  if (!weather) return null;

  const temp = weather.current.temperature_2m;
  const weatherCode = weather.current.weathercode;

  let advice = "Great weather to go outside!";

  // RAIN 
  if (weatherCode >= 51 && weatherCode <= 67) {
    advice = "It's raining outside. Carry an umbrella or raincoat.";
  }

  // SNOW 
  else if (weatherCode >= 71 && weatherCode <= 77) {
    advice = "Snowfall expected. Wear warm clothes and be careful outside.";
  }

  // THUNDERSTORM
  else if (weatherCode >= 95) {
    advice = "Thunderstorm alert. Better to stay indoors.";
  }

  // FOG
  else if (weatherCode >= 45 && weatherCode <= 48) {
    advice = "Foggy weather. Drive carefully and maintain visibility.";
  }

  // HOT
  else if (temp > 35) {
    advice = "Very hot outside. Stay hydrated and avoid direct sunlight.";
  }

  // COLD 
  else if (temp < 15) {
    advice = "Cold weather. Wear warm clothes before going outside.";
  }

  return (
    <Dialog defaultOpen>
      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            Current Weather Advice
          </DialogTitle>

          <DialogDescription>
            Weather suggestion based on current conditions
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">

          <p>
            Temperature: <b>{temp}°C</b>
          </p>

          <p>
            Advice: {advice}
          </p>

        </div>

      </DialogContent>
    </Dialog>
  );
}