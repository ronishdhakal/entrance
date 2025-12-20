"use client"

import { MapPin } from "lucide-react"

export default function ExamHeader({ exam }) {
  return (
    <div className="py-6 px-3">
      <div className="max-w-6xl mx-auto">

        {/* Top meta row */}
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
            Active
          </span>

          {exam.institute_name && (
            <div className="flex items-center text-muted-foreground">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">
                {exam.institute_name}
              </span>
            </div>
          )}
        </div>

        {/* Title row */}
        <div className="flex items-start gap-3 mb-2">
          <img
            src="/assets/exam-icon.png"
            alt="Exam Icon"
            className="w-10 h-10 object-contain flex-shrink-0 mt-1"
          />

          <h1 className="text-3xl md:text-4xl font-semibold text-foreground leading-snug">
            {exam.title}
          </h1>
        </div>

        {/* Official website */}
        {exam.link && (
          <a
            href={exam.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-primary hover:underline font-medium"
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
