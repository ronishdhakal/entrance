import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-white py-10 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-block">
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                🎯 Nepal&apos;s #1 Mock Test Platform
              </span>
            </div>

            <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Ace Your Entrance Exams with <span className="text-primary">Confidence</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Practice with authentic mock tests for BIT, BCA, BSc CSIT, and CMAT. Get real-time results, detailed
              analysis, and improve your performance.
            </p>

            {/* Key Benefits */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                <span className="text-gray-700">100+ Questions Per Program</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                <span className="text-gray-700">Real Exam Environment</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                <span className="text-gray-700">Instant Results & Analysis</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/dashboard"
                className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-primary/30"
              >
                <span>Start Practicing Now</span>
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/#programs"
                className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all text-center"
              >
                View Programs
              </Link>
            </div>
          </div>

          {/* Right Image/Illustration */}
          <div className="relative">
            <div className="bg-gradient-to-br from-primary to-blue-600 rounded-2xl p-8 shadow-2xl">
              <div className="bg-white rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-500">Mock Test Progress</span>
                  <span className="text-primary font-bold">85%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[85%] rounded-full"></div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-primary">2,500+</div>
                    <div className="text-sm text-gray-600">Students</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">95%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-4 animate-bounce">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <CheckCircle className="text-green-600" size={24} />
                </div>
                <div>
                  <div className="text-sm font-semibold">Test Completed!</div>
                  <div className="text-xs text-gray-500">Score: 82/100</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
