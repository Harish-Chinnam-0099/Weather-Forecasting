type Props = {
  date:string
  max:number
  min:number
  title?:string
}

export default function WeatherCard({date,max,min,title}:Props){

  return(

    <div className="border rounded-lg p-4 w-[200px] shadow">

      {title && (
        <h2 className="font-bold text-lg mb-2">
          {title}
        </h2>
      )}

      <p>Date : {date}</p>
      <p>Max : {max}°C</p>
      <p>Min : {min}°C</p>

    </div>

  )

}