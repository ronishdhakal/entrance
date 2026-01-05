"use client"

import { Calendar, DollarSign, FileText, AlertCircle, Users } from "lucide-react"

export default function ExamInfo({ exam }) {
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  const formatTime = (timeString) =>
    new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })

  return (
    <div className="bg-card border border-border rounded-lg p-4 sm:p-5">
      <h2 className="text-lg font-bold text-foreground mb-4">
        Exam Information
      </h2>

      {/* ===== ROW 1 ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
        {/* Exam Date & Time */}
        <div className="flex gap-3 p-3 bg-primary/5 rounded-md">
          <Calendar className="w-4.5 h-4.5 text-primary mt-0.5" />
          <div>
            <div className="text-xs text-muted-foreground">Exam Date & Time</div>
            <div className="font-semibold text-sm text-foreground">
              {formatDate(exam.exam_date)}
            </div>
            <div className="text-xs text-foreground">
              {formatTime(exam.exam_time)}
            </div>
          </div>
        </div>

        {/* Registration Period */}
        <div className="flex gap-3 p-3 bg-secondary/50 rounded-md">
          <Calendar className="w-4.5 h-4.5 text-primary mt-0.5" />
          <div>
            <div className="text-xs text-muted-foreground">Registration</div>
            <div className="text-xs text-foreground">
              <span className="font-medium">Open:</span>{" "}
              {formatDate(exam.opens_at)}
            </div>
            <div className="text-xs text-foreground">
              <span className="font-medium">Close:</span>{" "}
              {formatDate(exam.closes_at)}
            </div>
          </div>
        </div>

        {/* Application Fee */}
        {(exam.form_fee || exam.double_fee) && (
          <div className="flex gap-3 p-3 bg-secondary/50 rounded-md">
            <DollarSign className="w-4.5 h-4.5 text-primary mt-0.5" />
            <div>
              <div className="text-xs text-muted-foreground">Application Fee</div>
              {exam.form_fee && (
                <div className="text-xs text-foreground">
                  <span className="font-medium">Normal:</span>{" "}
                  {exam.form_fee}
                </div>
              )}
              {exam.double_fee && (
                <div className="text-xs text-foreground">
                  <span className="font-medium">Late:</span>{" "}
                  {exam.double_fee}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ===== ROW 2 ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Marks */}
        {(exam.full_mark || exam.pass_mark) && (
          <div className="flex gap-3 p-3 bg-secondary/50 rounded-md">
            <Users className="w-4.5 h-4.5 text-primary mt-0.5" />
            <div>
              <div className="text-xs text-muted-foreground">Marks</div>
              {exam.full_mark && (
                <div className="text-xs text-foreground">
                  <span className="font-medium">Full:</span>{" "}
                  {exam.full_mark}
                </div>
              )}
              {exam.pass_mark && (
                <div className="text-xs text-foreground">
                  <span className="font-medium">Pass:</span>{" "}
                  {exam.pass_mark}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Question Details */}
        <div className="flex gap-3 p-3 bg-secondary/50 rounded-md">
          <FileText className="w-4.5 h-4.5 text-primary mt-0.5" />
          <div>
            <div className="text-xs text-muted-foreground">Questions</div>
            <div className="text-xs text-foreground">
              <span className="font-medium">Total:</span>{" "}
              {exam.number_of_questions}
            </div>
            {exam.duration && (
              <div className="text-xs text-foreground">
                <span className="font-medium">Duration:</span>{" "}
                {exam.duration}
              </div>
            )}
          </div>
        </div>

        {/* Negative Marking */}
        {exam.negative_marking && (
          <div className="flex gap-3 p-3 bg-warning/10 rounded-md border border-warning/20">
            <AlertCircle className="w-4.5 h-4.5 text-warning mt-0.5" />
            <div>
              <div className="text-xs text-muted-foreground">
                Negative Marking
              </div>
              <div className="text-xs font-medium text-foreground">
                {exam.negative_marking}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
