"use client"

import { useState, useEffect } from "react"
import { Plus, Save, X } from "lucide-react"
import { fetchAllQuestions } from "@/utils/admin-api"
import HierarchySelector from "./question/HierarchySelector"
import ContextBreadcrumb from "./question/ContextBreadcrumb"
import QuestionItem from "./question/QuestionItem"

export default function QuestionForm({ initialData, programs, onSubmit, onCancel, isLoading }) {
  const [formData, setFormData] = useState(
    initialData || {
      program: "",
      section: null,
      topic: null,
      sub_topic: null,
      questions: [],
    },
  )

  const [selectedContext, setSelectedContext] = useState(null)
  const [expandedQuestions, setExpandedQuestions] = useState(new Set())
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false)

  useEffect(() => {
    if (formData.program && formData.section) {
      loadExistingQuestions()
    }
  }, [formData.program, formData.section, formData.topic, formData.sub_topic])

  const loadExistingQuestions = async () => {
    setIsLoadingQuestions(true)
    try {
      const params = {
        program: formData.program,
        section: formData.section,
        ...(formData.topic && { topic: formData.topic }),
        ...(formData.sub_topic && { sub_topic: formData.sub_topic }),
      }
      console.log("[v0] Loading existing questions with params:", params)
      const questions = await fetchAllQuestions(params)
      console.log("[v0] Loaded existing questions:", questions)
      const markedQuestions = (questions || []).map((q) => ({
        ...q,
        _isExisting: true,
      }))
      setFormData((prev) => ({
        ...prev,
        questions: markedQuestions,
      }))
      setExpandedQuestions(new Set())
    } catch (error) {
      console.error("[v0] Failed to load existing questions:", error)
    } finally {
      setIsLoadingQuestions(false)
    }
  }

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleHierarchySelect = (type, item, section, topic) => {
    if (type === "section") {
      setSelectedContext({
        section: { id: item.id, title: item.title },
        topic: null,
        subtopic: null,
      })
      setFormData({
        ...formData,
        section: item.id,
        topic: null,
        sub_topic: null,
      })
    } else if (type === "topic") {
      setSelectedContext({
        section: { id: section.id, title: section.title },
        topic: { id: item.id, title: item.title },
        subtopic: null,
      })
      setFormData({
        ...formData,
        section: section.id,
        topic: item.id,
        sub_topic: null,
      })
    } else if (type === "subtopic") {
      setSelectedContext({
        section: { id: section.id, title: section.title },
        topic: { id: topic.id, title: topic.title },
        subtopic: { id: item.id, title: item.title },
      })
      setFormData({
        ...formData,
        section: section.id,
        topic: topic.id,
        sub_topic: item.id,
      })
    }
  }

  const clearContext = () => {
    setSelectedContext(null)
    setFormData({
      ...formData,
      section: null,
      topic: null,
      sub_topic: null,
    })
  }

  const toggleQuestion = (index) => {
    const newExpanded = new Set(expandedQuestions)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedQuestions(newExpanded)
  }

  const addQuestion = () => {
    const newQuestions = [
      ...formData.questions,
      {
        question_text: "",
        marks: 1,
        negative_marks: 0,
        options: [
          { option_text: "", is_correct: false },
          { option_text: "", is_correct: false },
          { option_text: "", is_correct: false },
          { option_text: "", is_correct: false },
        ],
      },
    ]
    setFormData({ ...formData, questions: newQuestions })
    setExpandedQuestions(new Set([...expandedQuestions, newQuestions.length - 1]))
  }

  const updateQuestion = (questionIndex, field, value) => {
    const newQuestions = [...formData.questions]
    newQuestions[questionIndex][field] = value
    setFormData({ ...formData, questions: newQuestions })
  }

  const removeQuestion = (questionIndex) => {
    const newQuestions = formData.questions.filter((_, i) => i !== questionIndex)
    setFormData({ ...formData, questions: newQuestions })
  }

  const updateOption = (questionIndex, optionIndex, field, value) => {
    const newQuestions = [...formData.questions]
    if (field === "is_correct" && value) {
      newQuestions[questionIndex].options.forEach((opt, i) => {
        opt.is_correct = i === optionIndex
      })
    } else {
      newQuestions[questionIndex].options[optionIndex][field] = value
    }
    setFormData({ ...formData, questions: newQuestions })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.program) {
      alert("Please select a program")
      return
    }

    if (!formData.section) {
      alert("Please select at least a section from the hierarchy")
      return
    }

    const newQuestions = formData.questions.filter((q) => !q._isExisting)

    if (newQuestions.length === 0) {
      alert("Please add at least one new question")
      return
    }

    const submitData = {
      program: Number.parseInt(formData.program),
      section: formData.section,
      topic: formData.topic,
      sub_topic: formData.sub_topic,
      questions: newQuestions,
    }

    onSubmit(submitData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Program Selection */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Program <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.program}
            onChange={(e) => handleChange("program", e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Program</option>
            {programs.map((program) => (
              <option key={program.id} value={program.id}>
                {program.name} ({program.abbreviation})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Hierarchy Selection */}
      {formData.program && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Select Location <span className="text-red-500">*</span>
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Choose where to add questions: directly in a Section, inside a Topic, or within a Subtopic
          </p>
          <HierarchySelector
            programId={formData.program}
            onSelect={handleHierarchySelect}
            selectedContext={selectedContext}
          />
        </div>
      )}

      {/* Context Breadcrumb */}
      {selectedContext && <ContextBreadcrumb context={selectedContext} onClear={clearContext} />}

      {/* Questions */}
      {formData.section && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">Questions ({formData.questions.length})</h3>
              {isLoadingQuestions && <p className="text-sm text-gray-500 mt-1">Loading existing questions...</p>}
            </div>
            <button
              type="button"
              onClick={addQuestion}
              disabled={isLoadingQuestions}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              Add Question
            </button>
          </div>

          <div className="space-y-4">
            {formData.questions.map((question, questionIndex) => (
              <QuestionItem
                key={questionIndex}
                question={question}
                questionIndex={questionIndex}
                isExpanded={expandedQuestions.has(questionIndex)}
                onToggle={() => toggleQuestion(questionIndex)}
                onUpdate={(field, value) => updateQuestion(questionIndex, field, value)}
                onRemove={() => removeQuestion(questionIndex)}
                onUpdateOption={(optionIndex, field, value) => updateOption(questionIndex, optionIndex, field, value)}
              />
            ))}

            {formData.questions.length === 0 && !isLoadingQuestions && (
              <div className="text-center py-8 text-gray-500">No questions added yet</div>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      {formData.section && (
        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
          >
            <X className="w-4 h-4 inline mr-2" />
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Questions
              </>
            )}
          </button>
        </div>
      )}
    </form>
  )
}
