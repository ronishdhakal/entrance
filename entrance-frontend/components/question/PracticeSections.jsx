"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Play, Loader2 } from "lucide-react"

export function PracticeSections({ sections, programSlug }) {
  const [sectionsWithCounts, setSectionsWithCounts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuestionCounts = async () => {
      if (!sections || sections.length === 0) {
        setLoading(false)
        return
      }

      try {
        // Import fetchAllQuestions dynamically to avoid circular dependencies
        const { fetchAllQuestions } = await import("@/utils/admin-api")
        
        // Fetch question counts for all sections in parallel
        const sectionsWithCountsPromises = sections.map(async (section) => {
          try {
            // Fetch questions for this section
            const questions = await fetchAllQuestions({ section: section.id })
            
            return {
              ...section,
              question_count: questions?.length || 0
            }
          } catch (error) {
            console.error(`Error fetching questions for section ${section.id}:`, error)
            return {
              ...section,
              question_count: 0
            }
          }
        })

        const updatedSections = await Promise.all(sectionsWithCountsPromises)
        setSectionsWithCounts(updatedSections)
      } catch (error) {
        console.error("Error fetching question counts:", error)
        // Fallback to original sections with 0 counts
        setSectionsWithCounts(sections.map(s => ({ ...s, question_count: 0 })))
      } finally {
        setLoading(false)
      }
    }

    fetchQuestionCounts()
  }, [sections])

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

  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader2 className="w-8 h-8 mx-auto mb-4 text-primary animate-spin" />
        <p className="text-sm text-muted-foreground">Loading question counts...</p>
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
        {sectionsWithCounts.map((section) => {
          const questionCount = section.question_count || 0

          return (
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

              {/* Question Count */}
              <div className="flex items-center gap-4 text-sm mb-4 pt-4 border-t">
                <div>
                  <div className="font-semibold text-base">
                    {questionCount}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {questionCount === 1 ? "Question" : "Questions"}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Link
                href={`/practice/${programSlug}/${section.id}`}
                className="w-full"
              >
                <Button 
                  className="w-full" 
                  size="sm"
                  disabled={questionCount === 0}
                >
                  <Play className="size-4 mr-2" />
                  {questionCount === 0 ? "No Questions" : "Practice Now"}
                </Button>
              </Link>
            </Card>
          )
        })}
      </div>
    </div>
  )
}