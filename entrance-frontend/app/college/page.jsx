import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import CourseFilter from "@/components/college/course-filter"
import CollegeListWithPagination from "@/components/college/CollegeListWithPagination"
import { fetchColleges, fetchCourses } from "@/utils/api"

export const metadata = {
  title: "Top IT Colleges in Nepal",
  description:
    "Explore the best IT colleges in Nepal. Compare courses, universities, and admissions across hundreds of colleges affiliated with TU, PU, and other institutions.",
  keywords: [
    "IT colleges in Nepal",
    "best IT colleges Nepal",
    "BSc CSIT colleges",
    "BIT colleges Nepal",
    "BCA colleges Nepal",
    "college admissions Nepal",
    "tribhuvan university IT colleges",
    "pokhara university IT colleges",
  ],
  alternates: {
    canonical: "https://entrance.collegeinfonepal.com/college",
  },
  openGraph: {
    title: "Top IT Colleges in Nepal",
    description:
      "Explore the best IT colleges in Nepal. Compare courses, universities, and admissions across hundreds of colleges.",
    url: "https://entrance.collegeinfonepal.com/college",
    siteName: "Entrance Prep by College Info Nepal",
    images: [
      {
        url: "/assets/social.jpg",
        width: 1200,
        height: 630,
        alt: "Top IT Colleges in Nepal – College Info Nepal",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top IT Colleges in Nepal",
    description:
      "Explore the best IT colleges in Nepal. Compare courses, universities, and admissions.",
    images: ["/assets/social.jpg"],
  },
}

export default async function CollegePage() {
  const [colleges, courses] = await Promise.all([
    fetchColleges(),
    fetchCourses(),
  ])

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Top IT Colleges in Nepal",
    description:
      "A comprehensive list of the best IT colleges in Nepal, covering BSc CSIT, BIT, BCA and more.",
    url: "https://entrance.collegeinfonepal.com/college",
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
        {/* Header aligned with content */}
        <section className="pt-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Empty column to match sidebar width */}
              <div className="hidden lg:block lg:col-span-3 xl:col-span-2" />

              {/* Header content aligned with college grid */}
              <div className="lg:col-span-9 xl:col-span-10">
                <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-3">
                  Top IT Colleges in Nepal
                </h1>
                <p className="text-gray-600 max-w-3xl leading-relaxed">
                  There are hundreds of Information Technology (IT) colleges in Nepal.
                  These colleges are affiliated with universities such as Tribhuvan University,
                  Pokhara University, Far Western University, and other national and international
                  institutions. They offer a wide range of IT-related programs to meet the growing
                  demand for skilled technology professionals. Here, we highlight the best IT
                  colleges in Nepal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-12 px-4 sm:px-6 lg:px-8 mt-8">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
              {/* Sidebar Filter */}
              <aside className="lg:col-span-3 xl:col-span-2">
                <CourseFilter courses={courses} selectedCourse={null} />
              </aside>

              {/* College Grid + Pagination */}
              <div className="lg:col-span-9 xl:col-span-10">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Best IT Colleges in Nepal ({colleges.length})
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Browse through our comprehensive list of leading Information Technology (IT)
                    colleges in Nepal.
                  </p>
                </div>

                <CollegeListWithPagination colleges={colleges} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
