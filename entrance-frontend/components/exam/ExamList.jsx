"use client"

import ExamCard from "./ExamCard"

export default function ExamList({ exams }) {
  if (exams.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No exams available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {exams.map((exam) => (
        <ExamCard key={exam.id} exam={exam} />
      ))}
    </div>
  )
}
