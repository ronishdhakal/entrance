// Authentication utility functions

import { API_URL } from "./api-config"

// ================================
// Token helpers
// ================================

export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token")
  }
  return null
}

export const getRefreshToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("refresh_token")
  }
  return null
}

export const setTokens = (accessToken, refreshToken) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", accessToken)
    localStorage.setItem("refresh_token", refreshToken)
  }
}

export const removeTokens = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("user")
  }
}

export const isAuthenticated = () => {
  return !!getAccessToken()
}

// ================================
// Token refresh
// ================================

export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken()
  if (!refreshToken) return null

  try {
    const response = await fetch(`${API_URL}/auth/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    })

    if (!response.ok) return null

    const data = await response.json()
    localStorage.setItem("access_token", data.access)
    return data.access
  } catch (error) {
    console.error("Token refresh failed:", error)
    return null
  }
}

// ================================
// Authenticated fetch wrapper
// ================================

export const fetchWithAuth = async (url, options = {}) => {
  let accessToken = getAccessToken()

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })

  if (response.status !== 401) {
    return response
  }

  // Attempt token refresh
  accessToken = await refreshAccessToken()
  if (!accessToken) {
    removeTokens()
    if (typeof window !== "undefined") {
      window.location.href = "/login"
    }
    return response
  }

  // Retry request with refreshed token
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })
}

// ================================
// User helpers
// ================================

export const getCurrentUser = async () => {
  try {
    const response = await fetchWithAuth(`${API_URL}/auth/me/`)
    if (!response.ok) return null

    const userData = await response.json()
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(userData))
    }
    return userData
  } catch (error) {
    console.error("Failed to fetch user:", error)
    return null
  }
}

export const getCachedUser = () => {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("user")
    return userData ? JSON.parse(userData) : null
  }
  return null
}

// ================================
// Logout
// ================================

export const logout = () => {
  removeTokens()
  if (typeof window !== "undefined") {
    window.location.href = "/"
  }
}
