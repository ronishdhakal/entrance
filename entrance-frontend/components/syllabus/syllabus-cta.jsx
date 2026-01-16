import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function SyllabusCTA() {
  return (
    <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold">Ready to Master This Syllabus?</h2>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
          Start preparing with our comprehensive study materials and practice tests
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary">
            Start Practice
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
            Download Syllabus
          </Button>
        </div>
      </div>
    </Card>
  )
}
