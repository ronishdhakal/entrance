"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Check, X } from "lucide-react"
import { BlockMath, InlineMath } from "react-katex"
import "katex/dist/katex.min.css"
import { cn } from "@/lib/utils"

/* =========================
   Math Renderer
========================= */
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

/* =========================
   Sidebar Pagination Logic
========================= */
function getVisibleIndexes(current, total) {
  const visible = new Set()

  // First 3
  for (let i = 0; i < Math.min(3, total); i++) visible.add(i)

  // Last 3
  for (let i = Math.max(total - 3, 0); i < total; i++) visible.add(i)

  // Current ±2
  for (let i = current - 2; i <= current + 2; i++) {
    if (i >= 0 && i < total) visible.add(i)
  }

  return Array.from(visible).sort((a, b) => a - b)
}

/* =========================
   Component
========================= */
export function PracticeQuestionViewer({ questions }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [answeredCount, setAnsweredCount] = useState(0)
  const [jumpValue, setJumpValue] = useState("")

  const currentQuestion = questions[currentIndex]
  const correctAnswer = currentQuestion?.options?.find((o) => o.is_correct)
  const userAnswer = selectedAnswers[currentQuestion?.id]

  const handleSelectOption = (optionId) => {
    if (selectedAnswers[currentQuestion.id]) return

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }))
    setAnsweredCount((prev) => prev + 1)
  }

  const handleGoToQuestion = (index) => {
    setCurrentIndex(index)
  }

  const progress =
    questions.length > 0
      ? (answeredCount / questions.length) * 100
      : 0

  return (
    <div className="space-y-6">
      {/* Progress */}
      <Card className="p-4 sticky top-4 z-10 bg-background/95 backdrop-blur">
        <div className="flex justify-between mb-2 text-sm">
          <span>
            {currentIndex + 1}/{questions.length}
          </span>
          <span className="text-muted-foreground">
            Answered: {answeredCount}/{questions.length}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Question Area */}
        <div className="lg:col-span-3 space-y-4">
          <Card className="p-6">
            <div className="bg-muted p-4 rounded-lg mb-6">
              {renderMathText(currentQuestion?.question_text)}
            </div>

            <div className="space-y-3">
              {currentQuestion?.options?.map((option) => {
                const isSelected = userAnswer === option.id
                const isCorrect = option.is_correct
                const showFeedback =
                  selectedAnswers[currentQuestion.id] !== undefined

                let style = "border-border"
                if (showFeedback && isCorrect)
                  style = "border-green-500 bg-green-50 dark:bg-green-950/20"
                if (showFeedback && isSelected && !isCorrect)
                  style = "border-red-500 bg-red-50 dark:bg-red-950/20"

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    disabled={showFeedback}
                    className={cn(
                      "w-full p-4 border-2 rounded-lg text-left transition",
                      style,
                      !showFeedback && "hover:border-primary"
                    )}
                  >
                    <div className="flex gap-3">
                      <div className="flex-1">
                        {renderMathText(option.option_text)}
                      </div>
                      {showFeedback && (
                        <div>
                          {isCorrect ? (
                            <Check className="text-green-500 size-5" />
                          ) : (
                            <X className="text-red-500 size-5" />
                          )}
                        </div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </Card>

          <div className="flex justify-between">
            <Button
              variant="outline"
              disabled={currentIndex === 0}
              onClick={() => handleGoToQuestion(currentIndex - 1)}
            >
              <ChevronLeft className="mr-2 size-4" />
              Previous
            </Button>

            <Button
              disabled={currentIndex === questions.length - 1}
              onClick={() => handleGoToQuestion(currentIndex + 1)}
            >
              Next
              <ChevronRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4 sticky top-24 max-h-[80vh] overflow-y-auto">
            <h4 className="font-semibold mb-4 text-sm">Questions</h4>

            <div className="flex flex-wrap gap-2">
              {getVisibleIndexes(
                currentIndex,
                questions.length
              ).map((index, i, arr) => (
                <div key={index} className="flex items-center gap-2">
                  {i > 0 && index - arr[i - 1] > 1 && (
                    <span className="px-1 text-muted-foreground">…</span>
                  )}

                  <button
                    onClick={() => handleGoToQuestion(index)}
                    className={cn(
                      "size-9 border rounded text-sm font-medium",
                      currentIndex === index && "ring-2 ring-primary",
                      selectedAnswers[questions[index].id]
                        ? "bg-primary text-primary-foreground"
                        : "hover:border-primary"
                    )}
                  >
                    {index + 1}
                  </button>
                </div>
              ))}
            </div>

            {/* Jump */}
            <div className="mt-4 pt-4 border-t">
              <label className="text-xs font-medium mb-1 block">
                Go to question
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min={1}
                  max={questions.length}
                  value={jumpValue}
                  onChange={(e) => setJumpValue(e.target.value)}
                  className="w-full px-2 py-1 border rounded text-sm"
                  placeholder={`1-${questions.length}`}
                />
                <Button
                  size="sm"
                  onClick={() => {
                    const n = Number(jumpValue)
                    if (n >= 1 && n <= questions.length) {
                      handleGoToQuestion(n - 1)
                      setJumpValue("")
                    }
                  }}
                >
                  Go
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
