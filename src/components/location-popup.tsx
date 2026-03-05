import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";

export default function LocationPopup({ weather }: any) {

  if (!weather) return null;

  const temp = weather.hourly.temperature_2m[0];

  let advice = "Great weather to go outside!";

  if (temp > 35) {
    advice = "Very hot outside. Carry water.";
  }

  if (temp < 15) {
    advice = "Cold weather. Wear warm clothes.";
  }

  return (
    <Dialog defaultOpen>
      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            Current Weather Advice
          </DialogTitle>
          <DialogDescription>
            Weather suggestion based on current temperature !
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