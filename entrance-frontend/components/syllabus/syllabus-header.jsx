"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"

// Reuse your existing inquiry component
import ProgramInquiry from "@/components/inquiry/ProgramInquiry"

export default function SyllabusHeader({ syllabus }) {
  const [showInquiry, setShowInquiry] = useState(false)

  const image =
    syllabus.featured_image_url || syllabus.featured_image

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {image && (
          <div className="w-full md:w-64 shrink-0">
            <Image
              src={image}
              alt={syllabus.title}
              width={400}
              height={300}
              className="rounded-lg border"
            />
          </div>
        )}

        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold">
            {syllabus.title}
          </h1>

          <p className="mt-2 text-muted-foreground">
            Program:{" "}
            <span className="font-medium">
              {syllabus.program_name}
            </span>
          </p>

          <p className="text-muted-foreground">
            University:{" "}
            <span className="font-medium">
              {syllabus.university}
            </span>
          </p>

          {/* ✅ ASK A QUESTION BUTTON */}
          <div className="mt-4">
            <button
              onClick={() => setShowInquiry(true)}
              className="inline-flex items-center justify-center bg-primary text-white px-6 py-2.5 rounded-md font-medium hover:opacity-90 transition"
            >
              Ask a Question
            </button>
          </div>
        </div>
      </div>

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
            <ProgramInquiry program={syllabus} />
          </div>
        </div>
      )}
    </>
  )
}
