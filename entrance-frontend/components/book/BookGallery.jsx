"use client"

import { useState } from "react"
import Image from "next/image"

export default function BookGallery({ images = [], title }) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!images.length) {
    return (
      <div className="aspect-square w-full max-w-[300px] rounded-xl bg-gray-100 flex items-center justify-center text-sm text-gray-400">
        No image
      </div>
    )
  }

  const activeImage = images[activeIndex]

  return (
    <div className="w-full max-w-[300px]">
      {/* Main square image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl border bg-white">
        <Image
          src={activeImage.image}
          alt={activeImage.alt_text || title}
          fill
          className="object-contain"
          sizes="300px"
          unoptimized
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((img, index) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(index)}
              className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border ${
                index === activeIndex
                  ? "border-primary"
                  : "border-gray-200"
              }`}
            >
              <Image
                src={img.image}
                alt={img.alt_text || title}
                fill
                className="object-contain"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
