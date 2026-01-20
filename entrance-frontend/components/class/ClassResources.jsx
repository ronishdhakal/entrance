export default function ClassResources({ data }) {
  const resources = [
    { label: "Entrance Book", link: data.entrance_book_link },
    { label: "Entrance Syllabus", link: data.entrance_syllabus_link },
    { label: "Mock Test & Practice", link: data.mock_test_link },
    { label: "Entrance Exam Update", link: data.entrance_exam_update_link },
  ]

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">
        Entrance Preparation Resources
      </h2>

      <ul className="space-y-2">
        {resources.map(
          (item, i) =>
            item.link && (
              <li key={i}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {item.label}
                </a>
              </li>
            )
        )}
      </ul>
    </section>
  )
}
