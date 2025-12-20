"use client"

export default function ExamTopDescription({ description }) {
  if (!description) return null

  return (
    <div className="max-w-4xl mb-6 prose prose-sm text-muted-foreground">
      <div
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />
    </div>
  )
}
