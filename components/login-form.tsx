"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles, Home } from "lucide-react"
import { useRouter } from "next/navigation"
import { loginWithEmail, loginWithGoogle } from "@/lib/auth"
export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isAnimated, setIsAnimated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)

  try {
    await loginWithEmail(email, password)
    router.push("/dashboard")
  } catch (err) {
    console.error(err)
    alert("Login failed. Check credentials.")
  } finally {
    setIsLoading(false)
  }
}

const handleGoogleLogin = async () => {
  setIsLoading(true)
  try {
    await loginWithGoogle()
    router.push("/dashboard")
  } catch (err) {
    console.error(err)
    alert("Google login failed")
  } finally {
    setIsLoading(false)
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-br from-houselook-cyan/10 to-houselook-teal/5 blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-houselook-indigo/8 to-houselook-cyan/5 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Floating Elements */}
        <div className="absolute top-32 right-1/4 animate-bounce opacity-20" style={{ animationDelay: "0.5s" }}>
          <Sparkles className="w-8 h-8 text-houselook-cyan" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-bounce opacity-15" style={{ animationDelay: "1.5s" }}>
          <Home className="w-6 h-6 text-houselook-indigo" />
        </div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div
          className={`text-center transition-all duration-1000 ${isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <Link href="/" className="inline-flex items-center space-x-3 mb-8 group">
            <div className="w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
              <Image
                src="/images/houselook-logo.png"
                alt="HouseLook Logo"
                width={64}
                height={64}
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
            <span className="text-3xl font-black font-heading tracking-tight">
              <span className="text-houselook-black">House</span>
              <span className="text-houselook-cyan">Look</span>
            </span>
          </Link>

          <h1 className="text-4xl font-black font-heading text-houselook-black mb-2">Welcome Back! 👋</h1>
          <p className="text-lg text-houselook-darkGray">Sign in to continue your house hunting journey</p>
        </div>

        {/* Login Card */}
        <Card
          className={`bg-white/80 backdrop-blur-md shadow-soft-xl border border-houselook-coolGray/20 rounded-2xl transition-all duration-1000 delay-300 ${isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-houselook-black font-heading">Sign In</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Google Login Button */}
            <Button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm hover:shadow-md transition-all duration-300 py-3 rounded-xl font-semibold"
            >
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {isLoading ? "Signing in..." : "Continue with Google"}
              </div>
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-houselook-coolGray/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-houselook-coolGray font-medium">Or continue with email</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="email" className="text-sm font-semibold text-houselook-darkGray mb-2 block">
                  Email Address
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-houselook-coolGray">
                    <Mail className="w-5 h-5" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10 h-12 border-houselook-aliceblue focus:border-houselook-cyan rounded-xl"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-semibold text-houselook-darkGray mb-2 block">
                  Password
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-houselook-coolGray">
                    <Lock className="w-5 h-5" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 h-12 border-houselook-aliceblue focus:border-houselook-cyan rounded-xl"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-houselook-coolGray hover:text-houselook-cyan transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-houselook-cyan focus:ring-houselook-cyan border-houselook-coolGray rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-houselook-darkGray">
                    Remember me
                  </label>
                </div>

                <Link
                  href="/forgot-password"
                  className="text-sm text-houselook-cyan hover:text-houselook-teal font-semibold transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-houselook-cyan hover:bg-houselook-teal text-houselook-black font-bold py-3 shadow-soft-lg hover:shadow-cyan-glow transition-all duration-300 hover:scale-[1.02] rounded-xl font-heading"
              >
                <div className="flex items-center justify-center">
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-houselook-black/30 border-t-houselook-black rounded-full animate-spin mr-2"></div>
                  ) : (
                    <ArrowRight className="w-5 h-5 mr-2" />
                  )}
                  {isLoading ? "Signing In..." : "Sign In"}
                </div>
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center pt-4 border-t border-houselook-coolGray/20">
              <p className="text-houselook-darkGray">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-houselook-cyan hover:text-houselook-teal font-semibold transition-colors"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div
          className={`text-center text-sm text-houselook-coolGray transition-all duration-1000 delay-500 ${isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p>
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-houselook-cyan hover:text-houselook-teal transition-colors">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-houselook-cyan hover:text-houselook-teal transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
