"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

import {
  fetchMockTestDetail,
  startAttempt,
  fetchAttemptQuestions,
  submitExam,
} from "@/utils/api"
import { getAccessToken } from "@/lib/auth"

import { TestHeader } from "@/components/mock-test-detail/test-header"
import { TestSections } from "@/components/mock-test-detail/test-sections"
import { TestInstructions } from "@/components/mock-test-detail/test-instructions"
import { TestSidebar } from "@/components/mock-test-detail/test-sidebar"
import { QuestionViewer } from "@/components/mock-test-detail/question-viewer"
import { TestResultPoster } from "@/components/mock-test-detail/test-result-poster"


import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Loader2, CheckCircle } from "lucide-react"

/* ================= OPTIONAL GROUP UTILS ================= */
function getOptionalGroups(sections) {
  const groups = {}
  sections.forEach((s) => {
    if (s.is_optional && s.optional_group) {
      if (!groups[s.optional_group]) groups[s.optional_group] = []
      groups[s.optional_group].push(s)
    }
  })
  return groups
}

export default function MockTestDetailPage() {
  const params = useParams()
  const router = useRouter()

  const [mockTest, setMockTest] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [testStarted, setTestStarted] = useState(false)
  const [attemptId, setAttemptId] = useState(null)
  const [attemptQuestions, setAttemptQuestions] = useState(null)

  const [testSubmitted, setTestSubmitted] = useState(false)
  const [testResult, setTestResult] = useState(null)

  /* ---------- OPTIONAL SELECTION STATE ---------- */
  const [showOptionalModal, setShowOptionalModal] = useState(false)
  const [selectedOptionalSections, setSelectedOptionalSections] = useState({})

  /* ================= LOAD MOCK TEST ================= */
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const data = await fetchMockTestDetail(params.slug)
        if (!data) throw new Error()
        setMockTest(data)
      } catch {
        setError("Mock test not found")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [params.slug])

  const optionalGroups = mockTest
    ? getOptionalGroups(mockTest.sections)
    : {}

  const hasOptionalGroups = Object.keys(optionalGroups).length > 0
  const allGroupsSelected =
    Object.keys(optionalGroups).length ===
    Object.keys(selectedOptionalSections).length

  /* ================= START TEST (ENFORCED) ================= */
  const handleStartTest = async () => {
    const token = getAccessToken()
    if (!token) {
      router.push(`/login?redirect=/mock-tests/${params.slug}`)
      return
    }

    // 🚨 FORCE SELECTION
    if (hasOptionalGroups && !allGroupsSelected) {
      setShowOptionalModal(true)
      return
    }

    try {
      setLoading(true)

      const response = await startAttempt(
        mockTest.id,
        Object.values(selectedOptionalSections),
        token,
      )

      if (!response?.attempt_id) {
        alert("Failed to start test.")
        return
      }

      setAttemptId(response.attempt_id)

      const questions = await fetchAttemptQuestions(
        response.attempt_id,
        token,
      )

      setAttemptQuestions(questions.sections)
      setTestStarted(true)
    } catch (err) {
      console.error(err)
      alert("Error starting test.")
    } finally {
      setLoading(false)
    }
  }

  /* ================= SUBMIT ================= */
  const handleSubmitExam = async () => {
    try {
      setLoading(true)
      const result = await submitExam(attemptId, getAccessToken())
      setTestResult(result)
      setTestSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />

      {/* ================= LOADING ================= */}
      {loading && (
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="size-10 animate-spin text-primary" />
        </div>
      )}

      {/* ================= ERROR ================= */}
      {!loading && (error || !mockTest) && (
        <div className="min-h-screen flex items-center justify-center">
          <Button asChild>
            <Link href="/mock-tests">
              <ArrowLeft className="mr-2 size-4" />
              Back to Tests
            </Link>
          </Button>
        </div>
      )}

      {/* ================= RESULT ================= */}
      {!loading && testSubmitted && testResult && mockTest && (
  <TestResultPoster
    result={testResult}
    mockTest={mockTest}
  />
)}


      {/* ================= QUESTION VIEW ================= */}
      {!loading && testStarted && attemptQuestions && !testSubmitted && (
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <QuestionViewer
  sections={attemptQuestions}
  selectedOptionalSectionIds={Object.values(selectedOptionalSections)}
  attemptId={attemptId}
  duration={mockTest.duration}
  onSubmitExam={handleSubmitExam}
  token={getAccessToken()}
/>

        </div>
      )}

      {/* ================= DETAIL VIEW ================= */}
      {!loading && !testStarted && mockTest && (
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/mock-tests">
              <ArrowLeft className="mr-2 size-4" />
              Back
            </Link>
          </Button>

          {/* ✅ MOBILE START BUTTON (TOP) */}
          <div className="block lg:hidden mb-6">
            <Button
              className="w-full h-12 text-base font-semibold"
              onClick={handleStartTest}
            >
              Start Test
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <TestHeader mockTest={mockTest} />
              <TestSections sections={mockTest.sections} />
              <TestInstructions mockTest={mockTest} />
            </div>

            <div className="lg:col-span-1">
              <TestSidebar
                mockTest={mockTest}
                onStartTest={handleStartTest}
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= OPTIONAL SELECTION MODAL ================= */}
      {showOptionalModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <Card className="w-full max-w-lg p-6">
            <h3 className="text-lg font-semibold mb-4">
              Choose Optional Sections
            </h3>

            {Object.entries(optionalGroups).map(([group, sections]) => (
              <div key={group} className="mb-4">
                <p className="font-medium mb-2">
                  Optional Group {group} (Choose one)
                </p>
                {sections.map((s) => (
                  <label
                    key={s.id}
                    className="flex items-center gap-3 p-2 border rounded mb-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`group_${group}`}
                      checked={selectedOptionalSections[group] === s.id}
                      onChange={() =>
                        setSelectedOptionalSections((prev) => ({
                          ...prev,
                          [group]: s.id,
                        }))
                      }
                    />
                    <span>{s.title}</span>
                  </label>
                ))}
              </div>
            ))}

            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowOptionalModal(false)}
              >
                Cancel
              </Button>
              <Button
                disabled={!allGroupsSelected}
                onClick={() => {
                  setShowOptionalModal(false)
                  handleStartTest()
                }}
              >
                Confirm & Start
              </Button>
            </div>
          </Card>
        </div>
      )}

      <Footer />
    </>
  )
}
