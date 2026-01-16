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

  return {
    title: `${syllabus.title} | Entrance Syllabus`,
    description: syllabus.university,
  }
}

/* =========================
   PAGE
========================= */
export default async function SyllabusDetailPage({ params }) {
  const { slug } = await params
  const syllabus = await fetchSyllabusBySlug(slug)

  if (!syllabus) {
    return (
      <>
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Syllabus not found</h1>
          <p className="text-muted-foreground mt-2">
            The requested syllabus does not exist.
          </p>
        </div>

        <Footer />
      </>
    )
  }

  return (
    <>
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
