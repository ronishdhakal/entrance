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
    `Join ${data.title} entrance preparation class. Available online and physical classes with expert guidance.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: data.featured_image
        ? [{ url: data.featured_image }]
        : [],
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

  if (!data) {
    return null
  }

  return (
    <>
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
