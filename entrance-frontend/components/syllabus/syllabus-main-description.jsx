export default function SyllabusMainDescription({ html }) {
  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
