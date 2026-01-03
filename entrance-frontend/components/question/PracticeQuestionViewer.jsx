"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Check, X } from "lucide-react"
import { BlockMath, InlineMath } from "react-katex"
import "katex/dist/katex.min.css"
import { cn } from "@/lib/utils"

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

export function PracticeQuestionViewer({ questions, sectionTitle }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [answeredCount, setAnsweredCount] = useState(0)

  const currentQuestion = questions[currentIndex]
  const correctAnswer = currentQuestion?.options?.find((opt) => opt.is_correct)
  const userAnswer = selectedAnswers[currentQuestion?.id]

  const handleSelectOption = (optionId) => {
    if (selectedAnswers[currentQuestion.id]) return

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }))
    setAnsweredCount((prev) => prev + 1)
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1))
  }

  const handleGoToQuestion = (index) => {
    setCurrentIndex(index)
  }

  const progress = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <Card className="p-4 sticky top-4 z-10 bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium">
            Question {currentIndex + 1}/{questions.length}
          </div>
          <div className="text-sm text-muted-foreground">
            Answered: {answeredCount}/{questions.length}
          </div>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Question */}
        <div className="lg:col-span-3 space-y-4">
          <Card className="p-6">
            <div className="mb-4">
              <Badge variant="outline">{sectionTitle}</Badge>
              <h3 className="text-lg font-semibold mt-3 mb-4">Question {currentIndex + 1}</h3>
            </div>

            <div className="bg-muted p-4 rounded-lg mb-6">{renderMathText(currentQuestion?.question_text)}</div>

            <div className="space-y-3">
              {currentQuestion?.options?.map((option) => {
                const isSelected = userAnswer === option.id
                const isCorrect = option.is_correct
                const showFeedback = selectedAnswers[currentQuestion.id] !== undefined

                let borderClass = "border-border"
                let bgClass = ""
                let iconClass = ""

                if (showFeedback) {
                  if (isSelected && isCorrect) {
                    borderClass = "border-green-500"
                    bgClass = "bg-green-50 dark:bg-green-950/20"
                    iconClass = "text-green-500"
                  } else if (isSelected && !isCorrect) {
                    borderClass = "border-red-500"
                    bgClass = "bg-red-50 dark:bg-red-950/20"
                    iconClass = "text-red-500"
                  } else if (isCorrect) {
                    borderClass = "border-green-500"
                    bgClass = "bg-green-50 dark:bg-green-950/20"
                    iconClass = "text-green-500"
                  }
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    disabled={selectedAnswers[currentQuestion.id] !== undefined}
                    className={cn(
                      "w-full p-4 border-2 rounded-lg text-left transition",
                      borderClass,
                      bgClass,
                      selectedAnswers[currentQuestion.id] === undefined && "hover:border-primary cursor-pointer",
                      selectedAnswers[currentQuestion.id] !== undefined && "cursor-default",
                    )}
                  >
                    <div className="flex gap-3 items-start">
                      <div className="flex-1">{renderMathText(option.option_text)}</div>
                      {showFeedback && (
                        <div className={cn("flex-shrink-0 mt-0.5", iconClass)}>
                          {isCorrect ? <Check className="size-5" /> : <X className="size-5" />}
                        </div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {selectedAnswers[currentQuestion.id] !== undefined && (
              <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900">
                <p className="text-sm font-medium mb-1">
                  {userAnswer === correctAnswer.id ? (
                    <span className="text-green-700 dark:text-green-400">Correct!</span>
                  ) : (
                    <span className="text-red-700 dark:text-red-400">Incorrect</span>
                  )}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Correct answer:</strong> {renderMathText(correctAnswer?.option_text)}
                </p>
              </div>
            )}
          </Card>

          <div className="flex justify-between gap-3">
            <Button variant="outline" onClick={handlePrevious} disabled={currentIndex === 0}>
              <ChevronLeft className="mr-2 size-4" />
              Previous
            </Button>

            <Button onClick={handleNext} disabled={currentIndex === questions.length - 1}>
              Next
              <ChevronRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>

        {/* Question Navigation Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h4 className="font-semibold mb-4 text-sm">Questions</h4>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, index) => (
                <button
                  key={q.id}
                  onClick={() => handleGoToQuestion(index)}
                  className={cn(
                    "size-9 border rounded text-sm font-medium transition",
                    currentIndex === index && "ring-2 ring-primary",
                    selectedAnswers[q.id] !== undefined
                      ? "bg-primary text-primary-foreground"
                      : "border-border hover:border-primary",
                  )}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t text-xs space-y-2">
              <div className="flex items-center gap-2">
                <div className="size-3 bg-primary rounded" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-3 border rounded" />
                <span>Unanswered</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
