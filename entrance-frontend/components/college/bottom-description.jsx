export default function BottomDescription({ content }) {
  if (!content) return null

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mt-12">
      <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}
