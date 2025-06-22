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
    <div className="min-h-screen bg-houselook-whitesmoke">
      {/* Points Display Header */}
      <div className="bg-white border-b border-houselook-coolGray/20 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="flex items-center text-houselook-darkGray hover:text-houselook-cyan"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Listings
            </Button>

            <div className="flex items-center gap-2 bg-gradient-to-r from-houselook-cyan/10 to-houselook-blue/10 px-4 py-2 rounded-full border border-houselook-cyan/30">
              <Coins className="w-4 h-4 text-houselook-cyan" />
              <span className="text-sm font-semibold text-houselook-black">{userPoints} points</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center gap-2 text-green-800">
            <Coins className="w-5 h-5" />
            <span className="font-semibold">20 points deducted successfully!</span>
          </div>
          <p className="text-sm text-green-700 mt-1">You can now view all property details and contact the agent.</p>
        </div>

        {/* Image Gallery */}
        <div className="relative mb-8">
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src={house.images[currentImageIndex] || "/placeholder.svg"}
              alt={house.title}
              fill
              className="object-cover"
            />

            {house.images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </>
            )}

            <div className="absolute top-4 right-4 flex gap-2">
              <Button variant="secondary" size="sm" className="rounded-full">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="sm" className="rounded-full">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="absolute top-4 left-4">
              <Badge className="bg-primary text-black">{house.available ? "Available" : "Occupied"}</Badge>
            </div>
          </div>

          {/* Image Thumbnails */}
          {house.images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {house.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 ${
                    index === currentImageIndex ? "ring-2 ring-primary" : ""
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{house.type}</Badge>
              </div>
              <h1 className="text-3xl font-bold text-black mb-4">{house.title}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="text-lg">{house.location}</span>
              </div>
              <div className="text-3xl font-bold text-primary mb-6">
                KSh {house.price.toLocaleString()}
                <span className="text-lg text-gray-500 font-normal">/month</span>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed">{house.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Features</h2>
                <div className="grid grid-cols-2 gap-3">
                  {house.features.map((feature) => (
                    <div key={feature} className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {house.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center p-3 bg-houselook-aliceblue rounded-lg">
                      {getAmenityIcon(amenity)}
                      <span className="ml-3">{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Contact Agent</h2>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-lg">{house.agent.name}</p>
                    <p className="text-gray-600">Property Agent</p>
                  </div>

                  <div className="space-y-3">
                    <Button
                      className="w-full bg-primary text-black hover:bg-primary/90"
                      onClick={() => window.open(`tel:${house.agent.phone}`)}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Agent
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => window.open(`https://wa.me/${house.agent.whatsapp.replace("+", "")}`)}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                  <p className="text-gray-600">Map integration would go here</p>
                </div>
                <p className="text-sm text-gray-600 mt-2">{house.location}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden">
        <div className="flex gap-3">
          <Button
            className="flex-1 bg-primary text-black hover:bg-primary/90"
            onClick={() => window.open(`tel:${house.agent.phone}`)}
          >
            <Phone className="w-4 h-4 mr-2" />
            Call
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => window.open(`https://wa.me/${house.agent.whatsapp.replace("+", "")}`)}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>
        </div>
      </div>
    </div>
  )
}
