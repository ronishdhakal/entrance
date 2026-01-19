"use client"

import { useEffect, useState } from "react"
import { fetchBooks } from "@/utils/api"

import BookCard from "@/components/book/BookCard"
import BookCardSkeleton from "@/components/book/BookCardSkeleton"

export default function BookList() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function loadBooks() {
      try {
        const data = await fetchBooks()
        setBooks(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    loadBooks()
  }, [])

  if (error) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm text-red-500">
          Failed to load books. Please try again later.
        </p>
      </div>
    )
  }

  return (
    <section className="py-8">
      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <BookCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && books.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-sm text-gray-500">
            No books available at the moment.
          </p>
        </div>
      )}

      {/* Books Grid */}
      {!loading && books.length > 0 && (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {books.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </section>
  )
}
