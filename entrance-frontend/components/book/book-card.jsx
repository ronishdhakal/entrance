import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export default function BookCard({ book }) {
  const primaryImage =
    book.images && book.images.length > 0 ? book.images[0] : null

  const imageUrl = primaryImage?.image || "/open-book-library.png"
  const imageAlt = primaryImage?.alt_text || book.title

  return (
    <Card className="group flex flex-col overflow-hidden rounded-xl transition-all duration-300 hover:shadow-xl">
      {/* Image */}
      <Link href={`/book/${book.slug}`} className="relative">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>

      {/* Content */}
      <CardContent className="flex-1 p-4 sm:p-5">
        <Link href={`/book/${book.slug}`}>
          <h3 className="font-semibold text-base sm:text-lg leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {book.title}
          </h3>
        </Link>

        <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
          {book.brand}
        </p>

        <p className="mt-3 text-lg sm:text-xl font-bold text-primary">
          NPR {book.price}
        </p>
      </CardContent>

      {/* Actions */}
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button asChild className="flex-1">
          <Link href={`/book/${book.slug}`}>
            View Details
          </Link>
        </Button>

        {book.buy_now_link && (
          <Button
            asChild
            variant="outline"
            size="icon"
            className="shrink-0"
          >
            <a
              href={book.buy_now_link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Buy book"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
