export const dynamic = "force-dynamic"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ExamHeader from "@/components/exam/ExamHeader"
import ExamTopDescription from "@/components/exam/ExamTopDescription"
import ExamDetails from "@/components/exam/ExamDetails"
import ExamInfo from "@/components/exam/ExamInfo"
import { fetchExamBySlug } from "@/utils/api"

export default async function ExamDetailPage(props) {
  // ✅ params is a Promise in Next.js 15/16
  const { slug } = await props.params

  const exam = await fetchExamBySlug(slug)

  if (!exam) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center bg-background">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-2">Exam Not Found</h1>
            <p className="text-muted-foreground">
              The exam you are looking for does not exist or is unavailable.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-background">
        {/* Header */}
        <ExamHeader exam={exam} />

        {/* Content */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ExamTopDescription description={exam.top_description} />
              <ExamDetails detail={exam.detail} />
            </div>
            <div className="lg:col-span-1">
              <ExamInfo exam={exam} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
