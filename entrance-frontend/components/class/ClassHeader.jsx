import Image from "next/image"

export default function ClassHeader({ data }) {
  return (
    <section className="grid md:grid-cols-2 gap-6 items-center">
      <div>
        <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
        <p className="text-gray-600">{data.university}</p>
      </div>

      {data.featured_image && (
        <div className="relative h-56 rounded-lg overflow-hidden">
          <Image
            src={data.featured_image}
            alt={data.title}
            fill
            className="object-cover"
          />
        </div>
      )}
    </section>
  )
}
