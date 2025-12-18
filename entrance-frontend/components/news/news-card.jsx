import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Calendar } from "lucide-react"

function stripHtml(html) {
  if (!html) return ""
  return html.replace(/<[^>]*>?/gm, "")
}

export function NewsCard({
  title,
  slug,
  description,
  featured_image,
  created_at,
}) {
  const formattedDate = new Date(created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const plainDescription = stripHtml(description)

  return (
    <Link href={`/news/${slug}`}>
      <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
        {featured_image && (
          <div className="relative w-full h-48 overflow-hidden">
            <img
              src={`http://127.0.0.1:8000${featured_image}`}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* ✅ Clean text preview */}
          <p className="text-muted-foreground line-clamp-3 text-sm">
            {plainDescription}
          </p>
        </CardContent>

        <CardFooter className="px-6 pb-6 pt-0">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            {formattedDate}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
