import { notFound } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import CourseHeader from "@/components/college/course-header"
import CourseFilter from "@/components/college/course-filter"
import CollegeGrid from "@/components/college/college-grid"
import BottomDescription from "@/components/college/bottom-description"
import { fetchCourses, fetchCourseBySlug, fetchColleges } from "@/utils/api"

export async function generateMetadata({ params }) {
  const { slug } = await params
  const course = await fetchCourseBySlug(slug)

  if (!course) {
    return {
      title: "Course Not Found",
    }
  }

  const title = `Best ${course.abbreviation || course.title} Colleges in Nepal`
  const description = course.top_description
    ? course.top_description.replace(/<[^>]*>/g, "").substring(0, 160)
    : `Find the best colleges offering ${course.title} in Nepal.`

  return {
    title,
    description,
    keywords: `${course.title} colleges Nepal, ${course.abbreviation} Nepal`,
    openGraph: {
      title,
      description,
      type: "website",
    },
  }
}

export default async function CourseCollegePage({ params }) {
  const { slug } = await params

  const [course, courses, colleges] = await Promise.all([
    fetchCourseBySlug(slug),
    fetchCourses(),
    // ✅ FIXED: pass as object
    fetchColleges({ course: slug }),
  ])

  if (!course) {
    notFound()
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        {/* Course Header */}
        <section className="pt-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1600px] mx-auto">
            <CourseHeader course={course} />
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Sidebar Filter */}
              <aside className="lg:col-span-3 xl:col-span-2">
                <CourseFilter courses={courses} selectedCourse={slug} />
              </aside>

              {/* College Grid */}
              <div className="lg:col-span-9 xl:col-span-10">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Top {course.abbreviation || course.title} Colleges in Nepal ({colleges.length})
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Colleges offering {course.title} programs in Nepal
                  </p>
                </div>

                <CollegeGrid colleges={colleges} />

                {/* Bottom Description */}
                {course.bottom_description && (
                  <BottomDescription content={course.bottom_description} />
                )}
              </div>
              
            </div>

            
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
