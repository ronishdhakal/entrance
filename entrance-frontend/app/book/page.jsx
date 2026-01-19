import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

import BookListHeader from "@/components/book/BookListHeader"
import BookList from "@/components/book/BookList"

export const metadata = {
  title: "Entrance Prepration Books | College Info Nepal",
  description:
    "Explore curated books and study resources to support your academic journey, exam preparation, and concept building.",
}

export default function BooksPage() {
  return (
    <>
      {/* Global Navigation */}
      <Navbar />

      <main className="bg-gray-50">
        {/* Constrained, professional container */}
        <div className="mx-auto max-w-6xl px-4 py-10">
          {/* Page Header */}
          <div className="mb-10">
            <BookListHeader />
          </div>

          {/* Book List */}
          <section>
            <BookList />
          </section>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </>
  )
}
