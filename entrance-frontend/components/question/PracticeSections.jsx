"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Play } from "lucide-react"

export function PracticeSections({ sections, programSlug }) {
  /* EMPTY STATE */
  if (!sections || sections.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-muted/40">
        <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-base font-medium text-muted-foreground">
          No practice sections available yet.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">
          Practice Questions by Section
        </h2>
        <p className="text-muted-foreground">
          Select a section and practice questions with instant feedback
        </p>
      </div>

      {/* Sections Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Card
            key={section.id}
            className="p-6 hover:shadow-lg transition-shadow flex flex-col"
          >
            {/* Section Info */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">
                {section.title}
              </h3>

              {section.description && (
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {section.description}
                </p>
              )}
            </div>

            {/* CTA */}
            <Link
              href={`/practice/${programSlug}/${section.id}`}
              className="w-full mt-auto"
            >
              <Button className="w-full" size="sm">
                <Play className="size-4 mr-2" />
                Practice Now
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
