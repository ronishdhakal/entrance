"use client"

import { ChevronDown, ChevronUp, Trash2, Plus } from "lucide-react"
import QuestionForm from "./QuestionForm"

export default function SectionForm({
  section,
  sectionIndex,
  isExpanded,
  expandedQuestions,
  onToggle,
  onUpdate,
  onRemove,
  onAddQuestion,
  onUpdateQuestion,
  onRemoveQuestion,
  onToggleQuestion,
  onUpdateOption,
}) {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Section Header */}
      <div className="bg-gray-50 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <button type="button" onClick={onToggle} className="text-gray-600 hover:text-gray-900">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          <div className="flex-1">
            <input
              type="text"
              value={section.title}
              onChange={(e) => onUpdate("title", e.target.value)}
              placeholder="Section Title (e.g., English)"
              className="w-full px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <span className="text-sm text-gray-600">{section.questions.length} questions</span>
        </div>
        <button type="button" onClick={onRemove} className="ml-4 text-red-600 hover:text-red-800">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Section Content */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* Section Options */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Order</label>
              <input
                type="number"
                value={section.order}
                onChange={(e) => onUpdate("order", Number.parseInt(e.target.value))}
                className="w-full px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                min="1"
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={section.is_optional}
                  onChange={(e) => onUpdate("is_optional", e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Optional</span>
              </label>
            </div>
            {section.is_optional && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Optional Group</label>
                <input
                  type="number"
                  value={section.optional_group || ""}
                  onChange={(e) => onUpdate("optional_group", e.target.value ? Number.parseInt(e.target.value) : null)}
                  placeholder="Group #"
                  className="w-full px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          {/* Questions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-gray-800">Questions</h4>
              <button
                type="button"
                onClick={onAddQuestion}
                className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition"
              >
                <Plus className="w-3 h-3" />
                Add Question
              </button>
            </div>

            <div className="space-y-3">
              {section.questions.map((question, questionIndex) => {
                const questionKey = `${sectionIndex}-${questionIndex}`
                return (
                  <QuestionForm
                    key={questionIndex}
                    question={question}
                    questionIndex={questionIndex}
                    sectionIndex={sectionIndex}
                    isExpanded={expandedQuestions.has(questionKey)}
                    onToggle={() => onToggleQuestion(questionKey)}
                    onUpdate={(field, value) => onUpdateQuestion(questionIndex, field, value)}
                    onRemove={() => onRemoveQuestion(questionIndex)}
                    onUpdateOption={(optionIndex, field, value) =>
                      onUpdateOption(questionIndex, optionIndex, field, value)
                    }
                  />
                )
              })}

              {section.questions.length === 0 && (
                <div className="text-center py-4 text-sm text-gray-500">No questions added yet</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
