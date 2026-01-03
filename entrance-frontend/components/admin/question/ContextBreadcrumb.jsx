"use client"

import { ChevronRight, X } from "lucide-react"

export default function ContextBreadcrumb({ context, onClear }) {
  if (!context) return null

  return (
    <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm font-medium">
        <span className="text-blue-500">Adding to:</span>
        <div className="flex items-center">
          <span className="text-blue-900">{context.section?.title}</span>
          {context.topic && (
            <>
              <ChevronRight className="w-4 h-4 text-blue-300 mx-1" />
              <span className="text-blue-900">{context.topic?.title}</span>
            </>
          )}
          {context.subtopic && (
            <>
              <ChevronRight className="w-4 h-4 text-blue-300 mx-1" />
              <span className="text-blue-900">{context.subtopic?.title}</span>
            </>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={onClear}
        className="p-1.5 text-blue-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition"
        title="Change location"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
