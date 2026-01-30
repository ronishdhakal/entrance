"use client"

import Link from "next/link"
import { Clock, History, ArrowRight } from "lucide-react"

export default function ProgramOldQuestions({ mockTests = [] }) {
  // ✅ Only OLD questions
  const oldQuestionTests = mockTests.filter(
    (test) => test.is_old_question === true
  )

  if (oldQuestionTests.length === 0) return null

  return (
    <section className="py-2 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-1">
            Old Entrance Questions
          </h2>

          <p className="text-sm md:text-base text-muted-foreground">
            Practice from previous years’ entrance questions
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {oldQuestionTests.map((test) => (
            <div
              key={test.id}
              className="bg-card border border-border rounded-lg p-5 hover:shadow-md transition-shadow"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                  {test.title}
                </h3>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{test.duration} minutes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <History className="w-4 h-4" />
                    <span>Old questions</span>
                  </div>
                </div>
              </div>

              {test.instructions && (
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {test.instructions}
                </p>
              )}

              <Link
                href={`/test/${test.slug}`}
                className="inline-flex items-center justify-center gap-2 w-full rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
              >
                Practice Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
