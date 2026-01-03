"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { fetchQuestionById, updateQuestion, fetchPrograms } from "@/utils/admin-api"
import QuestionForm from "@/components/admin/QuestionForm"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function EditQuestionPage() {
  const router = useRouter()
  const params = useParams()
  const [programs, setPrograms] = useState([])
  const [initialData, setInitialData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    loadPrograms()
    loadQuestion()
  }, [params.id])

  const loadPrograms = async () => {
    try {
      const data = await fetchPrograms()
      console.log("[v0] Programs loaded:", data)
      setPrograms(data)
    } catch (error) {
      console.error("Failed to load programs:", error)
    }
  }

  const loadQuestion = async () => {
    try {
      const data = await fetchQuestionById(params.id)
      console.log("[v0] Question loaded:", data)
      setInitialData({
        program: data.program?.toString() || "",
        section: data.section,
        topic: data.topic,
        sub_topic: data.sub_topic,
        questions: [
          {
            question_text: data.question_text,
            marks: data.marks,
            negative_marks: data.negative_marks,
            options: data.options,
          },
        ],
      })
    } catch (error) {
      console.error("Failed to load question:", error)
      alert("Failed to load question")
    } finally {
      setLoadingData(false)
    }
  }

  const handleSubmit = async (data) => {
    setLoading(true)
    try {
      const questionData = {
        program: data.program,
        section: data.section,
        topic: data.topic,
        sub_topic: data.sub_topic,
        question_text: data.questions[0].question_text,
        marks: data.questions[0].marks,
        negative_marks: data.questions[0].negative_marks,
        is_active: true,
        options: data.questions[0].options,
      }
      await updateQuestion(params.id, questionData)
      alert("Question updated successfully!")
      router.push("/admin/question")
    } catch (error) {
      alert("Failed to update question")
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loadingData) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading question...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Link
            href="/admin/question"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Questions
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Edit Question</h1>
          <p className="text-sm text-gray-600 mt-1">Update question details and options</p>
        </div>

        {initialData && (
          <QuestionForm
            initialData={initialData}
            programs={programs}
            onSubmit={handleSubmit}
            onCancel={() => router.push("/admin/question")}
            isLoading={loading}
          />
        )}
      </div>
    </div>
  )
}
