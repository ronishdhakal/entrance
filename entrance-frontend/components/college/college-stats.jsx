import { Building2, GraduationCap, Award } from "lucide-react"

export default function CollegeStats({ totalColleges, courseName }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
        <Building2 className="w-12 h-12 text-[#1ca3fd] mx-auto mb-3" />
        <div className="text-3xl font-bold text-gray-900 mb-1">{totalColleges}</div>
        <div className="text-sm text-gray-600">Total Colleges</div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
        <GraduationCap className="w-12 h-12 text-[#1ca3fd] mx-auto mb-3" />
        <div className="text-xl font-bold text-gray-900 mb-1">{courseName || "All Courses"}</div>
        <div className="text-sm text-gray-600">Program</div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
        <Award className="w-12 h-12 text-[#1ca3fd] mx-auto mb-3" />
        <div className="text-3xl font-bold text-gray-900 mb-1">100%</div>
        <div className="text-sm text-gray-600">Verified Listings</div>
      </div>
    </div>
  )
}
