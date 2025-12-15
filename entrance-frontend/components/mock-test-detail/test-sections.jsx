"use client"

import { Card } from "@/components/ui/card"
import { BookOpen, Award } from "lucide-react"

export function TestSections({ sections }) {
  if (!sections || sections.length === 0) {
    return null
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <BookOpen className="size-5 text-primary" />
        Test Sections
      </h2>
      <div className="space-y-3">
        {sections.map((section, index) => {
          const questionCount = section.questions?.length || 0
          const totalSectionMarks = section.questions?.reduce((sum, q) => sum + (q.marks || 0), 0) || 0

          return (
            <div
              key={section.id}
              className="flex items-center justify-between p-4 rounded-lg bg-accent/50 border border-border hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold">{section.title}</h3>
                  {section.is_optional && <span className="text-xs text-muted-foreground">Optional</span>}
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <div className="font-semibold">{questionCount}</div>
                  <div className="text-muted-foreground text-xs">Questions</div>
                </div>
                <div className="flex items-center gap-1 text-center">
                  <Award className="size-4 text-primary" />
                  <div>
                    <div className="font-semibold">{totalSectionMarks}</div>
                    <div className="text-muted-foreground text-xs">marks</div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
