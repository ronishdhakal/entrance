export const dynamic = "force-dynamic"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { fetchNews } from "@/utils/api"
import { NewsCard } from "@/components/news/news-card"
import { NewsHeader } from "@/components/news/news-header"

export const metadata = {
  title: "Latest News & Updates | Entrance College Info",
  description:
    "Stay updated with the latest education news, announcements, entrance updates, and important notices.",
}

export default async function NewsPage() {
  const newsList = await fetchNews()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gray-50">
        {/* Page Header */}
        <NewsHeader />

        {/* News Grid */}
        <section className="container mx-auto px-4 py-12">
          {newsList && newsList.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {newsList.map((news) => (
                <NewsCard key={news.id} {...news} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                No News Available
              </h2>
              <p className="text-muted-foreground">
                Please check back later for the latest updates.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
