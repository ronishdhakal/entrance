import { Clock, BarChart3, CheckSquare, Zap, Shield, Target } from "lucide-react"

const features = [
  {
    icon: Clock,
    title: "Real Exam Timer",
    description: "Practice with actual exam time constraints to build speed and accuracy.",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description: "Get comprehensive performance analysis with section-wise breakdown.",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    icon: CheckSquare,
    title: "Instant Results",
    description: "Receive immediate feedback with correct answers and explanations.",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    icon: Zap,
    title: "LaTeX Support",
    description: "Complex mathematical equations and formulas rendered perfectly.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Your data and practice sessions are completely secure and private.",
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    icon: Target,
    title: "Progress Tracking",
    description: "Monitor your improvement over time with detailed history.",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
          <p className="text-lg text-gray-600">
            Everything you need to excel in your entrance examination, all in one place.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div
                  className={`${feature.bgColor} ${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}
                >
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
