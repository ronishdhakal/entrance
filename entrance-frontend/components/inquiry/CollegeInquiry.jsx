"use client"

import { useState, useEffect } from "react"
import { submitCollegeInquiry, fetchCourses } from "@/utils/api"
import { isAuthenticated, getCurrentUser } from "@/lib/auth"

export default function CollegeInquiry({ college, defaultCourseId = "" }) {
  const [courses, setCourses] = useState([])

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    course: defaultCourseId ? String(defaultCourseId) : "",
    message: "",
  })

  /* ✅ Keep course in sync (from course page) */
  useEffect(() => {
    if (defaultCourseId) {
      setForm((prev) => ({
        ...prev,
        course: String(defaultCourseId),
      }))
    }
  }, [defaultCourseId])

  /* ✅ Load all courses */
  useEffect(() => {
    const loadCourses = async () => {
      const data = await fetchCourses()
      const list = Array.isArray(data) ? data : data?.results || []
      setCourses(list)
    }
    loadCourses()
  }, [])

  /* ✅ AUTO-FILL USER DATA IF LOGGED IN */
  useEffect(() => {
    const autofillUser = async () => {
      if (isAuthenticated()) {
        try {
          const user = await getCurrentUser()
          if (user) {
            setForm((prev) => ({
              ...prev,
              full_name: user.full_name || "",
              email: user.email || "",
              phone: user.phone || "",
            }))
          }
        } catch (err) {
          console.error("Failed to load user info")
        }
      }
    }

    autofillUser()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await submitCollegeInquiry({
      ...form,
      college: college.id,
      course: form.course ? Number(form.course) : null,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="w-full text-gray-800 space-y-6">
      {/* Greeting */}
      <p className="text-lg font-medium">
        Hey <span className="font-semibold">{college.title}</span>,
      </p>

      {/* Name */}
      <p className="leading-relaxed">
        My name is{" "}
        <input
          type="text"
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          placeholder="your full name"
          required
          className="inline-block min-w-[180px] border-b border-gray-400 focus:outline-none focus:border-primary px-1 mx-1 bg-transparent"
        />
        .
      </p>

      {/* Course */}
      <div>
        <p className="mb-2">I want to study</p>
        <select
          name="course"
          value={form.course}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          <option value="">Select a course</option>
          {courses.map((course) => (
            <option key={course.id} value={String(course.id)}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      {/* Phone */}
      <div>
        <p className="mb-2">Please call me at</p>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone number"
          required
          className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      {/* Email */}
      <div>
        <p className="mb-2">or contact me via</p>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email address"
          className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      {/* Message */}
      <div>
        <p className="mb-2">I want to inquire about</p>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          placeholder="I want to inquire about....."
          className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-md font-medium hover:opacity-90 transition"
      >
        Submit Inquiry
      </button>
    </form>
  )
}
