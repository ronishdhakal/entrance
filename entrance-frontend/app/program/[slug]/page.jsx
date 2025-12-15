"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Clock, BookOpen, ArrowRight } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { API_URL } from "@/lib/api-config"

export default function ProgramDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { slug } = params

  const [program, setProgram] = useState(null)
  const [mockTests, setMockTests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        setLoading(true)

        // Fetch program details
        const programResponse = await fetch(`${API_URL}/programs/${slug}/`)
        if (!programResponse.ok) {
          throw new Error("Program not found")
        }
        const programData = await programResponse.json()
        setProgram(programData)

        // Fetch mock tests for this program
        const mockTestsResponse = await fetch(`${API_URL}/mocktests/?program=${slug}`)
        if (mockTestsResponse.ok) {
          const mockTestsData = await mockTestsResponse.json()
          setMockTests(mockTestsData)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProgramData()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading program details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !program) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Program Not Found</h2>
            <p className="text-muted-foreground mb-4">{error || "The program you're looking for doesn't exist."}</p>
            <Link href="/" className="text-primary hover:underline">
              Go back to home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Program Header */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-2xl mb-4">
              <span className="text-3xl font-bold text-white">{program.abbreviation}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{program.name}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{program.description}</p>
          </div>
        </div>
      </section>

      {/* Mock Tests Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2">Available Mock Tests</h2>
            <p className="text-muted-foreground">
              {mockTests.length > 0
                ? `Choose from ${mockTests.length} mock test${mockTests.length > 1 ? "s" : ""} to practice`
                : "No mock tests available yet"}
            </p>
          </div>

          {mockTests.length === 0 ? (
            <div className="text-center py-12 bg-muted/50 rounded-lg">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg text-muted-foreground">No mock tests available for this program yet.</p>
              <p className="text-sm text-muted-foreground mt-2">Check back later for new tests!</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockTests.map((test) => (
                <div
                  key={test.id}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">{test.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{test.duration} minutes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>100 questions</span>
                      </div>
                    </div>
                  </div>

                  {test.instructions && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{test.instructions}</p>
                  )}

                  <Link
                    href={`/test/${test.slug}`}
                    className="inline-flex items-center gap-2 w-full justify-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200"
                  >
                    Start Test
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
