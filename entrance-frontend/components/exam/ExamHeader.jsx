"use client"

import { MapPin } from "lucide-react"

export default function ExamHeader({ exam }) {
  return (
    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background py-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Top meta row */}
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold">
            Active
          </span>

          <div className="flex items-center text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1.5" />
            <span className="text-sm font-medium">
              {exam.institute_name}
            </span>
          </div>
        </div>

        {/* Title row with icon */}
        <div className="flex items-start gap-4 mb-4">
          <img
            src="/assets/exam-icon.png"
            alt="Exam Icon"
            className="w-12 h-12 object-contain flex-shrink-0 mt-1"
          />

          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            {exam.title}
          </h1>
        </div>

        {/* Official website */}
        {exam.link && (
          <a
            href={exam.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary hover:underline font-medium"
          >
            Official Website
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}
