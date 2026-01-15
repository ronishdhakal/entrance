import { Clock, BarChart3, CheckSquare, Shield, Target } from "lucide-react"

const features = [
  {
    icon: Clock,
    title: "Real Exam Timer",
    description: "Practice with real exam time limits to improve speed and time management.",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description: "Analyze your performance with subject-wise and section-wise insights.",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: CheckSquare,
    title: "Instant Results",
    description: "Get immediate results with correct answers and detailed explanations.",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Your personal data and practice sessions are fully secure and private.",
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    icon: Target,
    title: "Progress Tracking",
    description: "Track your improvement over time with detailed performance history.",
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to excel in your entrance examinations — designed for results.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="
                  group bg-white rounded-2xl p-7
                  border border-gray-100
                  hover:border-primary/30
                  hover:shadow-xl
                  transition-all duration-300
                  flex flex-col
                "
              >
                {/* Icon */}
                <div
                  className={`
                    ${feature.bgColor} ${feature.color}
                    w-14 h-14 rounded-xl
                    flex items-center justify-center
                    mb-5
                    group-hover:scale-105
                    transition-transform
                  `}
                >
                  <Icon size={28} />
                </div>

                {/* Text */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
