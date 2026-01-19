import { ExternalLink } from "lucide-react"

export default function BookPricing({ book }) {
  if (!book) return null

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Price */}
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-gray-900">
          {book.currency} {book.price}
        </span>
      </div>

      {/* Stock status */}
      <p
        className={`mt-1 text-sm font-medium ${
          book.in_stock ? "text-green-600" : "text-red-500"
        }`}
      >
        {book.in_stock ? "In stock" : "Out of stock"}
      </p>

      {/* Buy Now */}
      {book.buy_now_link && book.in_stock && (
        <a
          href={book.buy_now_link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary/90"
        >
          Buy Now
          <ExternalLink className="h-4 w-4" />
        </a>
      )}
    </div>
  )
}