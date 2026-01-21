"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"
import { X } from "lucide-react"

// Reuse your existing inquiry component
import ProgramInquiry from "@/components/inquiry/ProgramInquiry"

export default function ExamHeader({ exam }) {
  const [showInquiry, setShowInquiry] = useState(false)

  if (!exam) return null

  return (
    <>
      <section className="py-6 px-3 border-b">
        <div className="max-w-6xl mx-auto">

          {/* Institute / Authority */}
          {exam.institute_name && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <MapPin className="w-4 h-4" />
              <span>{exam.institute_name}</span>
            </div>
          )}

          {/* Title */}
          <div className="flex items-start gap-4 mb-4">
            <img
              src="/assets/exam-icon.png"
              alt=""
              aria-hidden="true"
              className="w-10 h-10 object-contain flex-shrink-0 mt-1 opacity-80"
            />

            <h1 className="text-3xl md:text-4xl font-semibold text-foreground leading-snug">
              {exam.title}
            </h1>
          </div>

          {/* ✅ ASK A QUESTION BUTTON */}
          <button
            onClick={() => setShowInquiry(true)}
            className="inline-flex items-center justify-center bg-primary text-white px-6 py-2.5 rounded-md font-medium hover:opacity-90 transition"
          >
            Ask a Question
          </button>
        </div>
      </section>

      {/* =====================
          INQUIRY MODAL
      ===================== */}
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

            {/* Reusing same inquiry form */}
            <ProgramInquiry program={exam} />
          </div>
        </div>
      )}
    </>
  )
}
