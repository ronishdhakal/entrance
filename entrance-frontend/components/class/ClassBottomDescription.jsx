export default function ClassBottomDescription({ description }) {
  if (!description) return null

  return (
    <section className="space-y-6">
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </section>
  )
}
