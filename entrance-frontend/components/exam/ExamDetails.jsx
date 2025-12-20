"use client"

export default function ExamDetails({ detail }) {
  if (!detail) return null

  return (
    <div className="max-w-4xl mb-8">
      <div
        className="
          prose prose-sm text-muted-foreground
          prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-4
          prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3

          prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4
          prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-4
          prose-li:my-1
        "
        dangerouslySetInnerHTML={{
          __html: detail,
        }}
      />
    </div>
  )
}
