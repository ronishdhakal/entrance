"use client"

import { useState, useEffect } from "react"
import { Folder, FileText, Check, Plus } from "lucide-react"
import { fetchProgramHierarchy, createTopic, createSubTopic } from "@/utils/admin-api"

export default function HierarchySelector({ programId, onSelect, selectedContext }) {
  const [hierarchy, setHierarchy] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [newTopicSection, setNewTopicSection] = useState(null)
  const [newTopicName, setNewTopicName] = useState("")
  const [newSubtopicTopic, setNewSubtopicTopic] = useState(null)
  const [newSubtopicName, setNewSubtopicName] = useState("")

  useEffect(() => {
    if (programId) {
      loadHierarchy()
    }
  }, [programId])

  const loadHierarchy = async () => {
    setIsLoading(true)
    try {
      const data = await fetchProgramHierarchy(programId)
      setHierarchy(data || [])
    } catch (error) {
      console.error("[v0] Failed to load hierarchy:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddTopic = async (sectionId) => {
    if (!newTopicName.trim()) return
    try {
      await createTopic({
        section: sectionId,
        title: newTopicName.trim(),
      })
      setNewTopicName("")
      setNewTopicSection(null)
      loadHierarchy()
    } catch (error) {
      console.error("Failed to create topic:", error)
      alert("Failed to create topic")
    }
  }

  const handleAddSubtopic = async (topicId) => {
    if (!newSubtopicName.trim()) return
    try {
      await createSubTopic({
        topic: topicId,
        title: newSubtopicName.trim(),
      })
      setNewSubtopicName("")
      setNewSubtopicTopic(null)
      loadHierarchy()
    } catch (error) {
      console.error("Failed to create subtopic:", error)
      alert("Failed to create subtopic")
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
      {hierarchy.map((section) => (
        <div key={section.id} className="border border-gray-100 rounded-lg overflow-hidden bg-gray-50/30">
          <div className="flex items-center justify-between p-3 bg-white border-b border-gray-100 group">
            <div className="flex items-center gap-3">
              <Folder className="w-4 h-4 text-blue-500" />
              <span className="font-medium text-gray-900">{section.title}</span>
            </div>
            <button
              type="button"
              onClick={() => onSelect("section", section)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition ${
                selectedContext?.section?.id === section.id && !selectedContext?.topic
                  ? "bg-blue-100 text-blue-700 ring-1 ring-blue-200"
                  : "bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {selectedContext?.section?.id === section.id && !selectedContext?.topic && <Check className="w-3 h-3" />}
              Select Section
            </button>
          </div>

          <div className="p-3 space-y-3">
            {section.topics?.map((topic) => (
              <div key={topic.id} className="pl-4 border-l-2 border-blue-100 space-y-2">
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span className="text-sm font-medium text-gray-700">{topic.title}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelect("topic", topic, section)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs transition ${
                      selectedContext?.topic?.id === topic.id && !selectedContext?.subtopic
                        ? "bg-blue-100 text-blue-700 ring-1 ring-blue-200"
                        : "bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600 opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    {selectedContext?.topic?.id === topic.id && !selectedContext?.subtopic && (
                      <Check className="w-3 h-3" />
                    )}
                    Select Topic
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4">
                  {topic.subtopics?.map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => onSelect("subtopic", sub, section, topic)}
                      className={`flex items-center justify-between px-3 py-1.5 rounded-md text-xs transition border ${
                        selectedContext?.subtopic?.id === sub.id
                          ? "bg-blue-50 border-blue-200 text-blue-700 ring-1 ring-blue-100"
                          : "bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="w-3 h-3 text-blue-400 flex-shrink-0" />
                        <span className="truncate">{sub.title}</span>
                      </div>
                      {selectedContext?.subtopic?.id === sub.id && <Check className="w-3 h-3 flex-shrink-0" />}
                    </button>
                  ))}
                </div>

                {/* Add Subtopic */}
                {newSubtopicTopic === topic.id ? (
                  <div className="pl-4 flex gap-2 mt-2">
                    <input
                      type="text"
                      value={newSubtopicName}
                      onChange={(e) => setNewSubtopicName(e.target.value)}
                      placeholder="New subtopic name"
                      className="flex-1 px-2 py-1 text-xs border border-gray-200 rounded focus:ring-2 focus:ring-blue-500"
                      onKeyPress={(e) => e.key === "Enter" && handleAddSubtopic(topic.id)}
                    />
                    <button
                      type="button"
                      onClick={() => handleAddSubtopic(topic.id)}
                      className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewSubtopicTopic(null)}
                      className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setNewSubtopicTopic(topic.id)}
                    className="pl-4 text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Subtopic
                  </button>
                )}
              </div>
            ))}

            {/* Add Topic */}
            {newTopicSection === section.id ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTopicName}
                  onChange={(e) => setNewTopicName(e.target.value)}
                  placeholder="New topic name"
                  className="flex-1 px-2 py-1 text-xs border border-gray-200 rounded focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === "Enter" && handleAddTopic(section.id)}
                />
                <button
                  type="button"
                  onClick={() => handleAddTopic(section.id)}
                  className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setNewTopicSection(null)}
                  className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setNewTopicSection(section.id)}
                className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Topic
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
