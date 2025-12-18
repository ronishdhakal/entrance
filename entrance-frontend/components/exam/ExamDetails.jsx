"use client"

export default function ExamDetails({ detail }) {
  if (!detail) return null

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-foreground mb-4">Detailed Information</h2>
      <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
        {detail}
      </div>
    </div>
  )
}
