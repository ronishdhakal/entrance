import { API_URL } from "@/lib/api-config"
import { fetchWithAuth } from "@/lib/auth"

// ===========================
// MOCK TEST CRUD
// ===========================

export const fetchAllMockTests = async (filters = {}) => {
  try {
    const params = new URLSearchParams()
    if (filters.program) params.append("program", filters.program)
    if (filters.search) params.append("search", filters.search)
    if (filters.is_published !== undefined) params.append("is_published", filters.is_published)

    const url = `${API_URL}/mocktests/admin/mocktests/${params.toString() ? "?" + params.toString() : ""}`
    console.log("[v0] Fetching mock tests from:", url)

    const response = await fetchWithAuth(url)

    if (response.ok) {
      return await response.json()
    }
    throw new Error("Failed to fetch mock tests")
  } catch (error) {
    console.error("Error fetching mock tests:", error)
    throw error
  }
}

export const fetchMockTestById = async (id) => {
  try {
    const url = `${API_URL}/mocktests/admin/mocktests/${id}/`
    console.log("[v0] Fetching mock test from:", url)

    const response = await fetchWithAuth(url)
    if (response.ok) {
      return await response.json()
    }
    throw new Error("Failed to fetch mock test")
  } catch (error) {
    console.error("Error fetching mock test:", error)
    throw error
  }
}

export const createMockTest = async (data) => {
  try {
    const url = `${API_URL}/mocktests/admin/mocktests/`
    console.log("[v0] Creating mock test at:", url)
    console.log("[v0] Data:", JSON.stringify(data, null, 2))

    const response = await fetchWithAuth(url, {
      method: "POST",
      body: JSON.stringify(data),
    })

    if (response.ok) {
      return await response.json()
    }

    const errorData = await response.json()
    console.error("[v0] Create error:", errorData)
    throw new Error(JSON.stringify(errorData))
  } catch (error) {
    console.error("Error creating mock test:", error)
    throw error
  }
}

export const updateMockTest = async (id, data) => {
  try {
    const url = `${API_URL}/mocktests/admin/mocktests/${id}/`
    console.log("[v0] Updating mock test at:", url)

    const response = await fetchWithAuth(url, {
      method: "PUT",
      body: JSON.stringify(data),
    })

    if (response.ok) {
      return await response.json()
    }

    const errorData = await response.json()
    console.error("[v0] Update error:", errorData)
    throw new Error(JSON.stringify(errorData))
  } catch (error) {
    console.error("Error updating mock test:", error)
    throw error
  }
}

export const deleteMockTest = async (id) => {
  try {
    const url = `${API_URL}/mocktests/admin/mocktests/${id}/`
    console.log("[v0] Deleting mock test at:", url)

    const response = await fetchWithAuth(url, {
      method: "DELETE",
    })

    if (response.ok || response.status === 204) {
      return true
    }
    throw new Error("Failed to delete mock test")
  } catch (error) {
    console.error("Error deleting mock test:", error)
    throw error
  }
}

export const duplicateMockTest = async (id) => {
  try {
    const url = `${API_URL}/mocktests/admin/mocktests/${id}/duplicate/`
    console.log("[v0] Duplicating mock test at:", url)

    const response = await fetchWithAuth(url, {
      method: "POST",
    })

    if (response.ok) {
      return await response.json()
    }
    throw new Error("Failed to duplicate mock test")
  } catch (error) {
    console.error("Error duplicating mock test:", error)
    throw error
  }
}

// ===========================
// STATS
// ===========================

export const fetchMockTestStats = async () => {
  try {
    const url = `${API_URL}/mocktests/admin/mocktests/stats/`
    console.log("[v0] Fetching stats from:", url)

    const response = await fetchWithAuth(url)
    if (response.ok) {
      return await response.json()
    }
    throw new Error("Failed to fetch stats")
  } catch (error) {
    console.error("Error fetching stats:", error)
    throw error
  }
}

// ===========================
// PROGRAMS (NEW)
// ===========================

export const fetchPrograms = async () => {
  try {
    const url = `${API_URL}/programs/`
    const response = await fetchWithAuth(url)
    if (response.ok) return await response.json()
    throw new Error("Failed to fetch programs")
  } catch (error) {
    console.error("Error fetching programs:", error)
    return []
  }
}

// ===========================
// QUESTION BANK CRUD
// ===========================

export const fetchProgramHierarchy = async (programId) => {
  try {
    const url = `${API_URL}/question/hierarchy/${programId}/`
    const response = await fetchWithAuth(url)
    if (response.ok) return await response.json()
    throw new Error("Failed to fetch hierarchy")
  } catch (error) {
    console.error("Error fetching hierarchy:", error)
    throw error
  }
}

export const fetchAllQuestions = async (filters = {}) => {
  try {
    const params = new URLSearchParams()

    // Convert string values to numbers and add to params
    if (filters.program) params.append("program", String(filters.program))
    if (filters.section) params.append("section", String(filters.section))
    if (filters.topic) params.append("topic", String(filters.topic))
    if (filters.sub_topic) params.append("sub_topic", String(filters.sub_topic))

    const url = `${API_URL}/question/questions/${params.toString() ? "?" + params.toString() : ""}`
    console.log("[v0] Fetching questions from:", url)

    const response = await fetchWithAuth(url)
    if (response.ok) {
      const data = await response.json()
      console.log("[v0] Questions fetched:", data)
      return data
    }
    throw new Error("Failed to fetch questions")
  } catch (error) {
    console.error("Error fetching questions:", error)
    return []
  }
}

export const fetchSectionsByProgram = async (programId) => {
  try {
    const url = `${API_URL}/question/sections/?program=${programId}`
    const response = await fetchWithAuth(url)
    if (response.ok) return await response.json()
    return []
  } catch (error) {
    console.error("Error fetching sections:", error)
    return []
  }
}

export const fetchTopicsBySection = async (sectionId) => {
  try {
    const url = `${API_URL}/question/topics/?section=${sectionId}`
    const response = await fetchWithAuth(url)
    if (response.ok) return await response.json()
    return []
  } catch (error) {
    console.error("Error fetching topics:", error)
    return []
  }
}

export const fetchSubTopicsByTopic = async (topicId) => {
  try {
    const url = `${API_URL}/question/subtopics/?topic=${topicId}`
    const response = await fetchWithAuth(url)
    if (response.ok) return await response.json()
    return []
  } catch (error) {
    console.error("Error fetching subtopics:", error)
    return []
  }
}

export const fetchQuestionById = async (id) => {
  try {
    const url = `${API_URL}/question/questions/${id}/`
    const response = await fetchWithAuth(url)
    if (response.ok) return await response.json()
    throw new Error("Failed to fetch question")
  } catch (error) {
    console.error("Error fetching question:", error)
    throw error
  }
}

export const createQuestion = async (data) => {
  try {
    const url = `${API_URL}/question/questions/`
    const response = await fetchWithAuth(url, {
      method: "POST",
      body: JSON.stringify(data),
    })
    if (response.ok) return await response.json()
    const errorData = await response.json()
    throw new Error(JSON.stringify(errorData))
  } catch (error) {
    console.error("Error creating question:", error)
    throw error
  }
}

export const updateQuestion = async (id, data) => {
  try {
    const url = `${API_URL}/question/questions/${id}/`
    const response = await fetchWithAuth(url, {
      method: "PUT",
      body: JSON.stringify(data),
    })
    if (response.ok) return await response.json()
    const errorData = await response.json()
    throw new Error(JSON.stringify(errorData))
  } catch (error) {
    console.error("Error updating question:", error)
    throw error
  }
}

export const deleteQuestion = async (id) => {
  try {
    const url = `${API_URL}/question/questions/${id}/`
    const response = await fetchWithAuth(url, {
      method: "DELETE",
    })
    return response.ok || response.status === 204
  } catch (error) {
    console.error("Error deleting question:", error)
    throw error
  }
}

export const createSection = async (data) => {
  const response = await fetchWithAuth(`${API_URL}/question/sections/`, {
    method: "POST",
    body: JSON.stringify(data),
  })
  if (response.ok) return await response.json()
  throw new Error("Failed to create section")
}

export const createTopic = async (data) => {
  const response = await fetchWithAuth(`${API_URL}/question/topics/`, {
    method: "POST",
    body: JSON.stringify(data),
  })
  if (response.ok) return await response.json()
  throw new Error("Failed to create topic")
}

export const createSubTopic = async (data) => {
  const response = await fetchWithAuth(`${API_URL}/question/subtopics/`, {
    method: "POST",
    body: JSON.stringify(data),
  })
  if (response.ok) return await response.json()
  throw new Error("Failed to create sub-topic")
}

export const updateSection = async (id, data) => {
  const response = await fetchWithAuth(`${API_URL}/question/sections/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
  if (response.ok) return await response.json()
  throw new Error("Failed to update section")
}

export const updateTopic = async (id, data) => {
  const response = await fetchWithAuth(`${API_URL}/question/topics/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
  if (response.ok) return await response.json()
  throw new Error("Failed to update topic")
}

export const updateSubTopic = async (id, data) => {
  const response = await fetchWithAuth(`${API_URL}/question/subtopics/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
  if (response.ok) return await response.json()
  throw new Error("Failed to update sub-topic")
}

export const deleteSection = async (id) => {
  const response = await fetchWithAuth(`${API_URL}/question/sections/${id}/`, {
    method: "DELETE",
  })
  return response.ok || response.status === 204
}

export const deleteTopic = async (id) => {
  const response = await fetchWithAuth(`${API_URL}/question/topics/${id}/`, {
    method: "DELETE",
  })
  return response.ok || response.status === 204
}

export const deleteSubTopic = async (id) => {
  const response = await fetchWithAuth(`${API_URL}/question/subtopics/${id}/`, {
    method: "DELETE",
  })
  return response.ok || response.status === 204
}
