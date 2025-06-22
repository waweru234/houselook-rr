"use client"

import { useEffect, useState } from "react"
import { getDatabase, ref, onValue } from "firebase/database"
import { app } from "@/lib/firebase" // <-- Make sure this is your Firebase initialized app
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Heart, Play, Sparkles } from "lucide-react"

interface Property {
  id: string
  image2Url: string
  furnished: string
  rent: number
  town: string
}

// Static background hero section images
const backgroundImages = [
  "/images/luxury-complex-aerial.webp",
  "/images/modern-apartments-1.jpeg",
  "/images/contemporary-apartments.jpeg",
  "/images/luxury-balcony.jpeg",
]

export function HeroSection() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0)
  const [properties, setProperties] = useState<Property[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  // Rotate background images
  useEffect(() => {
    const bgTimer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 5000)
    return () => clearInterval(bgTimer)
  }, [])

  // Fetch properties from Firebase
  useEffect(() => {
    const db = getDatabase(app)
    const refPath = ref(db, "property")
    const unsubscribe = onValue(refPath, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const list: Property[] = Object.entries(data).map(([id, prop]: any) => ({
          id,
          image2Url: prop.image2Url || "",
          furnished: prop.furnished || "Not specified",
          rent: prop.rent || 0,
          town: prop.town || "Unknown",
        }))
        setProperties(list)
      }
    })
    return () => unsubscribe()
  }, [])

  // Rotate interior property showcase
  useEffect(() => {
    if (properties.length < 2) return
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % properties.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [properties])

  const current = properties[currentIndex]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden font-professional">
      {/* 🔁 Background Image Slider */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentBgIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              alt={`Background ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
        {/* Overlay layers */}
        <div className="absolute inset-0 bg-houselook-black/40" />
        <div className="absolute inset-0 bg-gradient-to-br from-houselook-indigo/20 via-houselook-black/30 to-houselook-cyan/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-houselook-black/50 via-houselook-black/20 to-houselook-black/30" />
      </div>

      {/* Floating Sparkles & Glow */}
      <div className="absolute top-24 left-8 animate-professional-float opacity-60">
        <div className="w-8 h-8 bg-houselook-cyan/30 rounded-full flex items-center justify-center shadow-professional">
          <Sparkles className="w-4 h-4 text-houselook-cyan" />
        </div>
      </div>
      <div className="absolute bottom-40 right-12 animate-professional-pulse opacity-50">
        <div className="w-6 h-6 bg-houselook-indigo/40 rounded-full"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <div className="text-left">
            <div className="mb-6">
              <div className="inline-flex items-center px-4 py-2 bg-houselook-white/10 backdrop-blur-md border border-houselook-cyan/30 rounded-full shadow-professional mb-6">
                <div className="w-2 h-2 bg-houselook-cyan rounded-full mr-2 animate-professional-pulse"></div>
                <span className="text-houselook-white font-medium text-sm font-heading">
                  🏠 Kenya's Premier Housing Platform
                </span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-3 font-heading">
              <span className="block">
                <span className="text-houselook-white">Find Your </span>
                <span className="bg-gradient-primary bg-clip-text text-transparent">Vibe</span>
              </span>
              <span className="block">
                <span className="text-houselook-white">Find Your </span>
                <span className="bg-gradient-secondary bg-clip-text text-transparent">Crib</span>
              </span>
            </h1>
            <p className="text-lg md:text-xl font-semibold text-houselook-cyan mb-4 font-heading">
              ✨ Where Style Meets Comfort ✨
            </p>
            <p className="text-lg md:text-xl text-houselook-white/90 mb-8 max-w-2xl leading-relaxed">
              Discover Kenya's most <span className="text-houselook-cyan font-semibold">stylish rentals</span> designed
              for <span className="text-houselook-indigo font-semibold">modern lifestyle</span>. From contemporary
              apartments to cozy spaces - your <span className="text-houselook-cyan font-semibold">perfect home</span>{" "}
              awaits!
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/listings">
                <Button
                  size="lg"
                  className="bg-gradient-primary text-houselook-white text-lg px-8 py-4 shadow-professional-xl hover:shadow-cyan-glow transition-all duration-300 hover:scale-105 group font-bold border border-houselook-cyan/30 rounded-xl font-heading"
                >
                  <Sparkles className="mr-2 w-5 h-5" />
                  Start House Hunting
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 bg-houselook-white/10 backdrop-blur-md border-2 border-houselook-white/30 text-houselook-white hover:bg-houselook-cyan/10 hover:border-houselook-cyan/50 transition-all duration-300 hover:scale-105 font-semibold rounded-xl"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md">
              <div className="text-center group">
                <div className="text-2xl md:text-3xl font-black bg-gradient-primary bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform font-heading">
                  500+
                </div>
                <div className="text-houselook-white/70 font-medium text-sm">Houses Listed</div>
              </div>
              <div className="text-center group">
                <div className="text-2xl md:text-3xl font-black bg-gradient-secondary bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform font-heading">
                  50+
                </div>
                <div className="text-houselook-white/70 font-medium text-sm">Locations</div>
              </div>
              <div className="text-center group">
                <div className="text-2xl md:text-3xl font-black bg-gradient-primary bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform font-heading">
                  1000+
                </div>
                <div className="text-houselook-white/70 font-medium text-sm">Happy Tenants</div>
              </div>
            </div>
          </div>

          {/* Right - Interior Showcase from Firebase */}
          {current && (
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute -inset-3 bg-gradient-primary rounded-2xl opacity-20 blur-xl"></div>
                <div className="relative h-80 rounded-2xl overflow-hidden shadow-professional-xl border-2 border-houselook-white/20 backdrop-blur-sm">
                  <Image
                    src={current.image2Url}
                    alt="Property Interior"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-houselook-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-houselook-white/95 backdrop-blur-md rounded-xl p-3 border border-houselook-white/30 shadow-professional">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <p className="text-sm font-bold bg-gradient-primary bg-clip-text text-transparent font-heading">
                            {current.furnished}
                          </p>
                          <p className="text-xs text-houselook-coolGray font-medium">{current.town}</p>
                        </div>
                        <div className="text-lg font-black bg-gradient-primary bg-clip-text text-transparent font-heading">
                          KSh {current.rent.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center border-2 border-houselook-white/30 shadow-professional-lg animate-professional-float">
                  <Heart className="w-6 h-6 text-houselook-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center border-2 border-houselook-white/30 shadow-professional-lg animate-professional-pulse">
                  <MapPin className="w-6 h-6 text-houselook-white" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-professional-float">
        <div className="w-6 h-10 border-2 border-houselook-white/50 rounded-full flex justify-center bg-gradient-to-b from-transparent to-houselook-white/5">
          <div className="w-1 h-3 bg-gradient-primary rounded-full mt-2 animate-professional-pulse"></div>
        </div>
      </div>
    </section>
  )
}
