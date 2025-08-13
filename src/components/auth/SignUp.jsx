"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

export default function SignUp() {
  const navigate = useNavigate()
  const { signup, loginWithGoogle } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }))
    }
  }

  const handleGoogleSignUp = () => {
    try {
      loginWithGoogle();
    } catch (error) {
      console.error('Google sign up error:', error);
      setErrors(prev => ({
        ...prev,
        submit: "Failed to initiate Google sign up"
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    try {
      const result = await signup(formData)
      
      if (result.success) {
        // Navigate to dashboard after successful signup
        navigate('/dashboard', { replace: true })
      } else {
        setErrors(prev => ({
          ...prev,
          submit: result.error || "Signup failed"
        }))
      }
    } catch (error) {
      console.error('Signup error:', error)
      setErrors(prev => ({
        ...prev,
        submit: "An unexpected error occurred"
      }))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - RECOLLAB Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-black">
        <img src="https://images.unsplash.com/photo-1749315098378-4671599e1d81?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8"
        className="w-full h-full object-cover"
        alt="" />
      </div>

      {/* Right side - Sign Up Form */}
      <div className="w-full lg:w-1/2 bg-black flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-2xl font-semibold text-white">Sign Up Account</h1>
            <p className="text-gray-400 text-sm">Enter your personal data to create your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Google Sign Up Button */}
            <button 
              type="button"
              onClick={handleGoogleSignUp}
              className="w-full bg-transparent border border-gray-700 text-white flex items-center justify-center py-2 rounded hover:bg-gray-800 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-black px-2 text-gray-400">Or</span>
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-white text-sm">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="eg: John"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className={`border ${errors.firstName ? 'border-red-500' : 'border-gray-700'} text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600 w-full rounded px-3 py-2`}
                />
                {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-white text-sm">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="eg: Francisco"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className={`border ${errors.lastName ? 'border-red-500' : 'border-gray-700'} text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600 w-full rounded px-3 py-2`}
                />
                {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-white text-sm">Email</label>
              <input
                id="email"
                type="email"
                placeholder="eg: johnfrancisco@gmail.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`border ${errors.email ? 'border-red-500' : 'border-gray-700'} text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600 w-full rounded px-3 py-2`}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-white text-sm">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={`border ${errors.password ? 'border-red-500' : 'border-gray-700'} text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600 w-full rounded px-3 py-2 pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
              <p className="text-xs text-gray-500">Must be at least 8 characters.</p>
            </div>

            {errors.submit && (
              <p className="text-red-500 text-sm text-center">{errors.submit}</p>
            )}

            {/* Sign Up Button */}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black hover:bg-gray-100 font-medium py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <button 
                type="button"
                onClick={() => navigate("/login")}
                className="text-white hover:underline font-medium"
              >
                Log in
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
