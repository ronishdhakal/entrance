"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Copy, Trash2 } from "lucide-react"
import { getCachedUser } from "@/lib/auth"
import { fetchPrograms } from "@/utils/api"
import { fetchMockTestById, updateMockTest, deleteMockTest, duplicateMockTest } from "@/utils/admin-api"
import MockTestForm from "@/components/admin/MockTestForm"

export default function EditMockTestPage() {
  const router = useRouter()
  const params = useParams()
  const [user, setUser] = useState(null)
  const [programs, setPrograms] = useState([])
  const [mockTest, setMockTest] = useState(null)
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCachedUser()
    if (!currentUser || (!currentUser.is_staff && !currentUser.is_superuser)) {
      router.push("/login")
      return
    }
    setUser(currentUser)
    loadData()
  }, [params.id])

  const loadData = async () => {
    try {
      console.log("[v0] Loading mock test with id:", params.id)
      const [programsData, mockTestData] = await Promise.all([fetchPrograms(), fetchMockTestById(params.id)])
      console.log("[v0] Loaded mock test:", mockTestData)
      setPrograms(programsData)
      setMockTest(mockTestData)
    } catch (error) {
      console.error("Error loading data:", error)
      alert("Failed to load mock test")
      router.push("/admin")
    } finally {
      setPageLoading(false)
    }
  }

  const handleSubmit = async (formData) => {
    setLoading(true)
    try {
      console.log("[v0] Updating mock test with id:", params.id)
      await updateMockTest(params.id, formData)
      alert("Mock test updated successfully!")
      router.push("/admin")
    } catch (error) {
      console.error("Error updating mock test:", error)
      alert("Failed to update mock test. Please check your data.")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    router.push("/admin")
  }

  const handleDuplicate = async () => {
    if (!confirm("Are you sure you want to duplicate this mock test?")) return

    try {
      await duplicateMockTest(params.id)
      alert("Mock test duplicated successfully!")
      router.push("/admin")
    } catch (error) {
      console.error("Error duplicating mock test:", error)
      alert("Failed to duplicate mock test")
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this mock test? This action cannot be undone.")) return

    try {
      await deleteMockTest(params.id)
      alert("Mock test deleted successfully!")
      router.push("/admin")
    } catch (error) {
      console.error("Error deleting mock test:", error)
      alert("Failed to delete mock test")
    }
  }

  if (!user || pageLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading mock test...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Mock Test</h1>
                <p className="text-sm text-gray-600">Modify test details, sections, and questions</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDuplicate}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
              >
                <Copy className="w-4 h-4" />
                Duplicate
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {mockTest && (
          <MockTestForm
            initialData={{
              program: mockTest.program || "",
              title: mockTest.title,
              slug: mockTest.slug,
              duration: mockTest.duration,
              instructions: mockTest.instructions,
              is_published: mockTest.is_published,
              sections: mockTest.sections || [],
            }}
            programs={programs}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={loading}
          />
        )}
      </div>
    </div>
  )
}
