"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  MapPin,
  Phone,
  MessageCircle,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Car,
  Shield,
  Home,
  Coins,
  AlertCircle,
  X,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface House {
  id: number
  title: string
  location: string
  price: number
  type: string
  images: string[]
  amenities: string[]
  available: boolean
  description: string
  features: string[]
  agent: {
    name: string
    phone: string
    whatsapp: string
  }
  coordinates: { lat: number; lng: number }
}

interface HouseDetailsProps {
  house: House
}

export function HouseDetails({ house }: HouseDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [userPoints, setUserPoints] = useState(0)
  const [hasViewedProperty, setHasViewedProperty] = useState(false)
  const [showPointsWarning, setShowPointsWarning] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Load user points
    const savedPoints = localStorage.getItem("userPoints")
    const points = savedPoints ? Number.parseInt(savedPoints) : 100
    setUserPoints(points)

    // Check if user has already viewed this property
    const viewedProperties = JSON.parse(localStorage.getItem("viewedProperties") || "[]")
    const alreadyViewed = viewedProperties.includes(house.id)

    if (!alreadyViewed) {
      if (points >= 20) {
        // Deduct 20 points for viewing
        const newPoints = points - 20
        setUserPoints(newPoints)
        localStorage.setItem("userPoints", newPoints.toString())

        // Mark property as viewed
        viewedProperties.push(house.id)
        localStorage.setItem("viewedProperties", JSON.stringify(viewedProperties))

        setHasViewedProperty(true)

        // Show success message
        setTimeout(() => {
          alert("20 points deducted for viewing property details")
        }, 1000)
      } else {
        setShowPointsWarning(true)
      }
    } else {
      setHasViewedProperty(true)
    }
  }, [house.id, router])

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen)
  }

  const handleTopUpPoints = () => {
    router.push("/dashboard")
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === house.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? house.images.length - 1 : prev - 1))
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wi-fi":
      case "wifi":
        return <Wifi className="w-5 h-5" />
      case "parking":
        return <Car className="w-5 h-5" />
      case "security":
      case "24/7 security":
        return <Shield className="w-5 h-5" />
      default:
        return <Home className="w-5 h-5" />
    }
  }

  if (showPointsWarning) {
    return (
      <div className="min-h-screen bg-houselook-whitesmoke flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-white shadow-professional-xl border border-houselook-coolGray/20 rounded-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-houselook-black mb-4">Insufficient Points</h2>
            <p className="text-houselook-darkGray mb-6">
              You need <strong>20 points</strong> to view property details. You currently have{" "}
              <strong>{userPoints} points</strong>.
            </p>
            <div className="space-y-3">
              <Button
                onClick={handleTopUpPoints}
                className="w-full bg-gradient-primary text-white font-bold py-3 shadow-professional-lg hover:shadow-cyan-glow transition-all duration-300 rounded-xl"
              >
                <Coins className="w-4 h-4 mr-2" />
                Top Up Points
              </Button>
              <Button variant="outline" onClick={() => router.back()} className="w-full">
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!hasViewedProperty) {
    return (
      <div className="min-h-screen bg-houselook-whitesmoke flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-white shadow-professional-xl border border-houselook-coolGray/20 rounded-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-spin">
              <Coins className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-houselook-black mb-4">Loading Property...</h2>
            <p className="text-houselook-darkGray">Processing your request and deducting 20 points...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Points Display Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/80 sticky top-0 z-40">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-cyan-600"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back to Listings
            </Button>

            <div className="flex items-center gap-2 bg-cyan-100/50 text-cyan-800 px-4 py-2 rounded-full border border-cyan-200/80">
              <Coins className="w-5 h-5" />
              <span className="text-sm font-semibold">{userPoints} points</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
          {/* Left Column: Gallery and Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <section className="mb-8">
              <div className="relative h-96 md:h-[550px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer group">
                <Image
                  src={house.images[currentImageIndex] || "/placeholder.svg"}
                  alt={house.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  onClick={toggleFullScreen}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                {house.images.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full opacity-80 group-hover:opacity-100 transition-opacity"
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation()
                        prevImage()
                      }}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full opacity-80 group-hover:opacity-100 transition-opacity"
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation()
                        nextImage()
                      }}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </>
                )}

                <div className="absolute top-4 right-4 flex gap-2">
                  <Button variant="secondary" size="icon" className="rounded-full">
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button variant="secondary" size="icon" className="rounded-full">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>

                <div className="absolute top-4 left-4">
                  <Badge
                    className={`text-white text-sm py-1 px-3 ${house.available ? "bg-green-600/90" : "bg-red-600/90"}`}
                  >
                    {house.available ? "Available" : "Occupied"}
                  </Badge>
                </div>
              </div>

              {/* Image Thumbnails */}
              {house.images.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                  {house.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200 ${
                        index === currentImageIndex ? "ring-4 ring-cyan-500 shadow-md" : "hover:opacity-90"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${house.title} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </section>

            {/* House Info Section */}
            <section className="space-y-8">
              <div className="border-b pb-6">
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="outline" className="text-sm border-cyan-400 text-cyan-700 bg-cyan-50">
                    {house.type}
                  </Badge>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-3">{house.title}</h1>
                <div className="flex items-center text-gray-500 text-lg">
                  <MapPin className="w-6 h-6 mr-2 text-cyan-500" />
                  <span>{house.location}</span>
                </div>
              </div>

              <Card className="border-gray-200/80 shadow-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-800">Description</h2>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">{house.description}</p>
                </CardContent>
              </Card>

              <Card className="border-gray-200/80 shadow-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-800">Features</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                    {house.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full mr-3"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-gray-200/80 shadow-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-800">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {house.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center p-3 bg-gray-100/70 rounded-lg text-gray-700"
                      >
                        {getAmenityIcon(amenity)}
                        <span className="ml-3 font-medium">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Right Column: Sticky Sidebar */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <Card className="border-gray-200/80 shadow-lg">
              <CardContent className="p-6">
                <div className="border-b pb-6 mb-6">
                  <p className="text-lg text-gray-500">Rent per month</p>
                  <p className="text-4xl font-bold text-cyan-600">
                    KSh {house.price.toLocaleString()}
                  </p>
                </div>

                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Agent</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500">
                      {house.agent.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-xl text-gray-900">{house.agent.name}</p>
                      <p className="text-gray-500">Property Agent</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <Button
                      className="w-full bg-cyan-600 text-white hover:bg-cyan-700 h-12 text-lg"
                      onClick={() => window.open(`tel:${house.agent.phone}`)}
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Call Agent
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-cyan-600 text-cyan-600 hover:bg-cyan-50 h-12 text-lg"
                      onClick={() => window.open(`https://wa.me/${house.agent.whatsapp.replace("+", "")}`)}
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>

      {isFullScreen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={toggleFullScreen}
        >
          <div className="relative w-full h-full max-w-5xl max-h-[90vh]">
            <Image
              src={house.images[currentImageIndex] || "/placeholder.svg"}
              alt={house.title}
              fill
              className="object-contain"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 rounded-full text-white bg-black/50 hover:bg-black/75"
            onClick={toggleFullScreen}
          >
            <X className="w-6 h-6" />
          </Button>
        </div>
      )}

      {/* Mobile Sticky Bottom Bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 p-3 md:hidden shadow-top">
        <div className="flex gap-3">
          <Button
            className="flex-1 bg-cyan-600 text-white hover:bg-cyan-700 h-12 text-base"
            onClick={() => window.open(`tel:${house.agent.phone}`)}
          >
            <Phone className="w-5 h-5 mr-2" />
            Call
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-cyan-600 text-cyan-600 hover:bg-cyan-50 h-12 text-base"
            onClick={() => window.open(`https://wa.me/${house.agent.whatsapp.replace("+", "")}`)}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            WhatsApp
          </Button>
        </div>
      </footer>
    </div>
  )
}
