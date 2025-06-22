"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Search, Home, Trash2, Eye, Filter, SortAsc, Coins, AlertCircle } from "lucide-react"
import { Footer } from "@/components/footer"

// Mock saved houses data
const savedHouses = [
  {
    id: 1,
    title: "Modern Bedsitter in Kahawa Wendani",
    location: "Kahawa Wendani, Nairobi",
    price: 8000,
    type: "Bedsitter",
    image: "/images/modern-apartments-1.jpeg",
    amenities: ["Wi-Fi", "Water Included", "Furnished", "24/7 Security"],
    available: true,
    savedDate: "2025-01-15",
  },
  {
    id: 2,
    title: "Spacious 1BR Near USIU",
    location: "Kasarani, Nairobi",
    price: 15000,
    type: "1 Bedroom",
    image: "/images/elegant-living-room.jpeg",
    amenities: ["Parking", "Security", "Wi-Fi", "Water"],
    available: true,
    savedDate: "2025-01-14",
  },
  {
    id: 5,
    title: "Student-Friendly Bedsitter",
    location: "Kahawa Wendani, Nairobi",
    price: 7500,
    type: "Bedsitter",
    image: "/images/african-inspired-living.webp",
    amenities: ["Wi-Fi", "Study Desk", "Water", "Furnished"],
    available: true,
    savedDate: "2025-01-13",
  },
  {
    id: 7,
    title: "Affordable Studio Kasarani",
    location: "Kasarani, Nairobi",
    price: 9000,
    type: "Studio",
    image: "/images/living-room-makeover.jpeg",
    amenities: ["Wi-Fi", "Security", "Water", "Kitchenette"],
    available: false,
    savedDate: "2025-01-12",
  },
  {
    id: 11,
    title: "Modern Studio Juja",
    location: "Juja, Kiambu",
    price: 8500,
    type: "Studio",
    image: "/images/contemporary-apartments.jpeg",
    amenities: ["Wi-Fi", "Furnished", "Security", "Study Area"],
    available: true,
    savedDate: "2025-01-10",
  },
]

export function SavedHousesContent() {
  const [isAnimated, setIsAnimated] = useState(false)
  const [userPoints, setUserPoints] = useState(0)
  const [sortBy, setSortBy] = useState("newest")
  const [filterBy, setFilterBy] = useState("all")
  const [houses, setHouses] = useState(savedHouses)
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Load user points
    const savedPoints = localStorage.getItem("userPoints")
    setUserPoints(savedPoints ? Number.parseInt(savedPoints) : 100)

    // Animation
    const timer = setTimeout(() => {
      setIsAnimated(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [router])

  const handleViewHouse = (houseId: number) => {
    if (userPoints >= 20) {
      router.push(`/house/${houseId}`)
    } else {
      alert("❌ You need at least 20 points to view house details. Please top up your account.")
    }
  }

  const handleRemoveFromSaved = (houseId: number) => {
    setHouses(houses.filter((house) => house.id !== houseId))
    alert("🗑️ Property removed from saved list")
  }

  const sortedAndFilteredHouses = houses
    .filter((house) => {
      if (filterBy === "available") return house.available
      if (filterBy === "unavailable") return !house.available
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "newest":
        default:
          return new Date(b.savedDate).getTime() - new Date(a.savedDate).getTime()
      }
    })

  return (
    <div className="min-h-screen bg-gradient-to-br from-houselook-aliceblue/40 via-white to-houselook-whitesmoke/60 pt-20">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-houselook-cyan/12 via-houselook-blue/8 to-transparent"></div>
        <div className="absolute top-32 -left-20 w-80 h-80 rounded-full bg-gradient-to-br from-houselook-cyan/15 to-houselook-blue/8 blur-3xl animate-pulse"></div>
        <div
          className="absolute top-64 right-10 w-96 h-96 rounded-full bg-gradient-to-br from-houselook-blue/12 to-houselook-cyan/8 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <div
          className={`mb-8 transition-all duration-1000 ${isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-houselook-cyan/15 to-houselook-blue/15 backdrop-blur-sm border border-houselook-cyan/25 rounded-full shadow-lg mb-4">
                <Heart className="w-4 h-4 text-houselook-cyan mr-2" />
                <span className="text-houselook-blue font-bold text-sm">Your Saved Properties</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black mb-4 text-black">
                <span className="bg-gradient-to-r from-black via-houselook-blue to-houselook-cyan bg-clip-text text-transparent">
                  Saved Houses
                </span>
              </h1>
              <p className="text-xl text-houselook-darkGray leading-relaxed">
                Your favorite properties are saved here. View details for{" "}
                <span className="text-houselook-cyan font-bold">20 points</span> each.
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Enhanced Points Display */}
              <Card className="bg-gradient-to-r from-houselook-cyan/15 to-houselook-blue/15 border-2 border-houselook-cyan/30 shadow-xl">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-lg">
                    <Coins className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-houselook-darkGray font-bold">Your Points</p>
                    <p className="text-2xl font-black text-houselook-black">{userPoints}</p>
                    <p className="text-xs text-houselook-coolGray font-medium">≈ KSh {userPoints}</p>
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={() => router.push("/dashboard")}
                variant="outline"
                className="border-2 border-houselook-cyan/40 text-houselook-blue font-bold hover:bg-houselook-cyan/10 hover:border-houselook-cyan/60 transition-all duration-300 px-6 py-3"
              >
                Dashboard
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Controls */}
        <div
          className={`mb-8 transition-all duration-1000 delay-300 ${isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <Card className="bg-white/80 backdrop-blur-md shadow-xl border-2 border-houselook-cyan/20 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-houselook-black mb-2">
                    {sortedAndFilteredHouses.length} {sortedAndFilteredHouses.length === 1 ? "Property" : "Properties"}{" "}
                    Saved
                  </h2>
                  <p className="text-houselook-darkGray font-medium">
                    💡 Tip: View house details for 20 points each to get full information and contact details
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {/* Enhanced Filter */}
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-houselook-darkGray" />
                    <select
                      value={filterBy}
                      onChange={(e) => setFilterBy(e.target.value)}
                      className="px-4 py-2 bg-white/90 border-2 border-houselook-aliceblue rounded-xl font-semibold text-houselook-darkGray focus:border-houselook-cyan transition-all"
                    >
                      <option value="all">All Properties</option>
                      <option value="available">✅ Available</option>
                      <option value="unavailable">❌ Unavailable</option>
                    </select>
                  </div>

                  {/* Enhanced Sort */}
                  <div className="flex items-center gap-2">
                    <SortAsc className="w-4 h-4 text-houselook-darkGray" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 bg-white/90 border-2 border-houselook-aliceblue rounded-xl font-semibold text-houselook-darkGray focus:border-houselook-cyan transition-all"
                    >
                      <option value="newest">🕒 Recently Saved</option>
                      <option value="price-low">💰 Price: Low to High</option>
                      <option value="price-high">💎 Price: High to Low</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Houses Grid */}
        <div
          className={`mb-16 transition-all duration-1000 delay-500 ${isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {sortedAndFilteredHouses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {sortedAndFilteredHouses.map((house, index) => (
                <div
                  key={house.id}
                  className="animate-in fade-in duration-700 slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-houselook-cyan/20 hover:border-houselook-cyan/40 hover:-translate-y-2 backdrop-blur-sm">
                    {/* Enhanced House Card Content */}
                    <div className="relative">
                      <img
                        src={house.image || "/placeholder.svg"}
                        alt={house.title}
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Enhanced Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Enhanced Badges */}
                      <div className="absolute top-4 left-4 right-4 flex justify-between">
                        <Badge
                          className={`${house.available ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} text-white font-bold shadow-lg`}
                        >
                          {house.available ? "✅ Available" : "❌ Occupied"}
                        </Badge>
                        <Badge className="bg-houselook-cyan/90 text-white font-bold shadow-lg">💾 Saved</Badge>
                      </div>

                      {/* Enhanced Action Buttons */}
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleViewHouse(house.id)}
                            className="flex-1 bg-gradient-primary text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View (20pts)
                          </Button>
                          <Button
                            onClick={() => handleRemoveFromSaved(house.id)}
                            variant="destructive"
                            size="sm"
                            className="px-3 shadow-xl"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Card Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-houselook-black mb-3 line-clamp-2 group-hover:text-houselook-blue transition-colors duration-300">
                        {house.title}
                      </h3>

                      <div className="flex items-center text-houselook-darkGray mb-4">
                        <Home className="w-4 h-4 mr-2 text-houselook-cyan" />
                        <span className="text-sm font-semibold">{house.location}</span>
                      </div>

                      <div className="flex items-center justify-between mb-5">
                        <div className="text-2xl font-black bg-gradient-to-r from-houselook-cyan to-houselook-blue bg-clip-text text-transparent">
                          KSh {house.price.toLocaleString()}
                          <span className="text-sm text-houselook-coolGray font-normal ml-1">/month</span>
                        </div>
                        <Badge variant="outline" className="border-houselook-cyan/40 text-houselook-blue font-semibold">
                          {house.type}
                        </Badge>
                      </div>

                      {/* Enhanced Amenities */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {house.amenities.slice(0, 2).map((amenity) => (
                          <div
                            key={amenity}
                            className="text-xs text-houselook-darkGray bg-gradient-to-r from-houselook-aliceblue to-houselook-whitesmoke px-3 py-2 rounded-full border-2 border-houselook-cyan/25 hover:border-houselook-cyan/50 transition-colors font-semibold"
                          >
                            {amenity}
                          </div>
                        ))}
                        {house.amenities.length > 2 && (
                          <div className="text-xs text-houselook-blue bg-houselook-cyan/15 px-3 py-2 rounded-full border-2 border-houselook-cyan/40 font-bold">
                            +{house.amenities.length - 2} more
                          </div>
                        )}
                      </div>

                      <p className="text-xs text-houselook-coolGray font-medium">
                        💾 Saved on {new Date(house.savedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Card className="bg-white/80 backdrop-blur-md shadow-xl border-2 border-houselook-cyan/20 rounded-3xl">
              <CardContent className="text-center py-20">
                <div className="w-24 h-24 bg-gradient-to-br from-houselook-cyan/20 to-houselook-blue/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-12 h-12 text-houselook-cyan" />
                </div>
                <h3 className="text-2xl font-bold text-houselook-darkGray mb-3">No Saved Properties</h3>
                <p className="text-houselook-coolGray mb-8 max-w-md mx-auto font-medium">
                  You haven't saved any properties yet. Start browsing and save your favorite homes!
                </p>
                <Button
                  onClick={() => router.push("/listings")}
                  className="bg-gradient-primary text-white font-bold px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Browse Properties
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Enhanced Points Warning */}
        {userPoints < 20 && (
          <div
            className={`mb-8 transition-all duration-1000 delay-700 ${isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 shadow-xl rounded-2xl">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-orange-800 mb-1">Low Points Balance</h3>
                  <p className="text-orange-700 font-medium">
                    You need at least 20 points to view house details. Top up your account to continue.
                  </p>
                </div>
                <Button
                  onClick={() => router.push("/dashboard")}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3"
                >
                  <Coins className="w-4 h-4 mr-2" />
                  Top Up Points
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
