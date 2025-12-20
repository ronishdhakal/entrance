"use client"

import { useEffect, useState } from "react"
import { fetchAdvertisements } from "@/utils/api"

export default function PopupAd() {
  const [ad, setAd] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const loadPopupAd = async () => {
      const ads = await fetchAdvertisements({ placement: "popup" })

      if (ads.length > 0) {
        setAd(ads[0])
        setVisible(true)
      }
    }

    loadPopupAd()
  }, [])

  if (!ad || !visible) return null

  const desktopImage =
    ad.desktop_image || ad.desktop_image_url || "/placeholder-popup.png"

  const mobileImage =
    ad.mobile_image || desktopImage

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-3xl">

        {/* Close button */}
        <button
          onClick={() => setVisible(false)}
          className="absolute -top-3 -right-3 z-10 bg-white rounded-full p-2 shadow hover:bg-gray-100"
          aria-label="Close popup"
        >
          ✕
        </button>

        <a
          href={ad.redirect_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full overflow-hidden rounded-lg bg-white"
        >
          {/* Desktop Image */}
          <div className="relative hidden sm:block w-full aspect-[85/40]">
            <img
              src={desktopImage}
              alt={ad.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Mobile Image */}
          <div className="relative sm:hidden w-full aspect-[4/5]">
            <img
              src={mobileImage}
              alt={ad.title}
              className="w-full h-full object-cover"
            />
          </div>
        </a>

      </div>
    </div>
  )
}
