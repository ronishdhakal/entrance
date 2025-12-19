"use client"

import { InlineMath } from "react-katex"

/**
 * Renders option text with optional LaTeX.
 * - Inline math: $x^2$
 */
function renderOptionText(text) {
  if (!text) return null

  const parts = text.split(/(\$[^$]+\$)/g)

  return parts.map((part, index) => {
    // Inline math $...$
    if (part.startsWith("$") && part.endsWith("$")) {
      return (
        <InlineMath
          key={index}
          math={part.slice(1, -1)}
        />
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

export default function OptionInput({
  option,
  optionIndex,
  questionKey,
  isCorrect,
  onUpdate,
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <input
          type="radio"
          name={`correct-${questionKey}`}
          checked={isCorrect}
          onChange={() =>
            onUpdate(optionIndex, "is_correct", true)
          }
          className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
        />

        <span className="text-xs font-medium text-gray-700 w-6">
          {String.fromCharCode(65 + optionIndex)}.
        </span>

        <input
          type="text"
          value={option.option_text}
          onChange={(e) =>
            onUpdate(optionIndex, "option_text", e.target.value)
          }
          placeholder={`Option ${String.fromCharCode(
            65 + optionIndex
          )}`}
          required
          className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Preview */}
      {option.option_text && (
        <div className="ml-10 bg-gray-50 border rounded px-2 py-1 text-sm leading-relaxed">
          {renderOptionText(option.option_text)}
        </div>
      )}
    </div>
  )
}
