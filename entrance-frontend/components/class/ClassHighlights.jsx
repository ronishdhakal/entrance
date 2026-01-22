"use client"

export default function ClassHighlights({ highlights }) {
  if (!highlights) return null

  return (
    <section className="mt-8">
      <div className="max-w-4xl">
        <h2 className="text-xl font-semibold mb-4 text-foreground">
          Class Highlights
        </h2>

        <div
          className="
            prose prose-sm
            prose-ul:list-disc prose-ul:pl-6
            prose-ol:list-decimal prose-ol:pl-6
            prose-li:my-1
            prose-strong:text-foreground
            text-muted-foreground
            max-w-none
          "
          dangerouslySetInnerHTML={{
            __html: highlights,
          }}
        />
      </div>
    </section>
  )
}
