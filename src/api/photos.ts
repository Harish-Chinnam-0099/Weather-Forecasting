export async function getCityPhotos(cityName: string) {
  try {
    const res = await fetch(
      `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(cityName)}&gsrnamespace=6&gsrlimit=20&prop=imageinfo&iiprop=url|mime&iiurlwidth=500&format=json&origin=*`
    )
    if (!res.ok) return []

    const data = await res.json()
    const pages = Object.values(data?.query?.pages ?? {}) as Record<string, unknown>[]

    return pages
      .filter((p: any) => {
        const info = p.imageinfo
        if (!Array.isArray(info) || info.length === 0) return false
        const mime = info[0]?.mime ?? ""
        return mime === "image/jpeg" || mime === "image/png"
      })
      .slice(0, 9)
      .map((p: any) => ({
        id: String(p.pageid),
        url: p.imageinfo[0].thumburl || p.imageinfo[0].url,
        title: p.title,
      }))
  } catch {
    return []
  }
}
