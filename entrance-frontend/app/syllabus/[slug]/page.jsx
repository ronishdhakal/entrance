import { notFound } from "next/navigation"
import { fetchSyllabusBySlug } from "@/utils/api"

// Layout components
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

// Syllabus components
import SyllabusHeader from "@/components/syllabus/syllabus-header"
import SyllabusInfo from "@/components/syllabus/syllabus-info"
import SyllabusTopDescription from "@/components/syllabus/syllabus-top-description"
import SyllabusMainDescription from "@/components/syllabus/syllabus-main-description"
import SyllabusSubjects from "@/components/syllabus/syllabus-subjects"

/* =========================
   SEO METADATA
========================= */
export async function generateMetadata({ params }) {
  const { slug } = await params
  const syllabus = await fetchSyllabusBySlug(slug)

  if (!syllabus) {
    return {
      title: "Syllabus Not Found",
      robots: "noindex",
    }
  }

  const title = `${syllabus.title} Entrance Exam Syllabus`
  const description =
    `Complete syllabus for ${syllabus.title} entrance exam` +
    (syllabus.university ? ` – ${syllabus.university}.` : ".") +
    " Subject-wise marks, exam pattern, and preparation guide."
  const url = `https://entrance.collegeinfonepal.com/syllabus/${slug}`

  return {
    title,
    description,
    keywords: [
      `${syllabus.title} syllabus`,
      `${syllabus.title} entrance exam syllabus`,
      `${syllabus.title} subject-wise marks`,
      `${syllabus.title} exam pattern`,
      "entrance exam syllabus Nepal",
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
      images: [
        {
          url: "/assets/social.jpg",
          width: 1200,
          height: 630,
          alt: `${title} – College Info Nepal`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/assets/social.jpg"],
    },
  }
}

/* =========================
   PAGE
========================= */
export default async function SyllabusDetailPage({ params }) {
  const { slug } = await params
  const syllabus = await fetchSyllabusBySlug(slug)

  if (!syllabus) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${syllabus.title} Entrance Exam Syllabus`,
    description: `Complete syllabus for ${syllabus.title} entrance exam including subject-wise marks and exam pattern.`,
    url: `https://entrance.collegeinfonepal.com/syllabus/${slug}`,
    publisher: {
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

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-5">
        {/* Header (contains Ask a Question button now) */}
        <SyllabusHeader syllabus={syllabus} />

        {/* Top Description */}
        <SyllabusTopDescription html={syllabus.top_description} />

        {/* Exam Info */}
        <SyllabusInfo syllabus={syllabus} />

        {/* Subjects */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {syllabus.title} Subject-Wise Marks Distribution
          </h2>
          <SyllabusSubjects subjects={syllabus.subjects} />
        </div>

        {/* Main Description */}
        <SyllabusMainDescription html={syllabus.main_description} />
      </div>

      <Footer />
    </>
  )
}
