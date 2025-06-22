"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Home, DollarSign, Bed, Wifi, Car, Shield, Sparkles, ChevronDown, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function SearchSection() {
  const [location, setLocation] = useState("")
  const [priceRange, setPriceRange] = useState([0, 30000])
  const [roomType, setRoomType] = useState("")
  const [bedrooms, setBedrooms] = useState("")
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const router = useRouter()

  const amenities = [
    { name: "Wi-Fi", icon: <Wifi className="w-4 h-4" /> },
    { name: "Parking", icon: <Car className="w-4 h-4" /> },
    { name: "Security", icon: <Shield className="w-4 h-4" /> },
    { name: "Furnished", icon: <Home className="w-4 h-4" /> },
  ]

  const popularLocations = ["Kahawa Wendani", "Kasarani", "Thika Road", "Westlands", "Kiambu"]

  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity))
    } else {
      setSelectedAmenities([...selectedAmenities, amenity])
    }
  }

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (location) params.set("location", location)
    if (priceRange) params.set("price", `${priceRange[0]}-${priceRange[1]}`)
    if (roomType) params.set("type", roomType)
    if (bedrooms) params.set("bedrooms", bedrooms)
    if (selectedAmenities.length > 0) params.set("amenities", selectedAmenities.join(","))

    router.push(`/listings?${params.toString()}`)
  }

  const clearFilters = () => {
    setLocation("")
    setPriceRange([0, 30000])
    setRoomType("")
    setBedrooms("")
    setSelectedAmenities([])
  }

  return (
    <section className="relative z-20 -mt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-houselook-aliceblue">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {/* Location */}
            <div className="relative col-span-1 md:col-span-1 lg:col-span-2">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <MapPin className="w-5 h-5" />
              </div>
              <Input
                placeholder="Location (e.g., Nairobi, Kisumu)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 h-12 border-houselook-aliceblue focus:border-houselook-cyan"
              />
              {location && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setLocation("")}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Price Range */}
            <div className="relative">
              <Select
                value={priceRange.join("-")}
                onValueChange={(val) => {
                  const [min, max] = val.split("-").map(Number)
                  setPriceRange([min, max])
                }}
              >
                <SelectTrigger className="h-12 border-houselook-aliceblue">
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 text-gray-400 mr-2" />
                    <SelectValue placeholder="Price Range" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-5000">Under KSh 5,000</SelectItem>
                  <SelectItem value="5000-10000">KSh 5,000 - 10,000</SelectItem>
                  <SelectItem value="10000-20000">KSh 10,000 - 20,000</SelectItem>
                  <SelectItem value="20000-30000">KSh 20,000 - 30,000</SelectItem>
                  <SelectItem value="30000-50000">Above KSh 30,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Room Type */}
            <div className="relative">
              <Select value={roomType} onValueChange={setRoomType}>
                <SelectTrigger className="h-12 border-houselook-aliceblue">
                  <div className="flex items-center">
                    <Home className="w-5 h-5 text-gray-400 mr-2" />
                    <SelectValue placeholder="Property Type" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bedsitter">Bedsitter</SelectItem>
                  <SelectItem value="1br">1 Bedroom</SelectItem>
                  <SelectItem value="2br">2 Bedroom</SelectItem>
                  <SelectItem value="3br">3 Bedroom</SelectItem>
                  <SelectItem value="shared">Shared</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <div className="col-span-1 md:col-span-3 lg:col-span-1">
              <Button
                onClick={handleSearch}
                className="w-full h-12 bg-gradient-to-r from-houselook-cyan to-houselook-blue text-white hover:shadow-lg transition-all duration-300 hover:scale-[1.02] font-semibold text-base"
              >
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </div>

          {/* Advanced Search Toggle */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center text-houselook-blue hover:text-houselook-cyan transition-colors text-sm font-medium"
            >
              <Sparkles className="w-4 h-4 mr-1" />
              {showAdvanced ? "Hide" : "Show"} Advanced Search
              <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showAdvanced ? "rotate-180" : ""}`} />
            </button>

            {(location ||
              roomType ||
              bedrooms ||
              selectedAmenities.length > 0 ||
              priceRange[0] > 0 ||
              priceRange[1] < 30000) && (
              <button onClick={clearFilters} className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                Clear All Filters
              </button>
            )}
          </div>

          {/* Advanced Search Options */}
          {showAdvanced && (
            <div className="bg-houselook-aliceblue/30 rounded-xl p-5 mb-6 border border-houselook-aliceblue/50 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Bedrooms */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Bedrooms</Label>
                  <Select value={bedrooms} onValueChange={setBedrooms}>
                    <SelectTrigger className="h-10 bg-white border-houselook-aliceblue">
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 text-gray-400 mr-2" />
                        <SelectValue placeholder="Any" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="1">1 Bedroom</SelectItem>
                      <SelectItem value="2">2 Bedrooms</SelectItem>
                      <SelectItem value="3">3 Bedrooms</SelectItem>
                      <SelectItem value="4+">4+ Bedrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range Slider */}
                <div className="lg:col-span-2">
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-sm font-medium text-gray-700">Price Range</Label>
                    <span className="text-sm font-medium text-houselook-blue">
                      KSh {priceRange[0].toLocaleString()} - KSh {priceRange[1].toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={50000}
                    step={1000}
                    className="py-4"
                  />
                </div>

                {/* Amenities */}
                <div className="lg:col-span-3">
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">Amenities</Label>
                  <div className="flex flex-wrap gap-2">
                    {amenities.map((amenity) => (
                      <Badge
                        key={amenity.name}
                        variant="outline"
                        className={cn(
                          "cursor-pointer py-2 px-3 hover:bg-houselook-cyan/10 transition-all duration-200",
                          selectedAmenities.includes(amenity.name)
                            ? "bg-houselook-cyan/20 border-houselook-cyan text-houselook-blue"
                            : "bg-white border-gray-200 text-gray-700",
                        )}
                        onClick={() => toggleAmenity(amenity.name)}
                      >
                        <div className="flex items-center">
                          {amenity.icon}
                          <span className="ml-1">{amenity.name}</span>
                        </div>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Popular Searches */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500 font-medium">Popular:</span>
            {popularLocations.map((area) => (
              <Badge
                key={area}
                variant="outline"
                className="cursor-pointer bg-white hover:bg-houselook-cyan/10 hover:border-houselook-cyan/30 transition-all duration-200"
                onClick={() => {
                  setLocation(area)
                  handleSearch()
                }}
              >
                {area}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
