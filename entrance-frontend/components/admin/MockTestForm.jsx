"use client"

import { useState } from "react"
import { Plus, Save, X } from "lucide-react"
import BasicInfoForm from "./form/BasicInfoForm"
import SectionForm from "./form/SectionForm"

export default function MockTestForm({ initialData, programs, onSubmit, onCancel, isLoading }) {
  const [formData, setFormData] = useState(
    initialData || {
      program: "",
      title: "",
      slug: "",
      duration: 120,
      instructions: "",
      is_published: false,
      sections: [],
    },
  )

  const [expandedSections, setExpandedSections] = useState(new Set())
  const [expandedQuestions, setExpandedQuestions] = useState(new Set())

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const toggleSection = (index) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedSections(newExpanded)
  }

  const toggleQuestion = (key) => {
    const newExpanded = new Set(expandedQuestions)
    if (newExpanded.has(key)) {
      newExpanded.delete(key)
    } else {
      newExpanded.add(key)
    }
    setExpandedQuestions(newExpanded)
  }

  // Section operations
  const addSection = () => {
    setFormData({
      ...formData,
      sections: [
        ...formData.sections,
        {
          title: "",
          order: formData.sections.length + 1,
          total_questions: 0,
          is_optional: false,
          optional_group: null,
          questions: [],
        },
      ],
    })
    setExpandedSections(new Set([...expandedSections, formData.sections.length]))
  }

  const updateSection = (index, field, value) => {
    const newSections = [...formData.sections]
    newSections[index][field] = value
    setFormData({ ...formData, sections: newSections })
  }

  const removeSection = (index) => {
    const newSections = formData.sections.filter((_, i) => i !== index)
    setFormData({ ...formData, sections: newSections })
  }

  // Question operations
  const addQuestion = (sectionIndex) => {
    const newSections = [...formData.sections]
    newSections[sectionIndex].questions.push({
      question_text: "",
      marks: 1,
      negative_marks: 0,
      order: newSections[sectionIndex].questions.length + 1,
      options: [
        { option_text: "", is_correct: false },
        { option_text: "", is_correct: false },
        { option_text: "", is_correct: false },
        { option_text: "", is_correct: false },
      ],
    })
    newSections[sectionIndex].total_questions = newSections[sectionIndex].questions.length
    setFormData({ ...formData, sections: newSections })
    setExpandedQuestions(
      new Set([...expandedQuestions, `${sectionIndex}-${newSections[sectionIndex].questions.length - 1}`]),
    )
  }

  const updateQuestion = (sectionIndex, questionIndex, field, value) => {
    const newSections = [...formData.sections]
    newSections[sectionIndex].questions[questionIndex][field] = value
    setFormData({ ...formData, sections: newSections })
  }

  const removeQuestion = (sectionIndex, questionIndex) => {
    const newSections = [...formData.sections]
    newSections[sectionIndex].questions = newSections[sectionIndex].questions.filter((_, i) => i !== questionIndex)
    newSections[sectionIndex].total_questions = newSections[sectionIndex].questions.length
    setFormData({ ...formData, sections: newSections })
  }

  // Option operations
  const updateOption = (sectionIndex, questionIndex, optionIndex, field, value) => {
    const newSections = [...formData.sections]
    if (field === "is_correct" && value) {
      // Only one correct answer
      newSections[sectionIndex].questions[questionIndex].options.forEach((opt, i) => {
        opt.is_correct = i === optionIndex
      })
    } else {
      newSections[sectionIndex].questions[questionIndex].options[optionIndex][field] = value
    }
    setFormData({ ...formData, sections: newSections })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const submitData = {
      ...formData,
      program: Number.parseInt(formData.program),
    }
    onSubmit(submitData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <BasicInfoForm formData={formData} programs={programs} onFieldChange={handleChange} />

      {/* Sections */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Sections ({formData.sections.length})</h3>
          <button
            type="button"
            onClick={addSection}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Section
          </button>
        </div>

        <div className="space-y-4">
          {formData.sections.map((section, sectionIndex) => (
            <SectionForm
              key={sectionIndex}
              section={section}
              sectionIndex={sectionIndex}
              isExpanded={expandedSections.has(sectionIndex)}
              expandedQuestions={expandedQuestions}
              onToggle={() => toggleSection(sectionIndex)}
              onUpdate={(field, value) => updateSection(sectionIndex, field, value)}
              onRemove={() => removeSection(sectionIndex)}
              onAddQuestion={() => addQuestion(sectionIndex)}
              onUpdateQuestion={(questionIndex, field, value) =>
                updateQuestion(sectionIndex, questionIndex, field, value)
              }
              onRemoveQuestion={(questionIndex) => removeQuestion(sectionIndex, questionIndex)}
              onToggleQuestion={toggleQuestion}
              onUpdateOption={(questionIndex, optionIndex, field, value) =>
                updateOption(sectionIndex, questionIndex, optionIndex, field, value)
              }
            />
          ))}

          {formData.sections.length === 0 && (
            <div className="text-center py-8 text-gray-500">No sections added yet</div>
          )}
        </div>
      </div>

      {/* Actions */}
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
              Save Mock Test
            </>
          )}
        </button>
      </div>
    </form>
  )
}
