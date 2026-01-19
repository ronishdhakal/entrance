export default function BookDescription({ description, excerpt, subtitle }) {
  if (!description && !excerpt) return null

  return (
    <section className="mt-12">
      {/* H2: Subtitle or fallback */}
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        {subtitle || "About this book"}
      </h2>

      <div className="prose prose-gray max-w-none prose-headings:font-semibold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary">
        {excerpt && (
          <div
            className="mb-6 text-base"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
        )}

        {description && (
          <div
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </div>
    </section>
  )
}
