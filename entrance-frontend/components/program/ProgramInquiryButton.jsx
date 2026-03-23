"use client"

import { useState } from "react"
import { X } from "lucide-react"
import ProgramInquiry from "@/components/inquiry/ProgramInquiry"

export default function ProgramInquiryButton({ program }) {
  const [showInquiry, setShowInquiry] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowInquiry(true)}
        className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-md font-medium hover:opacity-90 transition"
      >
        Ask a Question
      </button>

      {showInquiry && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="relative bg-white w-full max-w-lg rounded-xl p-6">
            <button
              onClick={() => setShowInquiry(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              aria-label="Close inquiry"
            >
              <X size={20} />
            </button>
            <ProgramInquiry program={program} />
          </div>
        </div>
      )}
    </>
  )
}
