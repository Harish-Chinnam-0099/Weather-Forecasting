// This function fetches city photos from Wikimedia Commons (free, no API key needed)
export async function getCityPhotos(cityName: string) {

  const res = await fetch(
    `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${cityName}&gsrnamespace=6&gsrlimit=20&prop=imageinfo&iiprop=url|mime&iiurlwidth=500&format=json&origin=*`
  )

  if (!res.ok) return []

  const data = await res.json()

  // data.query.pages is an object, so we convert it to an array
  const pages = Object.values(data?.query?.pages ?? {}) as any[]

  // Filter only jpeg and png images (removes icons, flags, svgs)
  const photos = pages
    .filter((p: any) => {
      const mime = p.imageinfo?.[0]?.mime ?? ""
      return mime === "image/jpeg" || mime === "image/png"
    })
    .slice(0, 9)
    .map((p: any) => ({
      id: String(p.pageid),
      url: p.imageinfo[0].thumburl || p.imageinfo[0].url,        // use thumbnail (500px) for faster loading
       title: p.title
      // .replace("File:", "").replace(/_/g, " ").replace(/\.[^.]+$/, ""),
    }))

  return photos

}
