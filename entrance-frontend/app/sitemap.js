import {
  fetchCourses,
  fetchNews,
  fetchExams,
  fetchBooks,
  fetchPrograms,
} from "@/utils/api"

export const dynamic = "force-dynamic"

export default async function sitemap() {
  const baseUrl = "https://entrance.collegeinfonepal.com"

  let courses = []
  let news = []
  let exams = []
  let books = []
  let programs = []

  try {
    ;[courses, news, exams, books, programs] = await Promise.all([
      fetchCourses(),
      fetchNews(),
      fetchExams(),
      fetchBooks(),
      fetchPrograms(),
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
     Program Pages (slug only)
  ======================== */
  const programPages = (Array.isArray(programs) ? programs : []).map((item) => ({
    url: `${baseUrl}/program/${item.slug}`,
    lastModified: new Date(item.updated_at || item.created_at || Date.now()),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [
    ...staticPages,
    ...coursePages,
    ...newsPages,
    ...examPages,
    ...bookPages,
    ...programPages,
  ]
}
