"use client"

import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"

export default function BookCard({ book }) {
  if (!book) return null

  const featuredImage =
    book.images?.find(img => img.is_featured) || book.images?.[0]

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md">
      {/* Image (SQUARE) */}
      <Link
        href={`/book/${book.slug}`}
        className="relative aspect-square w-full bg-gray-100"
      >
        {featuredImage ? (
          <Image
            src={featuredImage.image}
            alt={featuredImage.alt_text || book.title}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            sizes="300px"
            unoptimized   // ✅ REQUIRED for 127.0.0.1
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
            No image
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Title */}
        <h3 className="line-clamp-2 text-base font-semibold text-gray-900">
          <Link href={`/book/${book.slug}`} className="hover:text-primary">
            {book.title}
          </Link>
        </h3>

        {/* Author */}
        {book.author && (
          <p className="mt-1 text-sm text-gray-500">
            by {book.author}
          </p>
        )}

        {/* Rating */}
        {book.rating_count > 0 && (
          <div className="mt-2 flex items-center gap-1 text-sm text-gray-600">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">
              {book.average_rating}
            </span>
            <span className="text-gray-400">
              ({book.rating_count})
            </span>
          </div>
        )}

        {/* Price + CTA */}
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-lg font-semibold text-gray-900">
            {book.currency} {book.price}
          </span>

          <Link
            href={`/book/${book.slug}`}
            className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white transition hover:bg-primary/90"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
