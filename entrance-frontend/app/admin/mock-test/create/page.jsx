"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getCachedUser } from "@/lib/auth"
import { fetchPrograms } from "@/utils/api"
import { createMockTest } from "@/utils/admin-api"
import MockTestForm from "@/components/admin/MockTestForm"

export default function CreateMockTestPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const currentUser = getCachedUser()
    if (!currentUser || !currentUser.is_staff) {
      router.push("/login")
      return
    }
    setUser(currentUser)
    loadPrograms()
  }, [])

  const loadPrograms = async () => {
    try {
      const data = await fetchPrograms()
      setPrograms(data)
    } catch (error) {
      console.error("Error loading programs:", error)
    }
  }

  const handleSubmit = async (formData) => {
    setLoading(true)
    try {
      await createMockTest(formData)
      alert("Mock test created successfully!")
      router.push("/admin")
    } catch (error) {
      console.error("Error creating mock test:", error)
      alert("Failed to create mock test. Please check your data.")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    router.push("/admin")
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create Mock Test</h1>
              <p className="text-sm text-gray-600">Add a new mock test with sections and questions</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MockTestForm programs={programs} onSubmit={handleSubmit} onCancel={handleCancel} isLoading={loading} />
      </div>
    </div>
  )
}
