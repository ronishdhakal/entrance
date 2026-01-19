import { Star } from "lucide-react"

export default function BookReviewItem({ review }) {
  if (!review) return null

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <p className="font-medium text-gray-900">
          {review.reviewer_name}
        </p>

        <div className="flex items-center gap-1">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>
      </div>

      {review.review_text && (
        <p className="mt-2 text-sm text-gray-700">
          {review.review_text}
        </p>
      )}
    </div>
  )
}
