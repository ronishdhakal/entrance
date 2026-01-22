export const dynamic = "force-dynamic"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ExamList from "@/components/exam/ExamList"
import { fetchExams } from "@/utils/api"

export const metadata = {
  title: "IT Entrance Exams | College Info Nepal",
  description:
    "Browse all entrance exams for Nepal colleges and universities. Stay updated with exam dates, registration periods, and requirements.",
}

export default async function ExamPage() {
  const exams = await fetchExams()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-10 px-2">
          <div className="max-w-7xl mx-auto text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              IT Entrance Exams in Nepal
            </h1>
            <p className="text-lg text-left text-muted-foreground max-w-2xl mx-auto">
              Stay informed about upcoming entrance exams in Nepal. Find exam dates,
              registration deadlines, and detailed information for colleges and
              universities across Nepal.
            </p>
          </div>
        </section>

        {/* Exams List Section */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  All Entrance Exams
                </h2>
                <p className="text-muted-foreground">
                  {exams.length} {exams.length === 1 ? "exam" : "exams"} available
                </p>
              </div>
            </div>

            <ExamList exams={exams} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
