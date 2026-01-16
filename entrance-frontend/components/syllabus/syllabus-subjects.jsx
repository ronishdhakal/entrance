export default function SyllabusSubjects({ subjects }) {
  if (!subjects || subjects.length === 0) return null

  return (
    <div className="rounded-lg border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="text-left p-3">Subject</th>
            <th className="text-right p-3">Marks</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-3">{item.subject_name}</td>
              <td className="p-3 text-right font-medium">
                {item.marks}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
