import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "lucide-react"

export function NewsDetail({ title, description, featured_image, created_at }) {
  const formattedDate = new Date(created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        {featured_image && (
          <div className="relative w-full h-48 overflow-hidden">
            <img
              src={`http://127.0.0.1:8000${featured_image}`}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <CardContent className="p-6 md:p-8">
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <Calendar className="w-4 h-4 mr-2" />
            {formattedDate}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
            {title}
          </h1>

          {/* ✅ RICH TEXT RENDERING */}
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
