import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import BookGrid from "@/components/book/book-grid"
import { fetchBooks } from "@/utils/api"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "IT Entrance Preparation Books - Entrance Prep by College Info Nepal",
  description: "Browse our collection of entrance exam preparation books",
}

export default async function BooksPage() {
  const books = (await fetchBooks()) || []

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Entrance Preparation Books
            </h1>
            <p className="text-muted-foreground">
              Explore our collection of entrance exam preparation books
            </p>
          </div>

          <BookGrid books={books} />
        </div>
      </main>

      <Footer />
    </>
  )
}
