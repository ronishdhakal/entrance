import { notFound } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import CourseHeader from "@/components/college/course-header"
import CourseFilter from "@/components/college/course-filter"
import CollegeGrid from "@/components/college/college-grid"
import BottomDescription from "@/components/college/bottom-description"
import { fetchCourses, fetchCourseBySlug, fetchColleges } from "@/utils/api"

export async function generateMetadata({ params }) {
  // ✅ FIX: await params (required in Next 16 + Turbopack)
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

  const url = `https://entrance.collegeinfonepal.com/college/${slug}`

  return {
    title,
    description,
    keywords: [
      `${course.title} colleges Nepal`,
      `best ${course.abbreviation || course.title} colleges`,
      `${course.abbreviation || course.title} admission Nepal`,
      `${course.title} entrance exam`,
      "IT colleges Nepal",
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

export default async function CourseCollegePage({ params }) {
  // ✅ FIX: await params (required in Next 16 + Turbopack)
  const { slug } = await params

  const [course, courses, rawColleges] = await Promise.all([
    fetchCourseBySlug(slug),
    fetchCourses(),
    fetchColleges({ course: slug }),
  ])

  if (!course) {
    notFound()
  }

  // ✅ Normalize colleges
  const colleges = Array.isArray(rawColleges)
    ? rawColleges
    : rawColleges?.results || []

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Best ${course.abbreviation || course.title} Colleges in Nepal`,
    description: `Find the best colleges offering ${course.title} in Nepal.`,
    url: `https://entrance.collegeinfonepal.com/college/${slug}`,
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

                {/* ✅ THIS is what enables course auto-selection */}
                <CollegeGrid
                  colleges={colleges}
                  courseId={course.id}
                />

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
