import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export default function CTASection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full text-primary mb-6">
          <Sparkles size={20} />
          <span className="font-semibold">Start Your Journey Today</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
          Ready to Ace Your Entrance Exam?
        </h2>

        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Join thousands of students who have improved their scores with our
          comprehensive IT Entrance Preparation Platform.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-all flex items-center justify-center space-x-2 shadow-lg"
          >
            <span>Create Free Account</span>
            <ArrowRight size={20} />
          </Link>

          <Link
            href="/dashboard"
            className="bg-white border border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary/5 transition-all text-center"
          >
            Already have an account? Login
          </Link>
        </div>

        <div className="mt-12 text-gray-500 text-sm">
          No credit card required • Free practice tests available
        </div>
      </div>
    </section>
  )
}
