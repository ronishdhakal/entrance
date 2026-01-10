import { UserPlus } from "lucide-react"
import RegisterBasicInfo from "./RegisterBasicInfo"
import RegisterPassword from "./RegisterPassword"

export default function RegisterForm({
  formData,
  handleChange,
  handleSubmit,
  loading,
  error,
  showPassword,
  showPassword2,
  setShowPassword,
  setShowPassword2,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <RegisterBasicInfo
          formData={formData}
          handleChange={handleChange}
        />

        <RegisterPassword
          formData={formData}
          handleChange={handleChange}
          showPassword={showPassword}
          showPassword2={showPassword2}
          setShowPassword={setShowPassword}
          setShowPassword2={setShowPassword2}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3.5 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <UserPlus className="w-5 h-5" />
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>
    </div>
  )
}
