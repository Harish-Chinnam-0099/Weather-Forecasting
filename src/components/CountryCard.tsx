import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card"
import { getCountryInfo } from "#/api/countryInfo"

export default function CountryCard({ countryCode }: { countryCode: string }) {

  const { data: country, isLoading } = useQuery({
    queryKey: ["country", countryCode],
    queryFn: () => getCountryInfo(countryCode),
    enabled: !!countryCode,
    staleTime: 1000 * 60 * 10,  
    gcTime: 1000 * 60 * 15,     
  })

  if (isLoading) {
    return <div className="p-4 text-muted-foreground">Loading country info...</div>
  }

  if (!country) {
    return <div className="p-4 text-muted-foreground">Country info not available</div>
  }

  // Get the first currency from the currencies object
  const currency = Object.values(country.currencies ?? {})[0] as any

  // Get all languages as a comma-separated string
  const languages = Object.values(country.languages ?? {}).join(", ")

  return (

    <Card>

      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <img
            src={country.flags.svg}
            alt={country.name.common}
            className="h-6 w-10 object-cover rounded shadow"
          />
          {country.name.common}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-1 text-sm text-muted-foreground">

        <p><span className="font-medium text-foreground">Region:</span> {country.region}, {country.subregion}</p>

        <p><span className="font-medium text-foreground">Capital:</span> {country.capital?.[0]}</p>

        <p><span className="font-medium text-foreground">Population:</span> {country.population.toLocaleString()}</p>

        {currency && (
          <p><span className="font-medium text-foreground">Currency:</span> {currency.name} ({currency.symbol})</p>
        )}

        <p><span className="font-medium text-foreground">Languages:</span> {languages}</p>

        <p><span className="font-medium text-foreground">Area:</span> {country.area?.toLocaleString()} km²</p>

        <p><span className="font-medium text-foreground">Official Name:</span> {country.name.official}</p>

      </CardContent>

    </Card>

  )

}
