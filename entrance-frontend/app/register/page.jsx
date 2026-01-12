"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { API_URL } from "@/lib/api-config"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

import RegisterHeader from "@/components/register/RegisterHeader"
import RegisterForm from "@/components/register/RegisterForm"
import RegisterFooter from "@/components/register/RegisterFooter"

export default function RegisterPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: "",
    full_name: "",
    phone: "",
    address: "",
    preparing_for: "",
    password: "",
    password2: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (formData.password !== formData.password2) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`${API_URL}/auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          full_name: formData.full_name,
          phone: formData.phone,
          address: formData.address,
          preparing_for: formData.preparing_for,
          password: formData.password,
          password_confirm: formData.password2,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        alert("Registration successful! Please login.")
        router.push("/login")
      } else {
        const errorMessages = []

        for (const key in data) {
          if (Array.isArray(data[key])) {
            errorMessages.push(...data[key])
          } else if (typeof data[key] === "string") {
            errorMessages.push(data[key])
          }
        }

        setError(errorMessages.join(" ") || "Registration failed.")
      }
    } catch (err) {
      setError(
        "Network error. Please check your connection or if the backend is running."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <Navbar />

        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <RegisterHeader />

            {/* Form */}
            <RegisterForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              loading={loading}
              error={error}
              showPassword={showPassword}
              showPassword2={showPassword2}
              setShowPassword={setShowPassword}
              setShowPassword2={setShowPassword2}
            />

            {/* Footer Links */}
            <RegisterFooter />
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
