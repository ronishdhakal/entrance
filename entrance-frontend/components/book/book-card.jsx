import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export default function BookCard({ book }) {
  const primaryImage = book.images && book.images.length > 0 ? book.images[0] : null

  const imageUrl = primaryImage?.image || "/open-book-library.png"
  const imageAlt = primaryImage?.alt_text || book.title

  return (
    <Card className="group flex flex-col overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg hover:border-primary/50 border border-transparent">
      {/* Image */}
      <Link href={`/book/${book.slug}`} className="relative">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={imageAlt}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      {/* Content */}
      <CardContent className="flex-1 p-4 sm:p-5 flex flex-col">
        <Link href={`/book/${book.slug}`}>
          <h3 className="font-semibold text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {book.title}
          </h3>
        </Link>

        <p className="mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-1">{book.brand}</p>

        <p className="mt-auto pt-3 text-base sm:text-lg font-bold text-primary">NPR {book.price}</p>
      </CardContent>

      {/* Actions */}
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button asChild size="sm" className="flex-1 text-xs sm:text-sm">
          <Link href={`/book/${book.slug}`}>View Details</Link>
        </Button>

        {book.buy_now_link && (
          <Button asChild variant="outline" size="icon" className="shrink-0 bg-transparent">
            <a href={book.buy_now_link} target="_blank" rel="noopener noreferrer" aria-label={`Buy ${book.title}`}>
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
