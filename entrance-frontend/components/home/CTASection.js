import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export default function CTASection() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-primary to-blue-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-6">
          <Sparkles size={20} />
          <span className="font-semibold">Start Your Journey Today</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Ace Your Entrance Exam?</h2>

        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Join thousands of students who have improved their scores with our comprehensive mock test platform.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center justify-center space-x-2 shadow-xl"
          >
            <span>Create Free Account</span>
            <ArrowRight size={20} />
          </Link>
          <Link
            href="/login"
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all text-center"
          >
            Already have an account? Login
          </Link>
        </div>

        <div className="mt-12 text-blue-100 text-sm">No credit card required • Free practice tests available</div>
      </div>
    </section>
  )
}
