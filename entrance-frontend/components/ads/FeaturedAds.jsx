"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { fetchFeaturedAd } from "@/utils/api"

export default function FeaturedAds() {
  const [featuredAd, setFeaturedAd] = useState(null)

  useEffect(() => {
    const loadAd = async () => {
      const data = await fetchFeaturedAd()
      setFeaturedAd(data)
    }
    loadAd()
  }, [])

  if (!featuredAd) return null

  return (
    <div className="w-full py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdCard
          text={featuredAd.ad_one_text}
          url={featuredAd.ad_one_url}
          buttonText="Apply Now"
        />

        <AdCard
          text={featuredAd.ad_two_text}
          url={featuredAd.ad_two_url}
          buttonText="Get Started"
        />
      </div>
    </div>
  )
}

function AdCard({ text, url, buttonText }) {
  return (
    <div className="relative h-40 md:h-44 rounded-xl overflow-hidden">
      {/* Background */}
      <Image
        src="/assets/adbackground.jpg"
        alt="Advertisement"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-between px-6">
        <h3 className="text-white text-xl md:text-2xl font-semibold max-w-[70%]">
          {text}
        </h3>

        <Link
          href={url}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md transition"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  )
}
