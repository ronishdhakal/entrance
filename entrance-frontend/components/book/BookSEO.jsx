import { notFound } from "next/navigation"

export default function BookSEO({ book }) {
  if (!book) {
    notFound()
  }

  const title = `${book.title} | College Info Nepal`
  const description =
    book.excerpt
      ? stripHtml(book.excerpt).slice(0, 160)
      : `Read detailed information about ${book.title}, including author, price, reviews, and more.`

  const image =
    book.images?.find(img => img.is_featured)?.image ||
    book.images?.[0]?.image ||
    null

  return (
    <>
      <title>{title}</title>

      <meta name="description" content={description} />

      {/* Canonical */}
      <link
        rel="canonical"
        href={`https://collegeinfonepal.com/books/${book.slug}`}
      />

      {/* Open Graph */}
      <meta property="og:type" content="book" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`https://collegeinfonepal.com/books/${book.slug}`} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </>
  )
}

/**
 * Utility to strip HTML tags from CKEditor content
 */
function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, "")
}
