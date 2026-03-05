import { Card } from "./ui/card";

export default function WeeklyForecast({days}:{days:any[]}){
    return(
        <div className="grid grid-cols-4 gap-4">
            {days.map((d,i)=>(
                <Card key={i} className="p-4">
                    <p>{d.date}</p>
                    <p>{d.max}/{d.min}</p>
                </Card>
            ))}
        </div>
    )
}