import { fetchSyllabusList } from "@/utils/api"
import SyllabusCard from "@/components/syllabus/syllabus-card"

// Layout
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export const metadata = {
  title: "IT Entrance Exam Syllabus Nepal",
  description:
    "Browse entrance exam syllabi for BSc CSIT, BIT, BBA and more. Subject-wise marks, exam pattern, and university details — all in one place.",
  keywords: [
    "IT entrance exam syllabus Nepal",
    "BSc CSIT syllabus",
    "BIT entrance syllabus",
    "entrance exam pattern Nepal",
    "subject-wise marks entrance exam",
    "College Info Nepal syllabus",
  ],
  alternates: {
    canonical: "https://entrance.collegeinfonepal.com/syllabus",
  },
  openGraph: {
    title: "IT Entrance Exam Syllabus Nepal",
    description:
      "Browse entrance exam syllabi for BSc CSIT, BIT, BBA and more — subject-wise marks and exam patterns.",
    url: "https://entrance.collegeinfonepal.com/syllabus",
    siteName: "Entrance Prep by College Info Nepal",
    images: [
      {
        url: "/assets/social.jpg",
        width: 1200,
        height: 630,
        alt: "IT Entrance Exam Syllabus – College Info Nepal",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Entrance Exam Syllabus Nepal",
    description:
      "Browse entrance exam syllabi for BSc CSIT, BIT, BBA and more.",
    images: ["/assets/social.jpg"],
  },
}

export default async function SyllabusListPage() {
  const syllabi = await fetchSyllabusList()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "IT Entrance Exam Syllabus Nepal",
    description:
      "Browse entrance exam syllabi for BSc CSIT, BIT, BBA and more.",
    url: "https://entrance.collegeinfonepal.com/syllabus",
    numberOfItems: syllabi?.length ?? 0,
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
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">IT Entrance Exam Syllabus</h1>
          <p className="text-muted-foreground mt-2">
            Explore entrance exam syllabus with detailed exam structure and
            subject-wise marks.
          </p>
        </div>

        {/* List */}
        {syllabi && syllabi.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {syllabi.map((syllabus) => (
              <SyllabusCard
                key={syllabus.id}
                syllabus={syllabus}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-20">
            No syllabus found.
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}
