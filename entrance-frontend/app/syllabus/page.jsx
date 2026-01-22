import { fetchSyllabusList } from "@/utils/api"
import SyllabusCard from "@/components/syllabus/syllabus-card"

// Layout
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export const metadata = {
  title: "IT Entrance Exaxm Syllabus | Entrance College Info",
  description:
    "Browse entrance exam syllabus including subject-wise marks, exam pattern, and university details.",
}

export default async function SyllabusListPage() {
  const syllabi = await fetchSyllabusList()

  return (
    <>
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
