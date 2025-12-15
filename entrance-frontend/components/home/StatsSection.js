import { Users, BookOpen, Award, TrendingUp } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "2,500+",
    label: "Active Students",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: BookOpen,
    value: "400+",
    label: "Practice Questions",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    icon: Award,
    value: "95%",
    label: "Success Rate",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    icon: TrendingUp,
    value: "10,000+",
    label: "Tests Completed",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
]

export default function StatsSection() {
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl mb-4">
                  <Icon className="text-primary" size={32} />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-100 font-medium">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
