"use client"

import { Calendar, DollarSign, FileText, AlertCircle, Users } from "lucide-react"

export default function ExamInfo({ exam }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-6">
      <h2 className="text-xl font-bold text-foreground mb-6">Exam Information</h2>

      <div className="space-y-4">
        {/* Exam Date & Time */}
        <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
          <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="text-sm text-muted-foreground mb-1">Exam Date & Time</div>
            <div className="font-semibold text-foreground">{formatDate(exam.exam_date)}</div>
            <div className="text-sm text-foreground">{formatTime(exam.exam_time)}</div>
          </div>
        </div>

        {/* Registration Period */}
        <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
          <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="text-sm text-muted-foreground mb-1">Registration Period</div>
            <div className="text-sm text-foreground">
              <div className="font-medium">Opens: {formatDate(exam.opens_at)}</div>
              <div className="font-medium">Closes: {formatDate(exam.closes_at)}</div>
            </div>
          </div>
        </div>

        {/* Fees */}
        {(exam.form_fee || exam.double_fee) && (
          <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
            <DollarSign className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm text-muted-foreground mb-1">Application Fee</div>
              {exam.form_fee && (
                <div className="text-sm text-foreground">
                  <span className="font-medium">Normal: </span>
                  {exam.form_fee}
                </div>
              )}
              {exam.double_fee && (
                <div className="text-sm text-foreground">
                  <span className="font-medium">Late: </span>
                  {exam.double_fee}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Marks */}
        {(exam.full_mark || exam.pass_mark) && (
          <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
            <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm text-muted-foreground mb-1">Marks</div>
              {exam.full_mark && (
                <div className="text-sm text-foreground">
                  <span className="font-medium">Full Marks: </span>
                  {exam.full_mark}
                </div>
              )}
              {exam.pass_mark && (
                <div className="text-sm text-foreground">
                  <span className="font-medium">Pass Marks: </span>
                  {exam.pass_mark}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Question Details */}
        <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
          <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="text-sm text-muted-foreground mb-1">Question Details</div>
            <div className="text-sm text-foreground">
              <div>
                <span className="font-medium">Total: </span>
                {exam.number_of_questions} Questions
              </div>
              {exam.question_type && (
                <div>
                  <span className="font-medium">Type: </span>
                  {exam.question_type}
                </div>
              )}
              {exam.duration && (
                <div>
                  <span className="font-medium">Duration: </span>
                  {exam.duration}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Negative Marking */}
        {exam.negative_marking && (
          <div className="flex items-start gap-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
            <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm text-muted-foreground mb-1">Negative Marking</div>
              <div className="text-sm text-foreground font-medium">{exam.negative_marking}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
