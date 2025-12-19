import { notFound } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import BookDetail from "@/components/book/book-detail"
import { fetchBookBySlug } from "@/utils/api"

export const dynamic = "force-dynamic"

// ✅ generateMetadata MUST await params
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
    description: book.description
      ? book.description.slice(0, 155)
      : "Entrance preparation book",
  }
}

// ✅ Page MUST await params
export default async function BookDetailPage({ params }) {
  const { slug } = await params

  const book = await fetchBookBySlug(slug)

  if (!book) {
    notFound()
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <BookDetail book={book} />
        </div>
      </main>

      <Footer />
    </>
  )
}
