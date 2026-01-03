"use client"

import { useEffect, useState } from "react"
import { Suspense } from "react"
import { useRouter } from "next/navigation"
import { Plus, Search, Trash2, Edit, Filter } from "lucide-react"
import { fetchAllQuestions, deleteQuestion, fetchProgramHierarchy, fetchPrograms } from "@/utils/admin-api"
import Link from "next/link"

function QuestionListContent() {
  const router = useRouter()
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [programs, setPrograms] = useState([])
  const [filters, setFilters] = useState({
    program: "",
    section: "",
    topic: "",
    sub_topic: "",
  })
  const [hierarchy, setHierarchy] = useState([])

  useEffect(() => {
    loadPrograms()
  }, [])

  useEffect(() => {
    if (filters.program) {
      loadHierarchy()
    }
    loadQuestions()
  }, [filters.program, filters.section, filters.topic, filters.sub_topic])

  const loadPrograms = async () => {
    try {
      const data = await fetchPrograms()
      console.log("[v0] Programs loaded:", data)
      setPrograms(data)
    } catch (error) {
      console.error("Failed to load programs:", error)
    }
  }

  const loadHierarchy = async () => {
    try {
      const data = await fetchProgramHierarchy(filters.program)
      console.log("[v0] Hierarchy loaded:", data)
      setHierarchy(data)
    } catch (error) {
      console.error("Failed to load hierarchy:", error)
    }
  }

  const loadQuestions = async () => {
    setLoading(true)
    try {
      const data = await fetchAllQuestions(filters)
      console.log("[v0] Questions loaded:", data)
      setQuestions(data)
    } catch (error) {
      console.error("Failed to load questions:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this question?")) return

    try {
      await deleteQuestion(id)
      loadQuestions()
    } catch (error) {
      alert("Failed to delete question")
    }
  }

  const renderQuestionText = (text) => {
    if (!text) return "Untitled Question"
    const preview = text.replace(/\$\$[\s\S]*?\$\$/g, "[Math]").replace(/\$[^$]+\$/g, "[Math]")
    return preview.length > 100 ? preview.substring(0, 100) + "..." : preview
  }

  const getSections = () => hierarchy || []
  const getTopics = () => {
    if (!filters.section) return []
    const section = hierarchy.find((s) => s.id === Number.parseInt(filters.section))
    return section?.topics || []
  }
  const getSubtopics = () => {
    if (!filters.topic) return []
    const section = hierarchy.find((s) => s.id === Number.parseInt(filters.section))
    const topic = section?.topics.find((t) => t.id === Number.parseInt(filters.topic))
    return topic?.subtopics || []
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Question Bank</h1>
              <p className="text-sm text-gray-600 mt-1">Manage questions for all programs</p>
            </div>
            <Link
              href="/admin/question/create"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="w-4 h-4" />
              Add Questions
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-gray-600" />
            <h3 className="text-sm font-semibold text-gray-900">Filters</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
              <select
                value={filters.program}
                onChange={(e) => setFilters({ program: e.target.value, section: "", topic: "", sub_topic: "" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Programs</option>
                {programs.map((program) => (
                  <option key={program.id} value={program.id}>
                    {program.abbreviation}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
              <select
                value={filters.section}
                onChange={(e) => setFilters({ ...filters, section: e.target.value, topic: "", sub_topic: "" })}
                disabled={!filters.program}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <option value="">All Sections</option>
                {getSections().map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
              <select
                value={filters.topic}
                onChange={(e) => setFilters({ ...filters, topic: e.target.value, sub_topic: "" })}
                disabled={!filters.section}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <option value="">All Topics</option>
                {getTopics().map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtopic</label>
              <select
                value={filters.sub_topic}
                onChange={(e) => setFilters({ ...filters, sub_topic: e.target.value })}
                disabled={!filters.topic}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <option value="">All Subtopics</option>
                {getSubtopics().map((subtopic) => (
                  <option key={subtopic.id} value={subtopic.id}>
                    {subtopic.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Questions ({questions.length})</h3>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading questions...</p>
            </div>
          ) : questions.length === 0 ? (
            <div className="p-12 text-center">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No questions found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {questions.map((question) => (
                <div key={question.id} className="p-4 hover:bg-gray-50 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 mb-2">
                        {renderQuestionText(question.question_text)}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded">{question.program}</span>
                        <span>{question.section}</span>
                        {question.topic && <span>→ {question.topic}</span>}
                        {question.sub_topic && <span>→ {question.sub_topic}</span>}
                        <span className="ml-auto">Marks: {question.marks}</span>
                        {question.negative_marks > 0 && <span>Negative: -{question.negative_marks}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Link
                        href={`/admin/question/${question.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(question.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function QuestionListPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading questions...</p>
          </div>
        </div>
      }
    >
      <QuestionListContent />
    </Suspense>
  )
}
