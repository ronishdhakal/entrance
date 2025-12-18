export const dynamic = "force-dynamic"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { notFound } from "next/navigation"
import { fetchNewsBySlug } from "@/utils/api"
import { NewsDetail } from "@/components/news/news-detail"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function NewsDetailPage(props) {
  // ✅ params is async in Next.js 15/16
  const { slug } = await props.params

  const news = await fetchNewsBySlug(slug)

  if (!news) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <Link href="/news">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to News
            </Button>
          </Link>
        </div>

        <NewsDetail {...news} />
      </main>

      <Footer />
    </div>
  )
}
