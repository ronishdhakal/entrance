import Link from "next/link"
import { BookOpen, Code, Calculator, Brain, ArrowRight } from "lucide-react"

const programs = [
    {
    id: "bsc-csit",
    title: "BSc CSIT",
    fullName: "Bachelor of Science in Computer Science and IT",
    icon: Calculator,
    description: "Extensive question bank with Physics, Chemistry, Mathematics, and Computer Science.",
    sections: ["English", "GK", "Physics", "Chemistry", "Math", "Computer"],
    color: "bg-green-500",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
  },
  {
    id: "bit",
    title: "BIT",
    fullName: "Bachelor of Information Technology",
    icon: Code,
    description: "Comprehensive mock tests with optional sections for Mathematics and Computer Science.",
    sections: ["English", "Physics", "Math/Computer"],
    color: "bg-blue-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    id: "bca",
    title: "BCA",
    fullName: "Bachelor of Computer Application",
    icon: BookOpen,
    description: "Complete practice tests covering all essential topics for BCA entrance examination.",
    sections: ["English", "GK", "Mathematics", "Computer"],
    color: "bg-purple-500",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
  },

  {
    id: "cmat",
    title: "CMAT",
    fullName: "Common Management Admission Test",
    icon: Brain,
    description: "Strategic mock tests for management entrance covering all key sections.",
    sections: ["General Awareness", "Quantitative", "Logical Reasoning", "English"],
    color: "bg-orange-500",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
  },
]

export default function ProgramsSection() {
  return (
    <section id="programs" className="py-5 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose Your Program</h2>
          <p className="text-lg text-gray-600">
            Select from our comprehensive mock test programs designed specifically for Nepali entrance examinations.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 gap-4 lg:gap-4">
          {programs.map((program) => {
            const Icon = program.icon
            return (
              <div
                key={program.id}
                className="group bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-primary hover:shadow-xl transition-all duration-300"
              >
                {/* Icon & Title */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`${program.color} p-3 rounded-xl text-white`}>
                      <Icon size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{program.title}</h3>
                      <p className="text-sm text-gray-500">{program.fullName}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6">{program.description}</p>

                {/* Sections */}
                <div className="mb-6">
                  <div className="text-sm font-semibold text-gray-700 mb-3">Sections Covered:</div>
                  <div className="flex flex-wrap gap-2">
                    {program.sections.map((section) => (
                      <span
                        key={section}
                        className={`${program.bgColor} ${program.textColor} px-3 py-1 rounded-full text-sm font-medium`}
                      >
                        {section}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={`/program/${program.id}`}
                  className="flex items-center justify-between bg-gray-50 group-hover:bg-primary group-hover:text-white text-gray-900 px-6 py-3 rounded-xl font-semibold transition-all"
                >
                  <span>Start Practice</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
