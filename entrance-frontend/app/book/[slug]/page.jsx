import { notFound } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import BookDetail from "@/components/book/book-detail"
import { fetchBookBySlug } from "@/utils/api"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }) {
  const { slug } = await params

  const book = await fetchBookBySlug(slug)

  if (!book) {
    return {
      title: "Book Not Found",
      description: "The requested book could not be found.",
    }
  }

  return {
    title: `${book.title} - Books`,
    description: book.description ? book.description.slice(0, 155) : "Entrance preparation book",
  }
}

export default async function BookDetailPage({ params }) {
  const { slug } = await params

  const book = await fetchBookBySlug(slug)

  if (!book) {
    notFound()
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <BookDetail book={book} />
        </div>
      </main>

      <Footer />
    </>
  )
}
