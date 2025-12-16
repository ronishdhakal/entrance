"use client"

import { ChevronDown, ChevronUp, Trash2 } from "lucide-react"
import { BlockMath } from "react-katex"
import OptionInput from "./OptionInput"

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
          <button type="button" onClick={onToggle} className="text-gray-600 hover:text-gray-900">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
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
              Question Text (LaTeX Supported)
            </label>

            <textarea
              value={question.question_text}
              onChange={(e) => onUpdate("question_text", e.target.value)}
              placeholder={`Example:
\\frac{d}{dx}(x^2 + 3x)
\\int_0^1 x^2 dx
\\sqrt{x}
\\begin{bmatrix}1 & 2 \\\\ 3 & 4\\end{bmatrix}`}
              rows={3}
              required
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Math Preview */}
          {question.question_text && (
            <div className="bg-gray-50 border rounded p-3">
              <p className="text-xs text-gray-500 mb-1">Math Preview</p>
              <BlockMath math={question.question_text} />
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
              Options (LaTeX Supported)
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
