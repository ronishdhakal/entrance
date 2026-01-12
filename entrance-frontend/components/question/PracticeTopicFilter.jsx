"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { fetchTopicsBySection, fetchSubTopicsByTopic } from "@/utils/admin-api"

export function PracticeTopicFilter({ sectionId, onFilter }) {
  const [topics, setTopics] = useState([])
  const [subtopics, setSubtopics] = useState([])
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [selectedSubtopic, setSelectedSubtopic] = useState(null)
  const [loading, setLoading] = useState(true)

  // 🔹 Responsive collapse state
  const [isOpen, setIsOpen] = useState(false)

  // 🔹 Set default open/close based on screen size
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)") // md+

    const handleScreenChange = () => {
      setIsOpen(mediaQuery.matches) // open on desktop, closed on mobile
    }

    handleScreenChange() // initial check
    mediaQuery.addEventListener("change", handleScreenChange)

    return () => {
      mediaQuery.removeEventListener("change", handleScreenChange)
    }
  }, [])

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const data = await fetchTopicsBySection(sectionId)
        setTopics(data || [])
      } catch (error) {
        console.error("Error fetching topics:", error)
      } finally {
        setLoading(false)
      }
    }

    loadTopics()
  }, [sectionId])

  useEffect(() => {
    const loadSubtopics = async () => {
      if (!selectedTopic) {
        setSubtopics([])
        return
      }

      try {
        const data = await fetchSubTopicsByTopic(selectedTopic)
        setSubtopics(data || [])
      } catch (error) {
        console.error("Error fetching subtopics:", error)
      }
    }

    loadSubtopics()
  }, [selectedTopic])

  const handleFilter = () => {
    onFilter({
      topic: selectedTopic,
      sub_topic: selectedSubtopic,
    })
  }

  const handleClear = () => {
    setSelectedTopic(null)
    setSelectedSubtopic(null)
    onFilter({ topic: null, sub_topic: null })
  }

  if (loading) {
    return <div className="text-center py-4">Loading filters...</div>
  }

  return (
    <Card className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filter Questions</h3>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden"
        >
          {isOpen ? "Hide" : "Show"}
        </Button>
      </div>

      {/* Filters */}
      {isOpen && (
        <>
          <div>
            <label className="text-sm font-medium block mb-2">
              Topic
            </label>
            <select
              value={selectedTopic || ""}
              onChange={(e) => {
                setSelectedTopic(
                  e.target.value
                    ? Number.parseInt(e.target.value)
                    : null
                )
                setSelectedSubtopic(null)
              }}
              className="w-full px-3 py-2 border rounded-md text-sm bg-background"
            >
              <option value="">All Topics</option>
              {topics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.title}
                </option>
              ))}
            </select>
          </div>

          {selectedTopic && subtopics.length > 0 && (
            <div>
              <label className="text-sm font-medium block mb-2">
                Sub-Topic
              </label>
              <select
                value={selectedSubtopic || ""}
                onChange={(e) =>
                  setSelectedSubtopic(
                    e.target.value
                      ? Number.parseInt(e.target.value)
                      : null
                  )
                }
                className="w-full px-3 py-2 border rounded-md text-sm bg-background"
              >
                <option value="">All Sub-Topics</option>
                {subtopics.map((subtopic) => (
                  <option key={subtopic.id} value={subtopic.id}>
                    {subtopic.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex gap-2">
            <Button size="sm" onClick={handleFilter} className="flex-1">
              Apply Filter
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleClear}
              className="flex-1 bg-transparent"
            >
              Clear
            </Button>
          </div>
        </>
      )}
    </Card>
  )
}
