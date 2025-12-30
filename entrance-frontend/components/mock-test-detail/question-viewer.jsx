"use client"

import { useState, useEffect, useMemo } from "react"
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
  AlertTriangle,
} from "lucide-react"
import { BlockMath, InlineMath } from "react-katex"
import "katex/dist/katex.min.css"
import { submitAnswer } from "@/utils/api"
import { cn } from "@/lib/utils"

/* ================= MATH RENDER ================= */
function renderMathText(text) {
  if (!text) return null

  const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[^$]+\$)/g)

  return parts.map((part, index) => {
    if (part.startsWith("$$") && part.endsWith("$$")) {
      return (
        <div key={index} className="my-2">
          <BlockMath math={part.slice(2, -2)} />
        </div>
      )
    }
    if (part.startsWith("$") && part.endsWith("$")) {
      return <InlineMath key={index} math={part.slice(1, -1)} />
    }
    return (
      <span key={index} className="whitespace-pre-wrap">
        {part}
      </span>
    )
  })
}

export function QuestionViewer({
  sections,
  selectedOptionalSectionIds = [], // ✅ REQUIRED
  attemptId,
  duration,
  onSubmitExam,
  token,
}) {
  /* ================= FILTER SECTIONS (CORRECT) ================= */
  const filteredSections = useMemo(() => {
    return sections.filter((section) => {
      // mandatory section → always include
      if (!section.is_optional) return true

      // optional section → include ONLY if selected
      return selectedOptionalSectionIds.includes(section.id)
    })
  }, [sections, selectedOptionalSectionIds])

  /* ================= STATE ================= */
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set())
  const [timeRemaining, setTimeRemaining] = useState(duration * 60)
  const [saving, setSaving] = useState(false)

  /* ================= FLATTEN QUESTIONS ================= */
  const allQuestions = useMemo(
    () =>
      filteredSections.flatMap((section) =>
        section.questions.map((q) => ({
          ...q,
          sectionTitle: section.title,
        })),
      ),
    [filteredSections],
  )

  const currentQuestion = allQuestions[currentQuestionIndex]
  const totalQuestions = allQuestions.length
  const answeredCount = Object.keys(answers).length
  const progress = totalQuestions
    ? (answeredCount / totalQuestions) * 100
    : 0

  /* ================= TIMER ================= */
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

  /* ================= ANSWERS ================= */
  const handleOptionSelect = async (optionId) => {
    if (!currentQuestion) return

    setSaving(true)
    try {
      await submitAnswer(attemptId, currentQuestion.id, optionId, token)
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: optionId,
      }))
    } catch {
      alert("Failed to save answer.")
    } finally {
      setSaving(false)
    }
  }

  const handleFlagQuestion = () => {
    if (!currentQuestion) return

    setFlaggedQuestions((prev) => {
      const next = new Set(prev)
      next.has(currentQuestion.id)
        ? next.delete(currentQuestion.id)
        : next.add(currentQuestion.id)
      return next
    })
  }

  const handleSubmitExam = async () => {
    if (
      answeredCount < totalQuestions &&
      !confirm("You have unanswered questions. Submit anyway?")
    )
      return

    if (confirm("Submit exam? This cannot be undone.")) {
      await onSubmitExam()
    }
  }

  const getQuestionStatus = (id) => {
    if (answers[id]) return "answered"
    if (flaggedQuestions.has(id)) return "flagged"
    return "unanswered"
  }

  if (!currentQuestion) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No questions available for the selected sections.
      </div>
    )
  }

  /* ================= RENDER ================= */
  return (
    <div className="space-y-6">
      {/* ===== TOP BAR ===== */}
      <Card className="p-4 sticky top-4 z-10 bg-background/95 backdrop-blur">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Clock
              className={cn(
                "size-5",
                timeRemaining < 300 && "text-destructive",
              )}
            />
            <span className="font-mono font-semibold">
              {formatTime(timeRemaining)}
            </span>
            {timeRemaining < 300 && (
              <Badge variant="destructive">
                <AlertTriangle className="size-3 mr-1" />
                Time Running Out
              </Badge>
            )}
          </div>

          <span className="text-sm">
            {answeredCount}/{totalQuestions} answered
          </span>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* ===== QUESTION ===== */}
        <div className="lg:col-span-3 space-y-4">
          <Card className="p-6">
            <div className="flex justify-between">
              <div>
                <Badge variant="outline">
                  {currentQuestion.sectionTitle}
                </Badge>
                <h3 className="mt-2 font-semibold">
                  Question {currentQuestionIndex + 1}
                </h3>
              </div>

              <Button size="sm" variant="outline" onClick={handleFlagQuestion}>
                <Flag className="size-4" />
              </Button>
            </div>

            <div className="mt-4 bg-gray-50 p-4 rounded">
              {renderMathText(currentQuestion.question_text)}
            </div>

            <div className="space-y-3 mt-6">
              {currentQuestion.options.map((option) => {
                const isSelected =
                  answers[currentQuestion.id] === option.id

                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    disabled={saving}
                    className={cn(
                      "w-full p-4 border-2 rounded text-left transition",
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary",
                    )}
                  >
                    <div className="flex gap-3">
                      {isSelected ? (
                        <CheckCircle2 className="size-5 text-primary" />
                      ) : (
                        <Circle className="size-5 text-muted-foreground" />
                      )}
                      {renderMathText(option.option_text)}
                    </div>
                  </button>
                )
              })}
            </div>
          </Card>

          <div className="flex justify-between">
            <Button
              variant="outline"
              disabled={currentQuestionIndex === 0}
              onClick={() =>
                setCurrentQuestionIndex((i) => Math.max(i - 1, 0))
              }
            >
              <ChevronLeft className="mr-2 size-4" />
              Previous
            </Button>

            <Button
              disabled={currentQuestionIndex === totalQuestions - 1}
              onClick={() =>
                setCurrentQuestionIndex((i) =>
                  Math.min(i + 1, totalQuestions - 1),
                )
              }
            >
              Next
              <ChevronRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>

        {/* ===== PALETTE ===== */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h4 className="font-semibold mb-4">Question Palette</h4>

            <div className="grid grid-cols-5 gap-2">
              {allQuestions.map((q, i) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(i)}
                  className={cn(
                    "size-10 border rounded",
                    getQuestionStatus(q.id) === "answered" &&
                      "bg-primary/10 border-primary",
                    currentQuestionIndex === i &&
                      "ring-2 ring-primary",
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <Button
              className="w-full mt-4"
              onClick={handleSubmitExam}
              disabled={saving}
            >
              Submit Exam
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
