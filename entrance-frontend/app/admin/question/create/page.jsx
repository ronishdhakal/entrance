"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createQuestion, fetchPrograms } from "@/utils/admin-api"
import QuestionForm from "@/components/admin/QuestionForm"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function CreateQuestionPage() {
  const router = useRouter()
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadPrograms()
  }, [])

  const loadPrograms = async () => {
    try {
      const data = await fetchPrograms()
      console.log("[v0] Programs loaded:", data)
      setPrograms(data)
    } catch (error) {
      console.error("Failed to load programs:", error)
    }
  }

  const handleSubmit = async (data) => {
    setLoading(true)
    try {
      const createdQuestions = []
      for (const question of data.questions) {
        const { _isExisting, ...cleanQuestion } = question
        const questionData = {
          program: data.program,
          section: data.section,
          topic: data.topic || null,
          sub_topic: data.sub_topic || null,
          question_text: cleanQuestion.question_text,
          marks: cleanQuestion.marks,
          negative_marks: cleanQuestion.negative_marks,
          is_active: true,
          options: cleanQuestion.options,
        }
        console.log("[v0] Creating question:", questionData)
        const created = await createQuestion(questionData)
        createdQuestions.push(created)
        console.log("[v0] Question created:", created)
      }
      alert(`Successfully created ${createdQuestions.length} question(s)!`)
      router.push("/admin/question")
    } catch (error) {
      alert("Failed to create questions. Please check the console for details.")
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
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
          <h1 className="text-2xl font-bold text-gray-900">Add Questions</h1>
          <p className="text-sm text-gray-600 mt-1">Create multiple questions in a section, topic, or subtopic</p>
        </div>

        <QuestionForm
          programs={programs}
          onSubmit={handleSubmit}
          onCancel={() => router.push("/admin/question")}
          isLoading={loading}
        />
      </div>
    </div>
  )
}
