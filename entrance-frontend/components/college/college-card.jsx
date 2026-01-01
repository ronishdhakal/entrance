"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, Phone, Globe, BadgeCheck, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import CollegeInquiry from "@/components/inquiry/CollegeInquiry"

export default function CollegeCard({ college, defaultCourseId = "" }) {
  const detailLink = college.external_link
    ? college.external_link
    : `/college/${college.slug}`

  const isExternal = Boolean(college.external_link)
  const isVerified = college.is_verified === true

  const [showInquiry, setShowInquiry] = useState(false)

  const LinkWrapper = ({ children, className }) =>
    isExternal ? (
      <a
        href={detailLink}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    ) : (
      <Link href={detailLink} className={className}>
        {children}
      </Link>
    )

  return (
    <>
      <Card className="w-full overflow-hidden rounded-2xl border bg-white hover:shadow-md transition-shadow">
        {/* COVER IMAGE */}
        <LinkWrapper className="relative block w-full h-[200px] bg-gray-100">
          <img
            src={college.cover || "/placeholder.svg"}
            alt={college.title}
            className="w-full h-full object-cover"
          />

          {college.logo && (
            <div className="absolute bottom-3 left-3 bg-white rounded-xl p-2 shadow-md">
              <img
                src={college.logo}
                alt={`${college.title} logo`}
                className="w-12 h-12 object-contain"
              />
            </div>
          )}
        </LinkWrapper>

        {/* CONTENT */}
        <div className="flex flex-col justify-between px-6 py-4">
          {/* TOP */}
          <div>
            <LinkWrapper className="inline-flex items-center gap-2 group">
              <h3 className="text-xl font-semibold text-gray-900 leading-tight group-hover:text-[#1ca3fd] transition-colors">
                {college.title}
              </h3>

              {isVerified && (
                <BadgeCheck
                  size={18}
                  className="text-[#1ca3fd] flex-shrink-0"
                />
              )}
            </LinkWrapper>

            {college.university_name && (
              <p className="text-sm text-gray-500 mt-0.5">
                Affiliated to {college.university_name}
              </p>
            )}

            {college.course_titles?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {college.course_titles.map((course, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs font-medium text-[#1ca3fd] bg-blue-50 rounded-full"
                  >
                    {course}
                  </span>
                ))}
              </div>
            )}

            {college.description && (
              <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                {college.description}
              </p>
            )}
          </div>

          {/* INFO */}
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
            {college.location && (
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#1ca3fd]" />
                <span>{college.location}</span>
              </div>
            )}

            {college.phone && (
              <a
                href={`tel:${college.phone}`}
                className="flex items-center gap-2 hover:text-[#1ca3fd]"
              >
                <Phone size={16} className="text-[#1ca3fd]" />
                {college.phone}
              </a>
            )}

            {college.website && (
              <a
                href={college.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#1ca3fd]"
              >
                <Globe size={16} className="text-[#1ca3fd]" />
                {college.website.replace(/^https?:\/\//, "")}
              </a>
            )}
          </div>

          {/* CTA BUTTON */}
          <div className="mt-5">
            <button
              onClick={() => setShowInquiry(true)}
              className={`w-full px-4 py-2 rounded-md font-medium transition
                ${
                  isVerified
                    ? "bg-[#1ca3fd] text-white hover:opacity-90"
                    : "border border-[#1ca3fd] text-[#1ca3fd] hover:bg-blue-50"
                }
              `}
            >
              {isVerified ? "Apply Now" : "Inquiry Now"}
            </button>
          </div>
        </div>
      </Card>

      {/* INQUIRY MODAL */}
      {showInquiry && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-lg rounded-xl relative p-6">
            <button
              onClick={() => setShowInquiry(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            {/* ✅ PASS COURSE CONTEXT */}
            <CollegeInquiry
              college={college}
              defaultCourseId={defaultCourseId}
            />
          </div>
        </div>
      )}
    </>
  )
}
