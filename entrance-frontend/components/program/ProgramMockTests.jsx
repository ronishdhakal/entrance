"use client"

import Link from "next/link"
import { Clock, BookOpen, ArrowRight } from "lucide-react"

export default function ProgramMockTests({ mockTests, program }) {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-1">
            Available Entrance Mock Test & Old Questions
          </h2>

          <p className="text-sm md:text-base text-muted-foreground">
            {mockTests.length > 0
              ? `Choose from ${mockTests.length} test${
                  mockTests.length > 1 ? "s" : ""
                } prepared based on real entrance exam patterns`
              : "No entrance mock tests or old questions available yet"}
          </p>
        </div>

        {/* Empty State */}
        {mockTests.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-muted/40">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-base font-medium text-muted-foreground">
              No entrance mock tests available for this program yet.
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Please check back later.
            </p>
          </div>
        ) : (
          /* Test Cards */
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockTests.map((test) => (
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
                      <BookOpen className="w-4 h-4" />
                      <span>100 questions</span>
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
                  className="inline-flex items-center justify-center gap-2 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
                >
                  Start Test
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
