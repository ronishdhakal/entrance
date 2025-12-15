"use client"

import { Card } from "@/components/ui/card"
import { AlertCircle, Info } from "lucide-react"

export function TestInstructions({ mockTest }) {
  const defaultInstructions = [
    "Read each question carefully before selecting your answer",
    "You can navigate between questions using the navigation panel",
    "Your progress is automatically saved",
    "Submit your test before the time runs out",
    "You can review and change answers before final submission",
  ]

  const instructions = mockTest.instructions
    ? mockTest.instructions.split("\n").filter((i) => i.trim())
    : defaultInstructions

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Info className="size-5 text-primary" />
        Instructions
      </h2>
      <ul className="space-y-3">
        {instructions.map((instruction, index) => (
          <li key={index} className="flex items-start gap-3 text-sm leading-relaxed">
            <div className="flex items-center justify-center size-5 rounded-full bg-primary/10 text-primary font-medium text-xs mt-0.5">
              {index + 1}
            </div>
            <span className="flex-1">{instruction}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900">
        <div className="flex items-start gap-3">
          <AlertCircle className="size-5 text-amber-600 dark:text-amber-500 mt-0.5" />
          <div className="text-sm text-amber-900 dark:text-amber-100">
            <p className="font-semibold mb-1">Important Note</p>
            <p className="text-amber-800 dark:text-amber-200">
              Make sure you have a stable internet connection throughout the test. Your test will be automatically
              submitted when time runs out.
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
