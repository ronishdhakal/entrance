import { notFound } from "next/navigation"
import { fetchClassDetail } from "@/utils/api"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

import ClassHeader from "@/components/class/ClassHeader"
import ClassMeta from "@/components/class/ClassMeta"
import ClassPricing from "@/components/class/ClassPricing"
import ClassResources from "@/components/class/ClassResources"
import ClassHighlights from "@/components/class/ClassHighlights"
import ClassTopDescription from "@/components/class/ClassTopDescription"
import ClassBottomDescription from "@/components/class/ClassBottomDescription"

/**
 * SEO Metadata
 */
export async function generateMetadata(props) {
  const params = await props.params
  const slug = params.slug

  const data = await fetchClassDetail(slug)

  if (!data) {
    return {
      title: "Class Not Found",
    }
  }

  const title = data.meta_title || data.title
  const description =
    data.meta_description ||
    `Join ${data.title} entrance preparation class. Available online and in-person with expert guidance.`
  const url = `https://entrance.collegeinfonepal.com/class/${slug}`
  const image = data.featured_image || "/assets/social.jpg"

  return {
    title,
    description,
    keywords: [
      `${data.title}`,
      `${data.title} entrance class`,
      "entrance preparation class Nepal",
      "online entrance class Nepal",
      "College Info Nepal",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Entrance Prep by College Info Nepal",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  }
}

/**
 * Page
 */
export default async function ClassDetailPage(props) {
  const params = await props.params
  const slug = params.slug

  const data = await fetchClassDetail(slug)

  if (!data) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: data.title,
    description:
      data.meta_description ||
      `Entrance preparation class for ${data.title} available online and in-person.`,
    url: `https://entrance.collegeinfonepal.com/class/${slug}`,
    provider: {
      "@type": "Organization",
      name: "College Info Nepal",
      url: "https://entrance.collegeinfonepal.com",
    },
    ...(data.featured_image && { image: data.featured_image }),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Header (H1) */}
          <div className="mb-8">
            <ClassHeader data={data} />
          </div>

          {/* Meta Info */}
          <div className="mb-8">
            <ClassMeta data={data} />
          </div>

          {/* Top Description */}
          {data.top_description && (
            <section className="mb-10">
              <ClassTopDescription description={data.top_description} />
            </section>
          )}

          {/* Highlights */}
          {data.highlights && (
            <section className="mb-10">
              <ClassHighlights highlights={data.highlights} />
            </section>
          )}

          {/* Pricing */}
          <section className="mb-12">
            <ClassPricing data={data} />
          </section>

          {/* Bottom Description */}
          {data.bottom_description && (
            <section className="mb-12">
              <ClassBottomDescription description={data.bottom_description} />
            </section>
          )}

          {/* Resources */}
          <section className="mb-6">
            <ClassResources data={data} />
          </section>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
