export default function SyllabusTopDescription({ html }) {
  if (!html) return null

  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
