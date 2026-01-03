"use client"

import { Check } from "lucide-react"
import "katex/dist/katex.min.css"
import { InlineMath, BlockMath } from "react-katex"

export default function OptionInput({ option, index, onUpdate }) {
  const optionLabels = ["A", "B", "C", "D"]

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
    <div
      className={`border rounded-lg overflow-hidden transition-all ${
        option.is_correct ? "border-green-400 bg-green-50 ring-2 ring-green-200" : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex items-start gap-3 p-3">
        <button
          type="button"
          onClick={() => onUpdate("is_correct", !option.is_correct)}
          className={`flex-shrink-0 mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition ${
            option.is_correct ? "bg-green-500 border-green-500" : "bg-white border-gray-300 hover:border-green-400"
          }`}
        >
          {option.is_correct && <Check className="w-3 h-3 text-white" />}
        </button>

        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-md flex items-center justify-center text-xs font-bold">
              {optionLabels[index]}
            </span>
            <input
              type="text"
              value={option.option_text}
              onChange={(e) => onUpdate("option_text", e.target.value)}
              placeholder={`Option ${optionLabels[index]}`}
              className="flex-1 px-2 py-1.5 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {option.option_text && (
            <div className="bg-gray-50 p-2 rounded border border-gray-100 text-xs text-gray-700 break-words">
              {renderMath(option.option_text)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
