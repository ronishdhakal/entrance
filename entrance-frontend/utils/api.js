import { API_URL } from "@/lib/api-config"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"

/* =========================
   PROGRAMS
========================= */

export const fetchPrograms = async () => {
  try {
    const response = await fetch(`${API_URL}/programs/`, {
      cache: "no-store",
    })
    if (response.ok) return await response.json()
    throw new Error("Failed to fetch programs")
  } catch (error) {
    console.error("Error fetching programs:", error)
    return []
  }
}

export const fetchProgramBySlug = async (slug) => {
  if (!slug) return null

  try {
    const response = await fetch(`${API_URL}/programs/${slug}/`, {
      cache: "no-store",
    })
    if (response.ok) return await response.json()
    throw new Error("Failed to fetch program")
  } catch (error) {
    console.error("Error fetching program:", error)
    return null
  }
}

/* =========================
   MOCK TESTS
========================= */

export const fetchMockTests = async (programSlug) => {
  if (!programSlug) return []

  try {
    const response = await fetch(`${API_URL}/mocktests/?program=${programSlug}`, { cache: "no-store" })
    if (response.ok) return await response.json()
    throw new Error("Failed to fetch mock tests")
  } catch (error) {
    console.error("Error fetching mock tests:", error)
    return []
  }
}

export const fetchMockTestDetail = async (slug) => {
  if (!slug) return null

  try {
    const response = await fetch(`${API_URL}/mocktests/${slug}/`, {
      cache: "no-store",
    })
    if (response.ok) return await response.json()
    throw new Error("Failed to fetch mock test detail")
  } catch (error) {
    console.error("Error fetching mock test detail:", error)
    return null
  }
}

/* =========================
   ATTEMPTS (AUTH)
========================= */

export const startAttempt = async (mockTestId, selectedSections, token) => {
  try {
    const response = await fetch(`${API_URL}/attempts/start/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        mock_test_id: mockTestId,
        selected_optional_sections: selectedSections,
      }),
    })
    if (response.ok) return await response.json()
    throw new Error("Failed to start attempt")
  } catch (error) {
    console.error("Error starting attempt:", error)
    return null
  }
}

export const fetchAttemptHistory = async (token) => {
  try {
    const response = await fetch(`${API_URL}/attempts/history/`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })
    if (response.ok) return await response.json()
    throw new Error("Failed to fetch attempt history")
  } catch (error) {
    console.error("Error fetching attempt history:", error)
    return []
  }
}

export const fetchAttemptQuestions = async (attemptId, token) => {
  if (!attemptId) return null

  try {
    const response = await fetch(`${API_URL}/attempts/${attemptId}/questions/`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })
    if (response.ok) return await response.json()
    throw new Error("Failed to fetch attempt questions")
  } catch (error) {
    console.error("Error fetching attempt questions:", error)
    return null
  }
}

export const submitAnswer = async (attemptId, questionId, optionId, token) => {
  try {
    const response = await fetch(`${API_URL}/attempts/${attemptId}/answer/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        question_id: questionId,
        option_id: optionId,
      }),
    })
    if (response.ok) return await response.json()
    throw new Error("Failed to submit answer")
  } catch (error) {
    console.error("Error submitting answer:", error)
    return null
  }
}

export const submitExam = async (attemptId, token) => {
  try {
    const response = await fetch(`${API_URL}/attempts/${attemptId}/submit/`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
    if (response.ok) return await response.json()
    throw new Error("Failed to submit exam")
  } catch (error) {
    console.error("Error submitting exam:", error)
    return null
  }
}

export const fetchAttemptResult = async (attemptId, token) => {
  if (!attemptId) return null

  try {
    const response = await fetch(`${API_URL}/attempts/${attemptId}/result/`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })
    if (response.ok) return await response.json()
    throw new Error("Failed to fetch attempt result")
  } catch (error) {
    console.error("Error fetching attempt result:", error)
    return null
  }
}

/* =========================
   PASSWORD RESET
========================= */

export async function requestPasswordReset(email) {
  const response = await fetch(`${API_BASE_URL}/auth/forgot-password/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  })

  const data = await response.json()
  if (!response.ok) throw new Error(data.detail || "Failed to request password reset")
  return data
}

export async function verifyResetOTP(email, otp) {
  const response = await fetch(`${API_BASE_URL}/auth/verify-reset-otp/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  })

  const data = await response.json()
  if (!response.ok) throw new Error(data.detail || "Invalid or expired OTP")
  return data
}

export async function resetPassword(email, otp, newPassword) {
  const response = await fetch(`${API_BASE_URL}/auth/reset-password/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      otp,
      new_password: newPassword,
    }),
  })

  const data = await response.json()
  if (!response.ok) throw new Error(data.detail || "Failed to reset password")
  return data
}

/* =========================
   EXAMS
========================= */

export const fetchExams = async () => {
  try {
    const response = await fetch(`${API_URL}/exam/`, {
      cache: "no-store",
    })
    if (response.ok) return await response.json()
    throw new Error("Failed to fetch exams")
  } catch (error) {
    console.error("Error fetching exams:", error)
    return []
  }
}

export const fetchExamBySlug = async (slug) => {
  if (!slug) return null

  try {
    const response = await fetch(`${API_URL}/exam/${slug}/`, {
      cache: "no-store",
    })
    if (response.ok) return await response.json()
    throw new Error("Failed to fetch exam")
  } catch (error) {
    console.error("Error fetching exam:", error)
    return null
  }
}

/* =========================
   NEWS
========================= */

export const fetchNews = async () => {
  try {
    const response = await fetch(`${API_URL}/news/`, {
      cache: "no-store",
    })
    if (response.ok) return await response.json()
    throw new Error("Failed to fetch news")
  } catch (error) {
    console.error("Error fetching news:", error)
    return []
  }
}

export const fetchNewsBySlug = async (slug) => {
  if (!slug) return null

  try {
    const response = await fetch(`${API_URL}/news/${slug}/`, {
      cache: "no-store",
    })
    if (response.ok) return await response.json()
    throw new Error("Failed to fetch news article")
  } catch (error) {
    console.error("Error fetching news article:", error)
    return null
  }
}

/* =========================
   BOOKS
========================= */

const normalizeBook = (book) => {
  if (!book) return null

  return {
    ...book,
    images: (book.images || []).map((img) => ({
      ...img,
      image: img.image?.startsWith("http")
        ? img.image
        : `${MEDIA_URL}${img.image}`,
    })),
  }
}

export const fetchBooks = async () => {
  try {
    const response = await fetch(`${API_URL}/books/`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch books")
    }

    const data = await response.json()
    return data.map(normalizeBook)
  } catch (error) {
    console.error("Error fetching books:", error)
    return []
  }
}

export const fetchBookBySlug = async (slug) => {
  if (!slug) return null

  try {
    const response = await fetch(`${API_URL}/books/${slug}/`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch book")
    }

    const data = await response.json()
    return normalizeBook(data)
  } catch (error) {
    console.error("Error fetching book:", error)
    return null
  }
}