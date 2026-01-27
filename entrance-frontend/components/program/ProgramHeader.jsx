"use client"

export default function ProgramHeader({ program }) {
  return (
    <section className="pt-6 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* PAGE TITLE (H1) */}
        <h1 className="text-3xl md:text-4xl font-semibold leading-snug mb-2 text-foreground">
          Free {program.abbreviation} Entrance Preparation – Old Questions & Mock Tests
        </h1>

        {/* Program Name (linked if external link exists) */}
        {program.external_link ? (
          <a
            href={program.external_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-base md:text-lg font-medium text-primary hover:underline mb-4"
          >
            {program.title}
          </a>
        ) : (
          <p className="text-base md:text-lg font-medium text-muted-foreground mb-4">
            {program.title}
          </p>
        )}

        {/* Rich text description */}
        {program.description && (
          <div
            className="
              max-w-4xl
              prose prose-sm text-muted-foreground
              prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-6 prose-h2:mb-3
              prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-5 prose-h3:mb-2
              prose-ul:list-disc prose-ul:pl-6 prose-ul:my-3
              prose-li:my-1
            "
            dangerouslySetInnerHTML={{
              __html: program.description,
            }}
          />
        )}

      </div>
    </section>
  )
}
