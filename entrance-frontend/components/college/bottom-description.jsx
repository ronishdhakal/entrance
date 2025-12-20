export default function BottomDescription({ content }) {
  if (!content) return null

  return (
    <div className="mt-12 max-w-4xl">
      <div
        className="
          prose prose-lg text-gray-700
          prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-4
          prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3
          prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4
          prose-li:my-1
        "
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}
