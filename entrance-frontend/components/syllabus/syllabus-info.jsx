export default function SyllabusInfo({ syllabus }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
      <Info label="Total Questions" value={syllabus.total_questions} />
      <Info label="Total Marks" value={syllabus.total_marks} />
      <Info label="Pass Marks" value={syllabus.pass_marks} />
      <Info label="Question Type" value={syllabus.question_type} />
      <Info
        label="Exam Duration"
        value={`${syllabus.exam_duration} minutes`}
      />
      <Info
        label="Negative Marking"
        value={
          syllabus.negative_marking
            ? `Yes (${syllabus.negative_mark_value})`
            : "No"
        }
      />
    </div>
  )
}

function Info({ label, value }) {
  return (
    <div className="rounded-lg border p-3">
      <p className="text-muted-foreground">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  )
}
