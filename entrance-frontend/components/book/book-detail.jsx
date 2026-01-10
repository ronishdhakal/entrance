"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"

export default function BookDetail({ book }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const images =
    book.images && book.images.length > 0
      ? book.images
      : [{ id: 0, image: "/open-book-library.png", alt_text: book.title }]

  const currentImage = images[selectedImageIndex]?.image || "/open-book-library.png"

  const handlePrev = () => setSelectedImageIndex((i) => (i === 0 ? images.length - 1 : i - 1))

  const handleNext = () => setSelectedImageIndex((i) => (i === images.length - 1 ? 0 : i + 1))

  if (!book) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
      {/* ================= IMAGE GALLERY ================= */}
      <div className="space-y-4 order-2 md:order-1">
        <Card className="overflow-hidden border border-border/50">
          <div className="relative aspect-[3/4] bg-muted">
            <Image
              src={currentImage || "/placeholder.svg"}
              alt={book.title}
              fill
              unoptimized
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
              className="object-cover transition-transform duration-500"
            />

            {images.length > 1 && (
              <>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white border-0"
                  onClick={handlePrev}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white border-0"
                  onClick={handleNext}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>
        </Card>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {images.map((img, index) => (
              <button
                key={img.id || index}
                onClick={() => setSelectedImageIndex(index)}
                className={`relative aspect-[3/4] overflow-hidden rounded-md border-2 transition-all ${
                  index === selectedImageIndex
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-border hover:border-primary/30"
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={img.image || "/placeholder.svg"}
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
      <div className="space-y-6 md:space-y-8 order-1 md:order-2">
        <div className="space-y-4">
          <Badge variant="secondary" className="w-fit text-xs sm:text-sm">
            {book.brand}
          </Badge>

          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-foreground">{book.title}</h1>

            <p className="mt-4 text-2xl sm:text-3xl font-bold text-primary">NPR {book.price}</p>
          </div>

          {book.buy_now_link && (
            <Button asChild size="lg" className="w-full sm:w-auto mt-4">
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
          )}
        </div>

        {/* Description */}
        <Card className="border border-border/50">
          <CardContent className="p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-foreground">Product Description</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
              {book.description || "No description available."}
            </p>
          </CardContent>
        </Card>

        {/* Product Meta */}
        <Card className="border border-border/50">
          <CardContent className="p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-foreground">Book Details</h2>
            <dl className="space-y-3 text-sm sm:text-base">
              <div className="flex justify-between items-center">
                <dt className="text-muted-foreground">Publisher / Brand</dt>
                <dd className="font-medium text-foreground">{book.brand}</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-muted-foreground">Price</dt>
                <dd className="font-semibold text-primary">NPR {book.price}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
