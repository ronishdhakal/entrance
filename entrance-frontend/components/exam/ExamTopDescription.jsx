"use client"

export default function ExamTopDescription({ description }) {
  if (!description) return null

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-foreground mb-4">Overview</h2>
      <div className="text-muted-foreground leading-relaxed whitespace-pre-line">{description}</div>
    </div>
  )
}
