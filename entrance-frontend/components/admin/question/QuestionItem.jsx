"use client"

import { ChevronDown, ChevronUp, Trash2, GripVertical } from "lucide-react"
import "katex/dist/katex.min.css"
import { InlineMath, BlockMath } from "react-katex"
import OptionInput from "./OptionInput"

export default function QuestionItem({
  question,
  questionIndex,
  isExpanded,
  onToggle,
  onUpdate,
  onRemove,
  onUpdateOption,
}) {
  const renderMath = (text) => {
    if (!text) return null
    const parts = text.split(/(\$\$[\s\S]*?\$\$|\$.*?\$)/g)
    return parts.map((part, i) => {
      if (part.startsWith("$$") && part.endsWith("$$")) {
        return <BlockMath key={i}>{part.slice(2, -2)}</BlockMath>
      } else if (part.startsWith("$") && part.endsWith("$")) {
        return <InlineMath key={i}>{part.slice(1, -1)}</InlineMath>
      }
      return <span key={i}>{part}</span>
    })
  }

  return (
    <div className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div
        className={`flex items-center justify-between p-4 cursor-pointer transition ${
          isExpanded ? "bg-gray-50 border-b border-gray-200" : "hover:bg-gray-50"
        }`}
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <GripVertical className="w-4 h-4 text-gray-400" />
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-md text-xs font-bold">
              {questionIndex + 1}
            </span>
            <div className="font-medium text-gray-900 truncate max-w-[400px]">
              {question.question_text ? (
                <div className="line-clamp-1">{question.question_text.substring(0, 100)}</div>
              ) : (
                <span className="text-gray-400 italic">No question text...</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question Text <span className="text-gray-400 font-normal">(supports $math$ and $$math$$)</span>
                </label>
                <textarea
                  value={question.question_text}
                  onChange={(e) => onUpdate("question_text", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[120px] text-sm"
                  placeholder="Enter question text here..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Marks</label>
                  <input
                    type="number"
                    value={question.marks}
                    onChange={(e) => onUpdate("marks", Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Negative Marks</label>
                  <input
                    type="number"
                    value={question.negative_marks}
                    onChange={(e) => onUpdate("negative_marks", Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Live Preview</h4>
              <div className="prose prose-sm max-w-none text-gray-800 break-words overflow-auto max-h-[250px] custom-scrollbar">
                {question.question_text ? renderMath(question.question_text) : "Type to see preview..."}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h4 className="text-sm font-semibold text-gray-900">Options</h4>
              <span className="text-xs text-gray-500 italic">Select the checkbox for the correct answer</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((option, optionIndex) => (
                <OptionInput
                  key={optionIndex}
                  option={option}
                  index={optionIndex}
                  onUpdate={(field, value) => onUpdateOption(optionIndex, field, value)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
