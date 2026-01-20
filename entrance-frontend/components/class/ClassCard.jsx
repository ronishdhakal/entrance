import Link from "next/link"
import Image from "next/image"

export default function ClassCard({ data }) {
  return (
    <Link
      href={`/class/${data.slug}`}
      className="block border rounded-lg overflow-hidden hover:shadow-md transition"
    >
      <div className="relative h-44 bg-gray-100">
        {data.featured_image ? (
          <Image
            src={data.featured_image}
            alt={data.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No Image
          </div>
        )}
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg leading-snug">
          {data.title}
        </h3>

        <p className="text-sm text-gray-600">
          {data.university}
        </p>

        <div className="flex gap-3 text-xs text-gray-500">
          {data.is_online_available && <span>Online</span>}
          {data.is_physical_available && <span>Physical</span>}
        </div>
      </div>
    </Link>
  )
}
