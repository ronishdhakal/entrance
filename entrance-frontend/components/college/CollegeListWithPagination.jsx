"use client"

import { useState } from "react"
import CollegeGrid from "@/components/college/college-grid"
import Pagination from "@/components/Pagination"

const ITEMS_PER_PAGE = 21

export default function CollegeListWithPagination({ colleges }) {
  const [currentPage, setCurrentPage] = useState(1)

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedColleges = colleges.slice(startIndex, endIndex)

  return (
    <>
      <CollegeGrid colleges={paginatedColleges} />

      <Pagination
        totalItems={colleges.length}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  )
}
