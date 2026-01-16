import Link from "next/link"

export default function SyllabusCard({ syllabus }) {
  return (
    <Link
      href={`/syllabus/${syllabus.slug}`}
      className="block rounded-lg border p-4 hover:shadow transition"
    >
      <h3 className="font-semibold text-lg">
        {syllabus.title}
      </h3>

      <p className="text-sm text-muted-foreground mt-1">
        {syllabus.program_name} · {syllabus.university}
      </p>

      <div className="mt-3 flex gap-4 text-sm">
        <span>Marks: {syllabus.total_marks}</span>
        <span>Questions: {syllabus.total_questions}</span>
      </div>
    </Link>
  )
}
