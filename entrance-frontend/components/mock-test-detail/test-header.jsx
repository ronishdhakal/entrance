"use client"
import { Badge } from "@/components/ui/badge"
import { Clock, FileText, CheckCircle } from "lucide-react"

export function TestHeader({ mockTest }) {
  const totalQuestions = mockTest.sections?.reduce((sum, section) => sum + (section.questions?.length || 0), 0) || 0

  const totalMarks =
    mockTest.sections?.reduce(
      (sum, section) => sum + section.questions?.reduce((qSum, q) => qSum + (q.marks || 0), 0),
      0,
    ) || 0

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="secondary" className="text-sm">
          Mock Test
        </Badge>
      </div>

      <h1 className="text-3xl lg:text-4xl font-bold text-balance">{mockTest.title}</h1>

      <div className="flex flex-wrap gap-6 pt-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="size-5 text-primary" />
          <span className="font-medium">{mockTest.duration} minutes</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <FileText className="size-5 text-primary" />
          <span className="font-medium">{totalQuestions} questions</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <CheckCircle className="size-5 text-primary" />
          <span className="font-medium">{totalMarks} marks</span>
        </div>
      </div>
    </div>
  )
}
