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

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Loader2, CheckCircle } from "lucide-react"

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

  useEffect(() => {
    const loadMockTest = async () => {
      try {
        setLoading(true)
        const data = await fetchMockTestDetail(params.slug)
        if (data) setMockTest(data)
        else setError("Mock test not found")
      } catch (err) {
        console.error(err)
        setError("Failed to load mock test details")
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) loadMockTest()
  }, [params.slug])

  const handleStartTest = async () => {
    try {
      const token = getAccessToken()
      if (!token) {
        router.push(`/login?redirect=/mock-tests/${params.slug}`)
        return
      }

      setLoading(true)
      const response = await startAttempt(mockTest.id, [], token)

      if (response?.attempt_id) {
        setAttemptId(response.attempt_id)

        const questionsData = await fetchAttemptQuestions(
          response.attempt_id,
          token
        )

        if (questionsData?.sections?.length) {
          setAttemptQuestions(questionsData.sections)
          setTestStarted(true)
        } else {
          alert("No questions found for this test.")
        }
      } else {
        alert("Failed to start test.")
      }
    } catch (err) {
      console.error(err)
      alert("Error starting test.")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitExam = async () => {
    try {
      const token = getAccessToken()
      setLoading(true)

      const result = await submitExam(attemptId, token)
      if (result) {
        setTestResult(result)
        setTestSubmitted(true)
      } else {
        alert("Failed to submit exam.")
      }
    } catch (err) {
      console.error(err)
      alert("Error submitting exam.")
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
          <div className="text-center">
            <Loader2 className="size-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">
              {testStarted
                ? "Loading questions..."
                : "Loading mock test details..."}
            </p>
          </div>
        </div>
      )}

      {/* ================= ERROR ================= */}
      {!loading && (error || !mockTest) && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold mb-4">Mock Test Not Found</h1>
            <p className="text-muted-foreground mb-6">
              {error ||
                "The mock test you're looking for doesn't exist or has been removed."}
            </p>
            <Button asChild>
              <Link href="/mock-tests">
                <ArrowLeft className="size-4 mr-2" />
                Back to Mock Tests
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* ================= RESULT ================= */}
      {!loading && testSubmitted && testResult && (
        <div className="min-h-screen bg-background">
          <div className="container max-w-3xl mx-auto px-4 py-16">
            <Card className="p-8 text-center">
              <CheckCircle className="size-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">
                Test Submitted Successfully!
              </h1>
              <p className="text-muted-foreground mb-8">
                Your answers have been recorded and evaluated.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {testResult.score}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Your Score
                  </div>
                </div>
                <div className="p-4 bg-secondary rounded-lg">
                  <div className="text-3xl font-bold mb-1">
                    {testResult.status === "submitted"
                      ? "Completed"
                      : "Auto-Submitted"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Status
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link href="/mock-tests">
                    <ArrowLeft className="size-4 mr-2" />
                    Back to Tests
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/dashboard">View Dashboard</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ================= QUESTION VIEW ================= */}
      {!loading && testStarted && attemptQuestions && !testSubmitted && (
        <div className="min-h-screen bg-background">
          <div className="container max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">{mockTest.title}</h1>

            <QuestionViewer
              sections={attemptQuestions}
              attemptId={attemptId}
              duration={mockTest.duration}
              onSubmitExam={handleSubmitExam}
              token={getAccessToken()}
            />
          </div>
        </div>
      )}

      {/* ================= DEFAULT DETAIL VIEW ================= */}
      {!loading && !testStarted && mockTest && (
        <div className="min-h-screen bg-background">
          <div className="container max-w-7xl mx-auto px-4 py-8">
            <Button variant="ghost" className="mb-6" asChild>
              <Link href="/mock-tests">
                <ArrowLeft className="size-4 mr-2" />
                Back to Mock Tests
              </Link>
            </Button>

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
        </div>
      )}

      <Footer />
    </>
  )
}
a