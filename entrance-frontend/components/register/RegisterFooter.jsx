import Link from "next/link"

export default function RegisterFooter() {
  return (
    <>
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>

      <div className="text-center mt-6">
        <Link href="/" className="text-gray-600 text-sm hover:underline">
          ← Back to Home
        </Link>
      </div>
    </>
  )
}
