"use client"

import { useEffect, useState } from "react"
import { fetchAdvertisements } from "@/utils/api"

export default function AdsPlacement() {
  const [ads, setAds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAds = async () => {
      setLoading(true)

      const placements = ["home_1", "home_2", "home_3", "home_4"]

      const results = await Promise.all(
        placements.map((p) => fetchAdvertisements({ placement: p }))
      )

      const flattenedAds = results.flat()
      setAds(flattenedAds)

      setLoading(false)
    }

    loadAds()
  }, [])

  if (loading || ads.length === 0) return null

  return (
    <div className="w-full px-4 sm:px-6 my-2">
      <div
        className="
          grid grid-cols-2
          gap-2
          sm:gap-3
          md:grid-cols-4
        "
      >
        {ads.map((ad) => {
          const image =
            ad.desktop_image ||
            ad.desktop_image_url ||
            "/placeholder-ad.png"

          return (
            <a
              key={ad.id}
              href={ad.redirect_url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                block w-full
                overflow-hidden rounded
                hover:opacity-90 transition
              "
            >
              {/* Aspect ratio: 400 x 70 */}
              <div className="relative w-full aspect-[40/7] bg-muted">
                <img
                  src={image}
                  alt={ad.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}
