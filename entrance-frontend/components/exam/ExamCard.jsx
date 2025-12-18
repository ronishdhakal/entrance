"use client"

import Link from "next/link"
import {
  Calendar,
  Clock,
  FileText,
  Users,
  ArrowRight,
  MapPin,
} from "lucide-react"

export default function ExamCard({ exam }) {
  if (!exam?.slug) return null

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Link href={`/exam/${exam.slug}`}>
      <div className="group bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300 p-6 h-full">

        {/* Header row: icon + title */}
        <div className="flex items-start gap-4 mb-4">
          <img
            src="/assets/exam-icon.png"
            alt="Exam"
            className="w-10 h-10 object-contain flex-shrink-0"
          />

          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
              {exam.title}
            </h3>

            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="w-4 h-4 mr-1.5" />
              <span>{exam.institute_name}</span>
            </div>
          </div>

          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
            Active
          </span>
        </div>

        {/* Exam info grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-sm">
            <Calendar className="w-4 h-4 text-primary mr-2" />
            <span className="font-medium text-foreground">
              {formatDate(exam.exam_date)}
            </span>
          </div>

          <div className="flex items-center text-sm">
            <Clock className="w-4 h-4 text-primary mr-2" />
            <span className="font-medium text-foreground">
              {exam.duration}
            </span>
          </div>

          <div className="flex items-center text-sm">
            <FileText className="w-4 h-4 text-primary mr-2" />
            <span className="font-medium text-foreground">
              {exam.number_of_questions} Questions
            </span>
          </div>

          <div className="flex items-center text-sm">
            <Users className="w-4 h-4 text-primary mr-2" />
            <span className="font-medium text-foreground">
              {exam.full_mark} Marks
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-border flex items-center justify-between">
          <div className="text-sm">
            <span className="text-muted-foreground">Registration: </span>
            <span className="font-medium text-foreground">
              {formatDate(exam.opens_at)} – {formatDate(exam.closes_at)}
            </span>
          </div>

          <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}
