import { CalendarDays, BookOpen, Clock } from "lucide-react"

export default function ClassMeta({ data }) {
  return (
    <section className="border rounded-lg bg-white p-6">
      <h2 className="text-lg font-semibold mb-4">
        Class Overview
      </h2>

      <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-700">
        {data.program_title && (
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">
                Program
              </p>
              <p>{data.program_title}</p>
            </div>
          </div>
        )}

        {data.duration && (
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">
                Duration
              </p>
              <p>{data.duration}</p>
            </div>
          </div>
        )}

        {data.batch_start_date && (
          <div className="flex items-start gap-3">
            <CalendarDays className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">
                Batch Starts
              </p>
              <p>
                {new Date(data.batch_start_date).toLocaleDateString(
                  "en-US",
                  { year: "numeric", month: "long", day: "numeric" }
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
