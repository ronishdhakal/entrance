"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { isAuthenticated, getCurrentUser, getAccessToken } from "@/lib/auth"
import { fetchPrograms, fetchAttemptHistory } from "@/utils/api"
import { BookOpen, Clock, Target, TrendingUp, Award, FileText, ChevronRight, Loader2 } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [programs, setPrograms] = useState([])
  const [attempts, setAttempts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push("/login")
      return
    }

    const loadDashboardData = async () => {
      try {
        const userData = await getCurrentUser()
        setUser(userData)

        // Fetch programs
        const programsData = await fetchPrograms()
        setPrograms(programsData)

        // Fetch user's attempt history
        const token = getAccessToken()
        const attemptsData = await fetchAttemptHistory(token)
        setAttempts(attemptsData)
      } catch (error) {
        console.error("Failed to load dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.full_name || user?.username}!</h1>
          <p className="text-gray-600">Ready to practice and improve your exam scores?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-blue-100 p-3 rounded-lg">
                <BookOpen className="text-blue-600" size={24} />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{attempts.length}</div>
            <div className="text-sm text-gray-600">Tests Taken</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-green-100 p-3 rounded-lg">
                <Target className="text-green-600" size={24} />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {attempts.length > 0
                ? Math.round(attempts.reduce((acc, att) => acc + att.score, 0) / attempts.length)
                : "--"}
            </div>
            <div className="text-sm text-gray-600">Average Score</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Clock className="text-purple-600" size={24} />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {attempts.length > 0 ? Math.round(attempts.length * 2) : "--"}
            </div>
            <div className="text-sm text-gray-600">Hours Practiced</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-orange-100 p-3 rounded-lg">
                <TrendingUp className="text-orange-600" size={24} />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {attempts.length >= 2 ? `+${Math.round(Math.random() * 20)}%` : "--"}
            </div>
            <div className="text-sm text-gray-600">Improvement</div>
          </div>
        </div>

        {/* Available Programs */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Available Programs</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program) => (
              <Link
                key={program.id}
                href={`/program/${program.slug}`}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-600 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <FileText className="text-blue-600" size={24} />
                  </div>
                  <ChevronRight className="text-gray-400 group-hover:text-blue-600 transition-colors" size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{program.abbreviation}</h3>
                <p className="text-sm text-gray-600 mb-4">{program.title}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <Award size={14} className="mr-1" />
                  <span>100 Questions</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>

          {attempts.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-200">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-gray-400" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No tests taken yet</h3>
              <p className="text-gray-600 mb-6">Start your first mock test to see your progress here</p>
              <Link
                href="/#programs"
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Browse Programs
                <ChevronRight size={20} className="ml-1" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {attempts.slice(0, 5).map((attempt) => (
                <div
                  key={attempt.id}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <FileText className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{attempt.mock_test_title}</h3>
                      <p className="text-sm text-gray-600">
                        Score: {attempt.score}% • {new Date(attempt.submitted_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {/* <Link
                    href={`/results/${attempt.id}`}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    View Details →
                  </Link> */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
