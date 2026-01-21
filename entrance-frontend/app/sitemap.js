import {
  fetchCourses,
  fetchNews,
  fetchExams,
  fetchBooks,
  fetchPrograms,
  fetchSyllabusList,
  fetchClasses,
} from "@/utils/api"

export const dynamic = "force-dynamic"

export default async function sitemap() {
  const baseUrl = "https://entrance.collegeinfonepal.com"

  let courses = []
  let news = []
  let exams = []
  let books = []
  let programs = []
  let syllabus = []
  let classes = []

  try {
    ;[
      courses,
      news,
      exams,
      books,
      programs,
      syllabus,
      classes,
    ] = await Promise.all([
      fetchCourses(),
      fetchNews(),
      fetchExams(),
      fetchBooks(),
      fetchPrograms(),
      fetchSyllabusList(),
      fetchClasses(),
    ])
  } catch (error) {
    // ✅ Sitemap must NEVER crash
    console.error("Sitemap fetch error:", error)
  }

  /* ========================
     Static Pages
  ======================== */
  const staticPages = [
    "",
    "/college",
    "/news",
    "/exam",
    "/book",
    "/program",
    "/syllabus",
    "/class",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  /* ========================
     Course → Colleges Pages
     /college/[course-slug]
  ======================== */
  const coursePages = (Array.isArray(courses) ? courses : []).map((course) => ({
    url: `${baseUrl}/college/${course.slug}`,
    lastModified: new Date(course.updated_at || course.created_at || Date.now()),
    changeFrequency: "weekly",
    priority: 0.9,
  }))

  /* ========================
     News Pages
  ======================== */
  const newsPages = (Array.isArray(news) ? news : []).map((item) => ({
    url: `${baseUrl}/news/${item.slug}`,
    lastModified: new Date(item.updated_at || item.created_at || Date.now()),
    changeFrequency: "weekly",
    priority: 0.9,
  }))

  /* ========================
     Exam Pages
  ======================== */
  const examPages = (Array.isArray(exams) ? exams : []).map((item) => ({
    url: `${baseUrl}/exam/${item.slug}`,
    lastModified: new Date(item.updated_at || item.created_at || Date.now()),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  /* ========================
     Book Pages
  ======================== */
  const bookPages = (Array.isArray(books) ? books : []).map((item) => ({
    url: `${baseUrl}/book/${item.slug}`,
    lastModified: new Date(item.updated_at || item.created_at || Date.now()),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  /* ========================
     Program Pages
  ======================== */
  const programPages = (Array.isArray(programs) ? programs : []).map((item) => ({
    url: `${baseUrl}/program/${item.slug}`,
    lastModified: new Date(item.updated_at || item.created_at || Date.now()),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  /* ========================
     Syllabus Pages
     /syllabus/[slug]
  ======================== */
  const syllabusPages = (Array.isArray(syllabus) ? syllabus : []).map((item) => ({
    url: `${baseUrl}/syllabus/${item.slug}`,
    lastModified: new Date(item.updated_at || item.created_at || Date.now()),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  /* ========================
     Classes Pages
     /class/[slug]
  ======================== */
  const classPages = (Array.isArray(classes) ? classes : []).map((item) => ({
    url: `${baseUrl}/class/${item.slug}`,
    lastModified: new Date(item.updated_at || item.created_at || Date.now()),
    changeFrequency: "weekly",
    priority: 0.75,
  }))

  return [
    ...staticPages,
    ...coursePages,
    ...newsPages,
    ...examPages,
    ...bookPages,
    ...programPages,
    ...syllabusPages,
    ...classPages,
  ]
}
