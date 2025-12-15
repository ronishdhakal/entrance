// API base URL from environment variable (includes /api/)
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

// Helper to build full API endpoint
export const getApiUrl = (endpoint) => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint
  return `${API_URL}/${cleanEndpoint}`
}
