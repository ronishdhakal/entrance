"use client"

import CollegeCard from "./college-card"

export default function CollegeGrid({ colleges, courseId = "" }) {
  if (!colleges || colleges.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-base">
          No colleges found for this course.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          gap-6
        "
      >
        {colleges.map((college) => (
          <CollegeCard
            key={college.id}
            college={college}
            defaultCourseId={courseId}
          />
        ))}
      </div>
    </div>
  )
}
