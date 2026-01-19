import { notFound } from "next/navigation"
import { fetchBookDetail } from "@/utils/api"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

import BookHeader from "@/components/book/BookHeader"
import BookGallery from "@/components/book/BookGallery"
import BookPricing from "@/components/book/BookPricing"
import BookMeta from "@/components/book/BookMeta"
import BookDescription from "@/components/book/BookDescription"
import BookReviews from "@/components/book/BookReviews"

/**
 * ✅ Page-level SEO (title comes from the same source as H1)
 */
export async function generateMetadata({ params }) {
  const { slug } = await params
  const book = await fetchBookDetail(slug)

  if (!book) {
    return {}
  }

  return {
    title: `${book.title} | College Info Nepal`,
    description: book.excerpt
      ? stripHtml(book.excerpt).slice(0, 160)
      : `Read detailed information about ${book.title}.`,
  }
}

export default async function BookDetailPage({ params }) {
  const { slug } = await params

  const book = await fetchBookDetail(slug)

  if (!book) {
    notFound()
  }

  return (
    <>
      {/* Global Navigation */}
      <Navbar />

      <main className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-10">
          {/* TOP: Two-column section */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[300px_1fr]">
            {/* Left: Gallery */}
            <BookGallery images={book.images} title={book.title} />

            {/* Right: Info */}
            <div>
              {/* H1 */}
              <BookHeader book={book} />

              <div className="mt-4 max-w-md">
                <BookPricing book={book} />
              </div>

              <div className="mt-6">
                <BookMeta book={book} />
              </div>
            </div>
          </div>

          {/* FULL WIDTH: Description */}
          <div className="mt-12">
            <BookDescription
              subtitle={book.subtitle}
              excerpt={book.excerpt}
              description={book.description}
            />
          </div>

          {/* FULL WIDTH: Reviews */}
          <div className="mt-12">
            <BookReviews reviews={book.reviews} />
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </>
  )
}

/**
 * Utility: strip HTML from CKEditor content
 */
function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, "")
}
