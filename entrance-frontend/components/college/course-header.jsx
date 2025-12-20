export default function CourseHeader({ course }) {
  if (!course) return null

  return (
    <div className="mb-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight mb-4">
          Best {course.abbreviation || course.title} Colleges in Nepal
        </h1>

        {/* Top description */}
        {course.top_description && (
          <div
            className="prose prose-base sm:prose-lg max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: course.top_description }}
          />
        )}
      </div>
    </div>
  )
}
