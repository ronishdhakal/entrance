"use client"

import { ChevronDown, ChevronUp, Trash2 } from "lucide-react"
import { BlockMath, InlineMath } from "react-katex"
import OptionInput from "./OptionInput"

/**
 * Renders text with optional LaTeX.
 * - Inline math: $x^2$
 * - Block math: $$x^2$$
 */
function renderMathText(text) {
  if (!text) return null

  const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[^$]+\$)/g)

  return parts.map((part, index) => {
    // Block math $$...$$
    if (part.startsWith("$$") && part.endsWith("$$")) {
      return (
        <div key={index} className="my-2">
          <BlockMath math={part.slice(2, -2)} />
        </div>
      )
    }

    // Inline math $...$
    if (part.startsWith("$") && part.endsWith("$")) {
      return (
        <InlineMath key={index} math={part.slice(1, -1)} />
      )
    }

    // Normal text
    return (
      <span key={index} className="whitespace-pre-wrap">
        {part}
      </span>
    )
  })
}

export default function QuestionForm({
  question,
  questionIndex,
  sectionIndex,
  isExpanded,
  onToggle,
  onUpdate,
  onRemove,
  onUpdateOption,
}) {
  const questionKey = `${sectionIndex}-${questionIndex}`

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Question Header */}
      <div className="bg-blue-50 p-3 flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <button
            type="button"
            onClick={onToggle}
            className="text-gray-600 hover:text-gray-900"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          <span className="text-xs font-semibold text-gray-700">
            Q{questionIndex + 1}
          </span>

          <span className="text-xs text-gray-600 truncate flex-1">
            {question.question_text || "New Question"}
          </span>
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="ml-3 text-red-600 hover:text-red-800"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Question Content */}
      {isExpanded && (
        <div className="p-3 space-y-4 bg-white">
          {/* Question Text */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Question Text
              <span className="text-gray-500 font-normal">
                {" "}— Use <code>$...$</code> for math
              </span>
            </label>

            <textarea
              value={question.question_text}
              onChange={(e) =>
                onUpdate("question_text", e.target.value)
              }
              placeholder={`Example:
What is the derivative of $x^2 + 3x$?

Evaluate:
$$
\\int_0^1 x^2 dx
$$`}
              rows={4}
              required
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Preview */}
          {question.question_text && (
            <div className="bg-gray-50 border rounded p-3">
              <p className="text-xs text-gray-500 mb-1">Preview</p>
              <div className="text-sm leading-relaxed">
                {renderMathText(question.question_text)}
              </div>
            </div>
          )}

          {/* Marks */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Marks
              </label>
              <input
                type="number"
                value={question.marks}
                onChange={(e) =>
                  onUpdate("marks", Number.parseFloat(e.target.value))
                }
                step="0.5"
                min="0"
                className="w-full px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Negative Marks
              </label>
              <input
                type="number"
                value={question.negative_marks}
                onChange={(e) =>
                  onUpdate("negative_marks", Number.parseFloat(e.target.value))
                }
                step="0.25"
                min="0"
                className="w-full px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Options */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Options (Text + LaTeX supported)
            </label>

            <div className="space-y-3">
              {question.options.map((option, optionIndex) => (
                <OptionInput
                  key={optionIndex}
                  option={option}
                  optionIndex={optionIndex}
                  questionKey={questionKey}
                  isCorrect={option.is_correct}
                  onUpdate={(idx, field, value) =>
                    onUpdateOption(idx, field, value)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
