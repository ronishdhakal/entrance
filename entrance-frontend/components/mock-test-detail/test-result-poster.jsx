"use client"

import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowLeft, Globe } from "lucide-react"

export function TestResultPoster({ result, mockTest }) {
  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br from-blue-100 via-blue-50 to-white
        flex items-start justify-center
        px-3
        pt-2 pb-1
        sm:px-4 sm:pt-3 sm:pb-2
        lg:px-0 lg:pt-3 lg:pb-2
      "
    >
      <Card className="w-full max-w-md sm:max-w-lg shadow-2xl relative overflow-hidden">
        {/* ===== BRAND STRIP ===== */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-primary" />

        <div className="p-6 sm:p-8">
          {/* ===== BRAND HEADER ===== */}
          <div className="flex flex-col items-center text-center mb-5">
            <Image
              src="/assets/logo.svg"
              alt="Entrance College Info Nepal"
              width={160}
              height={44}
              priority
            />
            <div className="flex items-center gap-2 mt-1 text-sm font-medium text-primary">
              <Globe className="size-4" />
              entrance.collegeinfonepal.com
            </div>
          </div>

          {/* ===== TITLE ===== */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
              Mock Test Completed
            </h1>
            <CheckCircle className="size-6 sm:size-7 text-green-500 shrink-0" />
          </div>

          <p className="text-center text-muted-foreground mb-5">
            {mockTest.title}
          </p>

          {/* ===== SCORE ===== */}
          <div className="bg-white rounded-2xl border shadow-sm p-5 mb-5 text-center">
            <div className="text-sm text-muted-foreground mb-1">
              Your Score
            </div>
            <div className="text-5xl font-extrabold text-primary leading-none">
              {result.score}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Status:{" "}
              <span className="font-semibold">
                {result.status === "submitted"
                  ? "Completed"
                  : "Auto Submitted"}
              </span>
            </div>
          </div>

          {/* ===== ACTIONS ===== */}
          <div className="flex gap-3">
            <Button className="w-full text-base font-semibold" asChild>
              <Link href="/dashboard">
                View More Tests
              </Link>
            </Button>

            {/* <Button
              variant="outline"
              className="w-full text-base font-semibold"
              asChild
            >
              <Link href="/dashboard">
                <ArrowLeft className="size-4 mr-2" />
                Dashboard
              </Link>
            </Button> */}
          </div>

          {/* ===== FOOTER ===== */}
          <div className="mt-4 pt-3 border-t text-center text-xs text-muted-foreground">
            Generated on{" "}
            <span className="font-medium text-foreground">
              entrance.collegeinfonepal.com
            </span>
            <br />
            Powered by College Info Nepal
          </div>
        </div>
      </Card>
    </div>
  )
}
