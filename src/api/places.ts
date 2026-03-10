import type { NearbyPlace } from "#/types/types"

// This function fetches nearby tourist places using OpenStreetMap (Overpass API)
export async function getNearbyPlaces(lat: number, lon: number): Promise<NearbyPlace[]> {

  // This query searches for tourist attractions, museums, monuments and parks near the location
  const query = `
    [out:json][timeout:20];
    (
      node["tourism"~"attraction|museum|viewpoint|artwork|gallery"](around:40000,${lat},${lon});
      way["tourism"~"attraction|museum|viewpoint"](around:40000,${lat},${lon});
      node["historic"~"monument|castle|ruins|memorial|fort"](around:40000,${lat},${lon});
      way["historic"~"monument|castle|ruins|memorial|fort"](around:40000,${lat},${lon});
      node["leisure"~"park|garden"](around:10000,${lat},${lon});
      way["leisure"~"park|garden"](around:10000,${lat},${lon});
    );
    out center 10;
  `

  const res = await fetch(
    `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`
  )

  if (!res.ok) return []

  const data = await res.json()

  // Filter only elements that have a name, then take first 6
  const places = data.elements
    .filter((el: any) => el.tags?.name)
    .slice(0, 9)
    .map((el: any) => ({
      id: el.id,
      osmType: el.type,                                            // "node" or "way"
      name: el.tags.name,
      type: el.tags.tourism || el.tags.historic || el.tags.leisure || "place",
      lat: el.center?.lat ?? el.lat,                              // way uses center, node uses direct lat
      lon: el.center?.lon ?? el.lon,
    }))

  return places

}
