"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Flag, Clock, CheckCircle2, Circle, Loader2, AlertTriangle } from "lucide-react"
import { submitAnswer } from "@/utils/api"
import { cn } from "@/lib/utils"

export function QuestionViewer({ sections, attemptId, duration, onSubmitExam, token }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set())
  const [timeRemaining, setTimeRemaining] = useState(duration * 60)
  const [saving, setSaving] = useState(false)

  // Flatten all questions from sections
  const allQuestions = sections.flatMap((section) =>
    section.questions.map((q) => ({ ...q, sectionTitle: section.title })),
  )

  const currentQuestion = allQuestions[currentQuestionIndex]
  const totalQuestions = allQuestions.length
  const answeredCount = Object.keys(answers).length
  const progress = (answeredCount / totalQuestions) * 100

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          // Auto-submit when time is up
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
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleOptionSelect = async (optionId) => {
    setSaving(true)
    try {
      // Save answer to backend
      await submitAnswer(attemptId, currentQuestion.id, optionId, token)

      // Update local state
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: optionId,
      }))
    } catch (error) {
      console.error("Error saving answer:", error)
      alert("Failed to save answer. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const handleFlagQuestion = () => {
    setFlaggedQuestions((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(currentQuestion.id)) {
        newSet.delete(currentQuestion.id)
      } else {
        newSet.add(currentQuestion.id)
      }
      return newSet
    })
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handleSubmitExam = async () => {
    if (answeredCount < totalQuestions) {
      const unanswered = totalQuestions - answeredCount
      if (!confirm(`You have ${unanswered} unanswered question(s). Are you sure you want to submit?`)) {
        return
      }
    }

    if (confirm("Are you sure you want to submit the exam? This action cannot be undone.")) {
      await onSubmitExam()
    }
  }

  const getQuestionStatus = (questionId) => {
    if (answers[questionId]) return "answered"
    if (flaggedQuestions.has(questionId)) return "flagged"
    return "unanswered"
  }

  return (
    <div className="space-y-6">
      {/* Top bar with timer and progress */}
      <Card className="p-4 sticky top-4 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className={cn("size-5", timeRemaining < 300 ? "text-destructive" : "text-primary")} />
              <span
                className={cn(
                  "font-mono text-lg font-semibold",
                  timeRemaining < 300 ? "text-destructive" : "text-foreground",
                )}
              >
                {formatTime(timeRemaining)}
              </span>
            </div>
            {timeRemaining < 300 && (
              <Badge variant="destructive" className="animate-pulse">
                <AlertTriangle className="size-3 mr-1" />
                Time Running Out
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Progress:</span>
              <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
              <span className="text-sm font-medium">
                {answeredCount}/{totalQuestions}
              </span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Question area */}
        <div className="lg:col-span-3 space-y-4">
          <Card className="p-6">
            <div className="space-y-4">
              {/* Question header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{currentQuestion.sectionTitle}</Badge>
                    <Badge variant="secondary">+{currentQuestion.marks} marks</Badge>
                    {currentQuestion.negative_marks > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        -{currentQuestion.negative_marks} for wrong
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold">Question {currentQuestionIndex + 1}</h3>
                </div>
                <Button
                  variant={flaggedQuestions.has(currentQuestion.id) ? "default" : "outline"}
                  size="sm"
                  onClick={handleFlagQuestion}
                >
                  <Flag className="size-4" />
                </Button>
              </div>

              {/* Question text */}
              <div className="prose prose-sm max-w-none">
                <p className="text-base leading-relaxed">{currentQuestion.question_text}</p>
              </div>

              {/* Options */}
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
                        "hover:border-primary hover:bg-primary/5",
                        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        isSelected ? "border-primary bg-primary/10 font-medium" : "border-border bg-card",
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {isSelected ? (
                            <CheckCircle2 className="size-5 text-primary" />
                          ) : (
                            <Circle className="size-5 text-muted-foreground" />
                          )}
                        </div>
                        <span className="flex-1">{option.option_text}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </Card>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
              <ChevronLeft className="size-4 mr-2" />
              Previous
            </Button>

            <Button onClick={handleNext} disabled={currentQuestionIndex === totalQuestions - 1}>
              Next
              <ChevronRight className="size-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Question palette sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4 sticky top-24">
            <h4 className="font-semibold mb-4">Question Palette</h4>

            {/* Legend */}
            <div className="space-y-2 mb-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="size-6 rounded border-2 border-primary bg-primary/10" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-6 rounded border-2 border-orange-500 bg-orange-500/10" />
                <span>Flagged</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-6 rounded border-2 border-border" />
                <span>Not Answered</span>
              </div>
            </div>

            {/* Question grid */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              {allQuestions.map((question, index) => {
                const status = getQuestionStatus(question.id)
                return (
                  <button
                    key={question.id}
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={cn(
                      "size-10 rounded border-2 font-medium text-sm transition-all",
                      "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary",
                      currentQuestionIndex === index && "ring-2 ring-primary",
                      status === "answered" && "border-primary bg-primary/10 text-primary",
                      status === "flagged" && "border-orange-500 bg-orange-500/10 text-orange-700",
                      status === "unanswered" && "border-border bg-background",
                    )}
                  >
                    {index + 1}
                  </button>
                )
              })}
            </div>

            {/* Submit button */}
            <Button onClick={handleSubmitExam} className="w-full" size="lg" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="size-4 mr-2 animate-spin" />
                  Saving...
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
