import { fetchClasses } from "@/utils/api"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

import ClassCard from "@/components/class/ClassCard"

export const metadata = {
  title: "IT Entrance Preparation Classes in Nepal",
  description:
    "Explore expert-led IT entrance preparation classes for BSc CSIT, BIT, BBA and more — available online and in-person across Nepal.",
  keywords: [
    "IT entrance preparation classes Nepal",
    "BSc CSIT classes",
    "BIT entrance classes",
    "online entrance classes Nepal",
    "entrance coaching Nepal",
    "College Info Nepal classes",
  ],
  alternates: {
    canonical: "https://entrance.collegeinfonepal.com/class",
  },
  openGraph: {
    title: "IT Entrance Preparation Classes in Nepal",
    description:
      "Expert-led entrance preparation classes for BSc CSIT, BIT, BBA and more — online and in-person.",
    url: "https://entrance.collegeinfonepal.com/class",
    siteName: "Entrance Prep by College Info Nepal",
    images: [
      {
        url: "/assets/social.jpg",
        width: 1200,
        height: 630,
        alt: "IT Entrance Preparation Classes – College Info Nepal",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Entrance Preparation Classes in Nepal",
    description:
      "Expert-led entrance preparation classes for BSc CSIT, BIT, BBA and more.",
    images: ["/assets/social.jpg"],
  },
}

export default async function ClassPage() {
  const classes = await fetchClasses()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Entrance Preparation Classes in Nepal",
    description:
      "Expert-led entrance preparation classes available online and in-person across Nepal.",
    url: "https://entrance.collegeinfonepal.com/class",
    numberOfItems: classes.length,
    provider: {
      "@type": "Organization",
      name: "College Info Nepal",
      url: "https://entrance.collegeinfonepal.com",
    },
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">
              IT Entrance Preparation Classes in Nepal
            </h1>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Explore expert-led IT entrance preparation classes available both
              online and physically to help you succeed in your exams.
            </p>
          </div>

          {/* Classes Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {classes.length > 0 ? (
              classes.map((item) => (
                <ClassCard key={item.id} data={item} />
              ))
            ) : (
              <p className="text-gray-500">
                No classes available at the moment.
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
