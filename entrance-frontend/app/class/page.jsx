import { fetchClasses } from "@/utils/api"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

import ClassCard from "@/components/class/ClassCard"

export default async function ClassPage() {
  const classes = await fetchClasses()

  return (
    <>
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">
              Entrance Preparation Classes
            </h1>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Explore expert-led entrance preparation classes available both
              online and physically to help you succeed in your exams.
            </p>
          </div>

          {/* Classes Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {classes.length > 0 ? (
              classes.map((item) => (
                <ClassCard key={item.id} data={item} />
              ))
            ) : (
              <p className="text-gray-500">
                No classes available at the moment.
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
