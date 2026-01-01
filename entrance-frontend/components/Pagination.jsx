"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Pagination({
  totalItems,
  itemsPerPage = 10,
  currentPage,
  onPageChange,
  maxVisiblePages = 5,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages = []

    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let end = start + maxVisiblePages - 1

    if (end > totalPages) {
      end = totalPages
      start = Math.max(1, end - maxVisiblePages + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 py-2 rounded-md border text-sm font-medium
                   disabled:opacity-40 disabled:cursor-not-allowed
                   hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <ChevronLeft size={16} />
        Prev
      </button>

      {/* Page numbers */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            "px-4 py-2 rounded-md border text-sm font-medium transition",
            page === currentPage
              ? "bg-primary text-white border-primary"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
          )}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 py-2 rounded-md border text-sm font-medium
                   disabled:opacity-40 disabled:cursor-not-allowed
                   hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        Next
        <ChevronRight size={16} />
      </button>
    </div>
  )
}
