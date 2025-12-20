import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import CourseFilter from "@/components/college/course-filter"
import CollegeGrid from "@/components/college/college-grid"
// import CollegeStats from "@/components/college/college-stats"
import { fetchColleges, fetchCourses } from "@/utils/api"

export const metadata = {
  title: "Colleges in Nepal | Find the Best College for Your Future",
  description:
    "Explore the comprehensive list of colleges in Nepal. Find detailed information about courses, facilities, and admissions for top colleges across Nepal.",
  keywords:
    "colleges in Nepal, best colleges Nepal, Nepal education, college admissions Nepal",
  openGraph: {
    title: "Colleges in Nepal | Find the Best College for Your Future",
    description:
      "Explore the comprehensive list of colleges in Nepal. Find detailed information about courses, facilities, and admissions.",
    type: "website",
  },
}

export default async function CollegePage() {
  const [colleges, courses] = await Promise.all([
    fetchColleges(),
    fetchCourses(),
  ])

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        {/* Header (clean, not flashy) */}
        <section className="pt-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1600px] mx-auto">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-3">
              Top Colleges in Nepal
            </h1>
            <p className="text-gray-600 max-w-3xl">
              Browse colleges across Nepal and explore programs, facilities, and
              academic opportunities.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-12 px-4 sm:px-6 lg:px-8 mt-8">
          <div className="max-w-[1600px] mx-auto">
            {/* <CollegeStats totalColleges={colleges.length} /> */}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
              {/* Sidebar Filter */}
              <aside className="lg:col-span-3 xl:col-span-2">
                <CourseFilter courses={courses} selectedCourse={null} />
              </aside>

              {/* College Grid */}
              <div className="lg:col-span-9 xl:col-span-10">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    All Colleges ({colleges.length})
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Browse through our comprehensive list of colleges
                  </p>
                </div>

                <CollegeGrid colleges={colleges} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
