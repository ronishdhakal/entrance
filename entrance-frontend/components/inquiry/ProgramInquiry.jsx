"use client"

import { useState, useEffect } from "react"
import { submitProgramInquiry } from "@/utils/api"
import { isAuthenticated, getCurrentUser } from "@/lib/auth"

export default function ProgramInquiry({ program }) {
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    message: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  // ✅ AUTO-FILL USER DATA IF LOGGED IN
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
    setLoading(true)
    setError(null)

    try {
      await submitProgramInquiry({
        ...form,
        program: program.id,
      })
      setSuccess(true)
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-green-700 space-y-2">
        <p className="text-lg font-medium">Thanks for reaching out!</p>
        <p className="text-sm text-green-600">
          We’ll get back to you shortly regarding{" "}
          <strong>{program.title}</strong>. Call us at +977 9745450062 for instant response. 
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full text-gray-800 space-y-6">
      {/* Greeting */}
      <p className="text-lg font-medium">Hey, College Info Nepal</p>

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

      {/* Program */}
      <p>
        I want to inquire about{" "}
        <span className="font-semibold">{program.title}</span>.
      </p>

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
          placeholder="Email address (optional)"
          className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      {/* Message */}
      <div>
        <p className="mb-2">I want to share</p>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          placeholder="Your message (optional)"
          className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-3 rounded-md font-medium hover:opacity-90 transition disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Submit Inquiry"}
      </button>
    </form>
  )
}
