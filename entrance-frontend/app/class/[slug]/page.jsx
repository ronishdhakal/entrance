import { fetchClassDetail } from "@/utils/api"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

import ClassHeader from "@/components/class/ClassHeader"
import ClassMeta from "@/components/class/ClassMeta"
import ClassPricing from "@/components/class/ClassPricing"
import ClassDescription from "@/components/class/ClassDescription"
import ClassResources from "@/components/class/ClassResources"

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
        ? [
            {
              url: data.featured_image,
            },
          ]
        : [],
    },
  }
}

/**
 * Page
 */
export default async function ClassDetailPage(props) {
  // ✅ params is async in new Next.js
  const params = await props.params
  const slug = params.slug

  const data = await fetchClassDetail(slug)

  if (!data) {
    return null
  }

  return (
    <>
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Header (H1) */}
          <div className="mb-10">
            <ClassHeader data={data} />
          </div>

          {/* Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-10">
              <ClassMeta data={data} />
              <ClassDescription data={data} />
              <ClassResources data={data} />
            </div>

            {/* Right Sidebar */}
            <aside className="space-y-6">
              <div className="sticky top-24">
                <ClassPricing data={data} />
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
