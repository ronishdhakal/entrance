"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"

export default function BookDetail({ book }) {
  if (!book) return null

  const images =
    book.images && book.images.length > 0
      ? book.images
      : [{ id: 0, image: "/open-book-library.png", alt_text: book.title }]

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const currentImage = images[selectedImageIndex]?.image || "/open-book-library.png"

  const handlePrev = () =>
    setSelectedImageIndex((i) => (i === 0 ? images.length - 1 : i - 1))

  const handleNext = () =>
    setSelectedImageIndex((i) => (i === images.length - 1 ? 0 : i + 1))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* ================= IMAGE GALLERY ================= */}
      <div className="space-y-4">
        <Card className="overflow-hidden">
          <div className="relative aspect-[3/4] bg-muted">
            <Image
              src={currentImage}
              alt={book.title}
              fill
              unoptimized
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500"
            />

            {images.length > 1 && (
              <>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  onClick={handlePrev}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </Card>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-3">
            {images.map((img, index) => (
              <button
                key={img.id || index}
                onClick={() => setSelectedImageIndex(index)}
                className={`relative aspect-[3/4] overflow-hidden rounded-lg border-2 transition-all ${
                  index === selectedImageIndex
                    ? "border-primary ring-2 ring-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Image
                  src={img.image}
                  alt={img.alt_text || book.title}
                  fill
                  unoptimized
                  sizes="100px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ================= PRODUCT DETAILS ================= */}
      <div className="space-y-8">
        <div>
          <Badge variant="secondary" className="mb-3">
            {book.brand}
          </Badge>

          <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">
            {book.title}
          </h1>

          <p className="text-3xl font-bold text-primary mb-6">
            NPR {book.price}
          </p>

          {book.buy_now_link && (
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="flex-1">
                <a
                  href={book.buy_now_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  Buy Now
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          )}
        </div>

        {/* Description */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Product Description
            </h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {book.description || "No description available."}
            </p>
          </CardContent>
        </Card>

        {/* Product Meta */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Book Details
            </h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Publisher / Brand</dt>
                <dd className="font-medium">{book.brand}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Price</dt>
                <dd className="font-medium text-primary">
                  NPR {book.price}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
