import { Eye, EyeOff, Lock } from "lucide-react"

export default function RegisterPassword({
  formData,
  handleChange,
  showPassword,
  showPassword2,
  setShowPassword,
  setShowPassword2,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
            className="w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type={showPassword2 ? "text" : "password"}
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            required
            minLength={8}
            className="w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword2(!showPassword2)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword2 ? <EyeOff /> : <Eye />}
          </button>
        </div>
      </div>
    </div>
  )
}
