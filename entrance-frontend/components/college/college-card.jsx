"use client"

import Link from "next/link"
import { MapPin, Phone, Globe, ExternalLink } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CollegeCard({ college }) {
  return (
    <Card className="flex w-full overflow-hidden rounded-2xl border bg-white hover:shadow-md transition-shadow">
      
      {/* LEFT: Cover + Logo */}
      <div className="relative w-[280px] h-[180px] flex-shrink-0 bg-gray-100">
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
      </div>

      {/* RIGHT: Details */}
      <div className="flex flex-col justify-between flex-1 px-6 py-4">
        
        {/* Top content */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 leading-tight">
            {college.title}
          </h3>

          {/* ✅ UPDATED: multiple courses */}
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
            <p className="mt-3 text-sm text-gray-600 line-clamp-2 max-w-3xl">
              {college.description}
            </p>
          )}
        </div>

        {/* Bottom row */}
        <div className="mt-4 flex items-center justify-between gap-6">
          
          {/* Info */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
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

          {/* CTA (unchanged) */}
          {college.external_link ? (
            <Button
              asChild
              className="bg-[#1ca3fd] hover:bg-[#1891e6] text-white whitespace-nowrap"
            >
              <a
                href={college.external_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                View
                <ExternalLink size={16} />
              </a>
            </Button>
          ) : (
            <Button
              asChild
              className="bg-[#1ca3fd] hover:bg-[#1891e6] text-white whitespace-nowrap"
            >
              <Link href={`/college/${college.slug}`}>
                View
              </Link>
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
