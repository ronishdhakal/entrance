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
