export default function BookMeta({ book }) {
  if (!book) return null

  const metaItems = [
    { label: "Publisher", value: book.publisher },
    { label: "Language", value: book.language },
    { label: "Pages", value: book.page_count },
    { label: "Format", value: book.format },
    { label: "Edition", value: book.edition },
    { label: "Publication Date", value: book.publication_date },
    { label: "ISBN-10", value: book.isbn_10 },
    { label: "ISBN-13", value: book.isbn_13 },
  ].filter(item => item.value)

  if (metaItems.length === 0) return null

  return (
    <section className="rounded-lg border border-gray-200 bg-white">
      {/* Header */}
      <div className="border-b border-gray-100 px-5 py-3">
        <h2 className="text-sm font-semibold tracking-wide text-gray-900 uppercase">
          Book details
        </h2>
      </div>

      {/* Meta list */}
      <dl className="divide-y divide-gray-100 px-5 py-4 text-sm">
        {metaItems.map(item => (
          <div
            key={item.label}
            className="flex items-start justify-between gap-4 py-2"
          >
            <dt className="text-gray-500">
              {item.label}
            </dt>
            <dd className="text-right font-medium text-gray-900">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
