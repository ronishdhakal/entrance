export default function BookCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm">
      {/* Image Skeleton */}
      <div className="aspect-[3/4] w-full animate-pulse bg-gray-200" />

      {/* Content Skeleton */}
      <div className="flex flex-1 flex-col p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-gray-200" />

        <div className="mt-auto pt-4">
          <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </div>
  )
}
