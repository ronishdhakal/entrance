"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { fetchTextAds } from "@/utils/api"

export default function FeaturedAds() {
  const [textAd, setTextAd] = useState(null)

  useEffect(() => {
    async function loadAds() {
      const data = await fetchTextAds()
      if (Array.isArray(data) && data.length > 0) {
        setTextAd(data[0])
      }
    }

    loadAds()
  }, [])

  if (!textAd) return null

  return (
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* ================= Ad 1 ================= */}
          <div className="relative min-h-[4rem] sm:min-h-[4.5rem] rounded-lg overflow-hidden">
            <Image
              src="/assets/adbackground.jpg"
              alt={textAd.title_1 || "Featured ad"}
              fill
              className="object-cover scale-105 blur-[1.5px]"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/45 to-black/30 flex items-center">
              <div className="flex w-full items-center justify-between px-4 sm:px-5 py-2">

                {/* Text */}
                <div className="flex-1 text-center">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white leading-snug drop-shadow-sm">
                    {textAd.title_1}
                  </h3>
                  <p className="mt-0 text-[11px] sm:text-xs md:text-sm text-gray-100 leading-snug drop-shadow-sm">
                    {textAd.description_1}
                  </p>
                </div>

                {/* CTA */}
                <Link
                  href={textAd.link_1 || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-3 sm:ml-5 shrink-0 bg-primary hover:bg-blue-600 text-white px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition shadow-sm"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>

          {/* ================= Ad 2 ================= */}
          <div className="relative min-h-[4rem] sm:min-h-[4.5rem] rounded-lg overflow-hidden">
            <Image
              src="/assets/adbackground.jpg"
              alt={textAd.title_2 || "Featured ad"}
              fill
              className="object-cover scale-105 blur-[1.5px]"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/45 to-black/30 flex items-center">
              <div className="flex w-full items-center justify-between px-4 sm:px-5 py-2">

                {/* Text */}
                <div className="flex-1 text-center">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white leading-snug drop-shadow-sm">
                    {textAd.title_2}
                  </h3>
                  <p className="mt-0 text-[11px] sm:text-xs md:text-sm text-gray-100 leading-snug drop-shadow-sm">
                    {textAd.description_2}
                  </p>
                </div>

                {/* CTA */}
                <Link
                  href={textAd.link_2 || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-3 sm:ml-5 shrink-0 bg-primary hover:bg-blue-600 text-white px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition shadow-sm"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
