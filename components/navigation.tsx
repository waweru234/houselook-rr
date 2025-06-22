"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Home, Search, Info, Plus, User, LogIn, UserPlus } from "lucide-react"
import Image from "next/image"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem("isAuthenticated")
      const userData = localStorage.getItem("userData")

      if (authStatus === "true" && userData) {
        setIsAuthenticated(true)
        setUser(JSON.parse(userData))
      } else {
        setIsAuthenticated(false)
        setUser(null)
      }
    }

    // Initial check
    checkAuth()

    // Listen for storage changes (login/logout from other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "isAuthenticated" || e.key === "userData") {
        checkAuth()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Also listen for custom events (for same-tab updates)
    const handleAuthChange = () => {
      checkAuth()
    }

    window.addEventListener("authStateChanged", handleAuthChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("authStateChanged", handleAuthChange)
    }
  }, [])

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 font-sans">
      {/* Modern background with blur */}
      <div className="absolute inset-0 backdrop-blur-xl border-b border-houselook-coolGray/20 shadow-soft"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-all duration-300 relative">
              <div className="absolute inset-0 bg-houselook-cyan rounded-xl opacity-0 group-hover:opacity-20 transition-all duration-500 blur-sm"></div>
              <Image
                src="/images/houselook-logo.png"
                alt="HouseLook Logo"
                width={48}
                height={48}
                className="w-full h-full object-contain drop-shadow-lg relative z-10"
              />
            </div>
            <div className="relative">
              <span className="text-2xl font-black font-heading tracking-tight">
                <span className="text-houselook-blue">House</span>
                <span className="text-houselook-cyan">Look</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-6">
              <Link
                href="/"
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 font-semibold text-houselook-indigo${
                  isActive("/")
                    ? "text-houselook-white bg-houselook-cyan shadow-cyan-glow"
                    : "text-houselook-darkGray hover:text-houselook-cyan hover:bg-houselook-aliceblue"
                }`}
              >
                <Home className="w-4 h-4 mr-2 " />
                Home
              </Link>

              <Link
                href="/listings"
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 font-semibold text-houselook-indigo${
                  isActive("/listings")
                    ? "text-houselook-white bg-houselook-cyan shadow-cyan-glow"
                    : "text-houselook-darkGray hover:text-houselook-cyan hover:bg-houselook-aliceblue"
                }`}
              >
                <Search className="w-4 h-4 mr-2" />
                Browse Houses
              </Link>

              <Link
                href="/about"
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 font-semibold text-houselook-indigo${
                  isActive("/about")
                    ? "text-houselook-white bg-houselook-cyan shadow-cyan-glow"
                    : "text-houselook-blue hover:text-houselook-cyan hover:bg-houselook-aliceblue"
                }`}
              >
                <Info className="w-4 h-4 mr-2" />
                About
              </Link>
            </div>
          </div>

          {/* Authentication Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              // Authenticated User Menu
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 font-semibold text-houselook-blue ${
                    isActive("/dashboard")
                      ? "text-houselook-white bg-houselook-cyan shadow-cyan-glow"
                      : "text-houselook-indigo hover:text-houselook-cyan hover:bg-houselook-aliceblue"
                  }`}
                >
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
                <Link href="/list-property">
                  <Button className="bg-houselook-indigo hover:bg-houselook-teal text-houselook-white font-bold px-6 py-2 rounded-lg shadow-soft hover:shadow-indigo-glow transition-all duration-300 hover:scale-105">
                    <Plus className="w-4 h-4 mr-2" />
                    List Property
                  </Button>
                </Link>
              </div>
            ) : (
              // Guest User Menu
              <div className="flex items-center space-x-4">
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="border-houselook-coolGray text-houselook-darkGray hover:text-houselook-cyan hover:border-houselook-cyan font-semibold px-6 py-2 rounded-lg transition-all duration-300"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-houselook-cyan hover:bg-houselook-teal text-houselook-black font-bold px-6 py-2 rounded-lg shadow-soft hover:shadow-cyan-glow transition-all duration-300 hover:scale-105">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-houselook-darkGray hover:text-houselook-cyan p-2 rounded-lg"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-6 bg-houselook-white/95 backdrop-blur-md rounded-2xl mt-4 border border-houselook-coolGray/20 shadow-soft-lg">
            <div className="flex flex-col space-y-2 px-6">
              <Link
                href="/"
                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 font-semibold ${
                  isActive("/")
                    ? "text-houselook-cyan bg-houselook-aliceblue"
                    : "text-houselook-darkGray hover:text-houselook-cyan hover:bg-houselook-aliceblue"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Home className="w-5 h-5 mr-3" />
                Home
              </Link>

              <Link
                href="/listings"
                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 font-semibold ${
                  isActive("/listings")
                    ? "text-houselook-cyan bg-houselook-aliceblue"
                    : "text-houselook-darkGray hover:text-houselook-cyan hover:bg-houselook-aliceblue"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Search className="w-5 h-5 mr-3" />
                Browse Houses
              </Link>

              <Link
                href="/about"
                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 font-semibold ${
                  isActive("/about")
                    ? "text-houselook-cyan bg-houselook-aliceblue"
                    : "text-houselook-darkGray hover:text-houselook-cyan hover:bg-houselook-aliceblue"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Info className="w-5 h-5 mr-3" />
                About
              </Link>

              <div className="border-t border-houselook-coolGray/20 pt-4 mt-4">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <Link
                      href="/dashboard"
                      className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 font-semibold ${
                        isActive("/dashboard")
                          ? "text-houselook-cyan bg-houselook-aliceblue"
                          : "text-houselook-darkGray hover:text-houselook-cyan hover:bg-houselook-aliceblue"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="w-5 h-5 mr-3" />
                      Dashboard
                    </Link>
                    <Link href="/list-property" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-houselook-indigo hover:bg-houselook-teal text-houselook-white font-bold py-3 rounded-lg shadow-soft transition-all duration-300">
                        <Plus className="w-5 h-5 mr-2" />
                        List Property
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full border-houselook-coolGray text-houselook-darkGray hover:text-houselook-cyan font-semibold py-3 rounded-lg"
                      >
                        <LogIn className="w-5 h-5 mr-2" />
                        Login
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-houselook-cyan hover:bg-houselook-teal text-houselook-black font-bold py-3 rounded-lg shadow-soft transition-all duration-300">
                        <UserPlus className="w-5 h-5 mr-2" />
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
