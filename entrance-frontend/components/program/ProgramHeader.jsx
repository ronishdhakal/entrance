"use client"

export default function ProgramHeader({ program }) {
  return (
    <section className="pt-10 pb-14 bg-gradient-to-br from-primary/10 to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">

          {/* PAGE TITLE (H1) */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            {program.abbreviation} Entrance Mock Test & Old Questions
          </h1>

          {/* Program Name (supporting) */}
          <p className="text-lg md:text-xl font-medium text-foreground mb-4">
            {program.title}
          </p>

          {/* ✅ Rich text description */}
          {program.description && (
            <div className="prose prose-neutral dark:prose-invert mx-auto text-muted-foreground">
              <div
                dangerouslySetInnerHTML={{ __html: program.description }}
              />
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
