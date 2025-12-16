"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  ChevronRight,
  Flag,
  Clock,
  CheckCircle2,
  Circle,
  Loader2,
  AlertTriangle,
} from "lucide-react"
import { BlockMath, InlineMath } from "react-katex"
import { submitAnswer } from "@/utils/api"
import { cn } from "@/lib/utils"

export function QuestionViewer({ sections, attemptId, duration, onSubmitExam, token }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set())
  const [timeRemaining, setTimeRemaining] = useState(duration * 60)
  const [saving, setSaving] = useState(false)

  // Flatten questions
  const allQuestions = sections.flatMap((section) =>
    section.questions.map((q) => ({ ...q, sectionTitle: section.title })),
  )

  const currentQuestion = allQuestions[currentQuestionIndex]
  const totalQuestions = allQuestions.length
  const answeredCount = Object.keys(answers).length
  const progress = (answeredCount / totalQuestions) * 100

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmitExam()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  /* ---------------- ANSWER HANDLING ---------------- */
  const handleOptionSelect = async (optionId) => {
    setSaving(true)
    try {
      await submitAnswer(attemptId, currentQuestion.id, optionId, token)
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }))
    } catch (error) {
      console.error(error)
      alert("Failed to save answer.")
    } finally {
      setSaving(false)
    }
  }

  const handleFlagQuestion = () => {
    setFlaggedQuestions((prev) => {
      const next = new Set(prev)
      next.has(currentQuestion.id) ? next.delete(currentQuestion.id) : next.add(currentQuestion.id)
      return next
    })
  }

  const handlePrevious = () => currentQuestionIndex > 0 && setCurrentQuestionIndex((i) => i - 1)
  const handleNext = () =>
    currentQuestionIndex < totalQuestions - 1 && setCurrentQuestionIndex((i) => i + 1)

  const handleSubmitExam = async () => {
    if (answeredCount < totalQuestions) {
      if (!confirm("You have unanswered questions. Submit anyway?")) return
    }
    if (confirm("Submit exam? This cannot be undone.")) {
      await onSubmitExam()
    }
  }

  const getQuestionStatus = (id) => {
    if (answers[id]) return "answered"
    if (flaggedQuestions.has(id)) return "flagged"
    return "unanswered"
  }

  return (
    <div className="space-y-6">
      {/* ---------------- TOP BAR ---------------- */}
      <Card className="p-4 sticky top-4 z-10 bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Clock className={cn("size-5", timeRemaining < 300 && "text-destructive")} />
            <span className="font-mono text-lg font-semibold">{formatTime(timeRemaining)}</span>
            {timeRemaining < 300 && (
              <Badge variant="destructive" className="animate-pulse">
                <AlertTriangle className="size-3 mr-1" />
                Time Running Out
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-sm font-medium">
              {answeredCount}/{totalQuestions}
            </span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* ---------------- QUESTION AREA ---------------- */}
        <div className="lg:col-span-3 space-y-4">
          <Card className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex gap-2 mb-2">
                  <Badge variant="outline">{currentQuestion.sectionTitle}</Badge>
                  <Badge variant="secondary">+{currentQuestion.marks}</Badge>
                  {currentQuestion.negative_marks > 0 && (
                    <Badge variant="destructive">-{currentQuestion.negative_marks}</Badge>
                  )}
                </div>
                <h3 className="text-lg font-semibold">
                  Question {currentQuestionIndex + 1}
                </h3>
              </div>
              <Button
                size="sm"
                variant={flaggedQuestions.has(currentQuestion.id) ? "default" : "outline"}
                onClick={handleFlagQuestion}
              >
                <Flag className="size-4" />
              </Button>
            </div>

            {/* -------- QUESTION TEXT (KaTeX) -------- */}
            <div className="mt-4 bg-gray-50 border rounded p-4">
              <BlockMath math={currentQuestion.question_text} />
            </div>

            {/* -------- OPTIONS (KaTeX) -------- */}
            <div className="space-y-3 mt-6">
              {currentQuestion.options.map((option) => {
                const isSelected = answers[currentQuestion.id] === option.id
                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    disabled={saving}
                    className={cn(
                      "w-full p-4 rounded-lg border-2 text-left transition-all",
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary hover:bg-primary/5",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      {isSelected ? (
                        <CheckCircle2 className="size-5 text-primary mt-1" />
                      ) : (
                        <Circle className="size-5 text-muted-foreground mt-1" />
                      )}
                      <InlineMath math={option.option_text} />
                    </div>
                  </button>
                )
              })}
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
              <ChevronLeft className="mr-2 size-4" /> Previous
            </Button>
            <Button onClick={handleNext} disabled={currentQuestionIndex === totalQuestions - 1}>
              Next <ChevronRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>

        {/* ---------------- PALETTE ---------------- */}
        <div className="lg:col-span-1">
          <Card className="p-4 sticky top-24">
            <h4 className="font-semibold mb-4">Question Palette</h4>
            <div className="grid grid-cols-5 gap-2">
              {allQuestions.map((q, i) => {
                const status = getQuestionStatus(q.id)
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(i)}
                    className={cn(
                      "size-10 rounded border-2",
                      status === "answered" && "border-primary bg-primary/10",
                      status === "flagged" && "border-orange-500 bg-orange-500/10",
                      status === "unanswered" && "border-border",
                      currentQuestionIndex === i && "ring-2 ring-primary",
                    )}
                  >
                    {i + 1}
                  </button>
                )
              })}
            </div>

            <Button onClick={handleSubmitExam} className="w-full mt-4" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" /> Saving…
                </>
              ) : (
                "Submit Exam"
              )}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
