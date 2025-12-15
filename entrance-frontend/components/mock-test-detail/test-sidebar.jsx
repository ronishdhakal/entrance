"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, FileText, Award, PlayCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"

export function TestSidebar({ mockTest, onStartTest }) {
  const router = useRouter()
  const [isStarting, setIsStarting] = useState(false)

  const totalQuestions = mockTest.sections?.reduce((sum, section) => sum + (section.questions?.length || 0), 0) || 0

  const totalMarks =
    mockTest.sections?.reduce(
      (sum, section) => sum + section.questions?.reduce((qSum, q) => qSum + (q.marks || 0), 0),
      0,
    ) || 0

  const handleStartTest = async () => {
    if (!isAuthenticated()) {
      router.push(`/login?redirect=/mock-tests/${mockTest.slug}`)
      return
    }

    setIsStarting(true)
    await onStartTest()
    setIsStarting(false)
  }

  return (
    <div className="space-y-4">
      <Card className="p-6 sticky top-4">
        <h3 className="text-lg font-semibold mb-4">Test Summary</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="size-4" />
              <span className="text-sm">Duration</span>
            </div>
            <span className="font-semibold">{mockTest.duration} min</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
            <div className="flex items-center gap-2 text-muted-foreground">
              <FileText className="size-4" />
              <span className="text-sm">Questions</span>
            </div>
            <span className="font-semibold">{totalQuestions}</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Award className="size-4" />
              <span className="text-sm">Total Marks</span>
            </div>
            <span className="font-semibold">{totalMarks}</span>
          </div>
        </div>

        <Button
          className="w-full mt-6 h-12 text-base font-semibold"
          size="lg"
          onClick={handleStartTest}
          disabled={isStarting}
        >
          <PlayCircle className="size-5 mr-2" />
          {isStarting ? "Starting..." : "Start Test"}
        </Button>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sections</span>
            <span className="font-medium">{mockTest.sections?.length || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Questions</span>
            <span className="font-medium">{totalQuestions}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Marks</span>
            <span className="font-medium">{totalMarks}</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
