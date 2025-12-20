"use client"

import { useRouter } from "next/navigation"
import Select from "react-select"

export default function CourseFilter({ courses, selectedCourse }) {
  const router = useRouter()

  const options = [
    { value: null, label: "All Colleges" },
    ...courses.map((course) => ({
      value: course.slug,
      label: course.abbreviation || course.title,
    })),
  ]

  const selectedOption =
    options.find((opt) => opt.value === selectedCourse) || options[0]

  const handleChange = (option) => {
    if (option?.value) {
      router.push(`/college/${option.value}`)
    } else {
      router.push("/college")
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-2">
        Filter by Course
      </h3>

      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        isSearchable
        className="text-sm"
        classNamePrefix="course-select"
        placeholder="Select course"
        styles={{
          control: (base, state) => ({
            ...base,
            minHeight: "40px",
            borderRadius: "8px",
            borderColor: state.isFocused ? "#1ca3fd" : "#e5e7eb",
            boxShadow: "none",
            "&:hover": {
              borderColor: "#1ca3fd",
            },
          }),
          option: (base, state) => ({
            ...base,
            fontSize: "14px",
            backgroundColor: state.isSelected
              ? "#1ca3fd"
              : state.isFocused
              ? "#eaf5ff"
              : "white",
            color: state.isSelected ? "white" : "#111827",
            cursor: "pointer",
          }),
          singleValue: (base) => ({
            ...base,
            fontWeight: 600,
          }),
        }}
      />
    </div>
  )
}
