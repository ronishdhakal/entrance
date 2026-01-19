import { Star } from "lucide-react"

export default function BookHeader({ book }) {
  if (!book) return null

  return (
    <header className="mb-8">
      {/* Title (H1) */}
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        {book.title}
      </h1>

      {/* Meta Row */}
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
        {/* Author */}
        {book.author && (
          <span>
            <span className="font-medium text-gray-800">Author:</span>{" "}
            {book.author}
          </span>
        )}

        {/* Genre */}
        {book.genre && (
          <span>
            <span className="font-medium text-gray-800">Genre:</span>{" "}
            {book.genre}
          </span>
        )}

        {/* Rating */}
        {book.rating_count > 0 && (
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-gray-800">
              {book.average_rating}
            </span>
            <span className="text-gray-500">
              ({book.rating_count} ratings)
            </span>
          </span>
        )}
      </div>
    </header>
  )
}
