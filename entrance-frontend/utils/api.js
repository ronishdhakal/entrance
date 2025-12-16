import { API_URL } from "@/lib/api-config"
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"
// Fetch all programs
export const fetchPrograms = async () => {
  try {
    const response = await fetch(`${API_URL}/programs/`)
    if (response.ok) {
      return await response.json()
    }
    throw new Error("Failed to fetch programs")
  } catch (error) {
    console.error("Error fetching programs:", error)
    return []
  }
}

// Fetch program by slug
export const fetchProgramBySlug = async (slug) => {
  try {
    const response = await fetch(`${API_URL}/programs/${slug}/`)
    if (response.ok) {
      return await response.json()
    }
    throw new Error("Failed to fetch program")
  } catch (error) {
    console.error("Error fetching program:", error)
    return null
  }
}

// Fetch mock tests for a specific program
export const fetchMockTests = async (programSlug) => {
  try {
    const response = await fetch(`${API_URL}/mocktests/?program=${programSlug}`)
    if (response.ok) {
      return await response.json()
    }
    throw new Error("Failed to fetch mock tests")
  } catch (error) {
    console.error("Error fetching mock tests:", error)
    return []
  }
}

// Fetch mock test detail
export const fetchMockTestDetail = async (slug) => {
  try {
    const response = await fetch(`${API_URL}/mocktests/${slug}/`)
    if (response.ok) {
      return await response.json()
    }
    throw new Error("Failed to fetch mock test detail")
  } catch (error) {
    console.error("Error fetching mock test detail:", error)
    return null
  }
}

// Start a new attempt (requires authentication)
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

    if (response.ok) {
      return await response.json()
    }
    throw new Error("Failed to start attempt")
  } catch (error) {
    console.error("Error starting attempt:", error)
    return null
  }
}

// Fetch attempt history (requires authentication)
export const fetchAttemptHistory = async (token) => {
  try {
    const response = await fetch(`${API_URL}/attempts/history/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.ok) {
      return await response.json()
    }
    throw new Error("Failed to fetch attempt history")
  } catch (error) {
    console.error("Error fetching attempt history:", error)
    return []
  }
}

// Fetch questions for an attempt (requires authentication)
export const fetchAttemptQuestions = async (attemptId, token) => {
  try {
    const response = await fetch(`${API_URL}/attempts/${attemptId}/questions/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.ok) {
      return await response.json()
    }
    throw new Error("Failed to fetch attempt questions")
  } catch (error) {
    console.error("Error fetching attempt questions:", error)
    return null
  }
}

// Submit answer (requires authentication)
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

    if (response.ok) {
      return await response.json()
    }
    throw new Error("Failed to submit answer")
  } catch (error) {
    console.error("Error submitting answer:", error)
    return null
  }
}

// Submit exam (requires authentication)
export const submitExam = async (attemptId, token) => {
  try {
    const response = await fetch(`${API_URL}/attempts/${attemptId}/submit/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.ok) {
      return await response.json()
    }
    throw new Error("Failed to submit exam")
  } catch (error) {
    console.error("Error submitting exam:", error)
    return null
  }
}

// Fetch attempt result (requires authentication)
export const fetchAttemptResult = async (attemptId, token) => {
  try {
    const response = await fetch(`${API_URL}/attempts/${attemptId}/result/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.ok) {
      return await response.json()
    }
    throw new Error("Failed to fetch attempt result")
  } catch (error) {
    console.error("Error fetching attempt result:", error)
    return null
  }
}

// Fetch mock tests by program
export const fetchMockTestsByProgram = async (programSlug) => {
  try {
    const response = await fetch(`${API_URL}/mocktests/?program=${programSlug}`)
    if (response.ok) {
      return await response.json()
    }
    throw new Error("Failed to fetch mock tests")
  } catch (error) {
    console.error("Error fetching mock tests:", error)
    return []
  }
}

/**
 * Request password reset OTP
 * @param {string} email
 */
export async function requestPasswordReset(email) {
  const response = await fetch(`${API_BASE_URL}/auth/forgot-password/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || "Failed to request password reset")
  }

  return data
}

/**
 * Verify reset OTP
 * @param {string} email
 * @param {string} otp
 */
export async function verifyResetOTP(email, otp) {
  const response = await fetch(`${API_BASE_URL}/auth/verify-reset-otp/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, otp }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || "Invalid or expired OTP")
  }

  return data
}

/**
 * Reset password using OTP
 * @param {string} email
 * @param {string} otp
 * @param {string} newPassword
 */
export async function resetPassword(email, otp, newPassword) {
  const response = await fetch(`${API_BASE_URL}/auth/reset-password/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      otp,
      new_password: newPassword,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || "Failed to reset password")
  }

  return data
}

