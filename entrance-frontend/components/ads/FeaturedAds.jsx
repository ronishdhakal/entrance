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

          {/* ===== Ad 1 ===== */}
          <div className="relative h-18 sm:h-20 rounded-lg overflow-hidden">
            <Image
              src="/assets/adbackground.jpg"
              alt={textAd.title_1}
              fill
              className="object-cover scale-105 blur-[1.5px]"
              priority
            />

            {/* Gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/45 to-black/30 flex items-center">
              <div className="flex w-full items-center justify-between px-5">

                {/* Text */}
                <div className="flex-1 text-center">
                  <h3 className="text-lg sm:text-xl font-semibold text-white leading-snug drop-shadow-sm">
                    {textAd.title_1}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-100 leading-snug drop-shadow-sm">
                    {textAd.description_1}
                  </p>
                </div>

                {/* CTA */}
                <Link
                  href={textAd.link_1}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-6 shrink-0 bg-primary hover:bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium transition shadow-sm"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>

          {/* ===== Ad 2 ===== */}
          <div className="relative h-18 sm:h-20 rounded-lg overflow-hidden">
            <Image
              src="/assets/adbackground.jpg"
              alt={textAd.title_2}
              fill
              className="object-cover scale-105 blur-[1.5px]"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/45 to-black/30 flex items-center">
              <div className="flex w-full items-center justify-between px-5">

                {/* Text */}
                <div className="flex-1 text-center">
                  <h3 className="text-lg sm:text-xl font-semibold text-white leading-snug drop-shadow-sm">
                    {textAd.title_2}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-100 leading-snug drop-shadow-sm">
                    {textAd.description_2}
                  </p>
                </div>

                {/* CTA */}
                <Link
                  href={textAd.link_2}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-6 shrink-0 bg-primary hover:bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium transition shadow-sm"
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
