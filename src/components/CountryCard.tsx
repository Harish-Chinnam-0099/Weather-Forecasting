import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card"
import { Skeleton } from "#/components/ui/skeleton"
import { getCountryInfo } from "#/api/countryInfo"
import { Globe, Users, Landmark, Coins, Languages, SquareStack } from "lucide-react"

function StatRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-2.5 py-2 border-b border-border/40 last:border-0">
      <div className="w-6 h-6 rounded-lg bg-muted/60 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground leading-snug truncate">{value}</p>
      </div>
    </div>
  )
}

export default function CountryCard({ countryCode }: { countryCode: string }) {
  const { data: country, isLoading } = useQuery({
    queryKey: ["country", countryCode],
    queryFn: () => getCountryInfo(countryCode),
    enabled: !!countryCode,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 15,
  })

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-10 rounded" />
            <Skeleton className="h-5 w-32" />
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-full rounded-lg" />
          ))}
        </CardContent>
      </Card>
    )
  }

  if (!country) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-sm text-muted-foreground">
          Country info unavailable
        </CardContent>
      </Card>
    )
  }

  const currency = Object.values(country.currencies ?? {})[0] as { name: string; symbol: string } | undefined
  const languages = Object.values(country.languages ?? {}).join(", ")

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-3">
          <img
            src={country.flags.svg}
            alt={`Flag of ${country.name.common}`}
            className="h-7 w-11 object-cover rounded-md shadow-sm border border-border/30"
          />
          <div className="min-w-0">
            <p className="font-bold text-foreground truncate">{country.name.common}</p>
            <p className="text-xs text-muted-foreground font-normal truncate">{country.name.official}</p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <StatRow icon={Globe} label="Region" value={`${country.region}${country.subregion ? ` · ${country.subregion}` : ""}`} />
        <StatRow icon={Landmark} label="Capital" value={country.capital?.[0] ?? "—"} />
        <StatRow icon={Users} label="Population" value={country.population.toLocaleString()} />
        {currency && (
          <StatRow icon={Coins} label="Currency" value={`${currency.name} (${currency.symbol})`} />
        )}
        <StatRow icon={Languages} label="Languages" value={languages} />
        <StatRow icon={SquareStack} label="Area" value={`${country.area?.toLocaleString()} km²`} />
      </CardContent>
    </Card>
  )
}
