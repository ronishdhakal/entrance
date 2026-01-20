export default function ClassDescription({ data }) {
  return (
    <section className="space-y-6">
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: data.top_description }}
      />

      {data.bottom_description && (
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: data.bottom_description }}
        />
      )}
    </section>
  )
}
