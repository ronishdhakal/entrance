import BookReviewItem from "@/components/book/BookReviewItem"

export default function BookReviews({ reviews = [], ratingCount }) {
  if (!reviews.length) return null

  return (
    <section className="mt-12">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Reader Reviews
      </h2>

      <div className="space-y-4">
        {reviews.map(review => (
          <BookReviewItem key={review.id} review={review} />
        ))}
      </div>
    </section>
  )
}
