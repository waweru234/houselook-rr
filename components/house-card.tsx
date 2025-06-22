// app/page.tsx or pages/index.tsx (for Next.js App Router or Pages Router)

"use client"

import { useEffect, useState } from "react"
import { ref, onValue } from "firebase/database"
import { db } from "@/lib/firebase"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Wifi, Car, Shield, Heart, Eye, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface House {
  id: string
  name: string
  city: string
  rent: number
  bedroom: string
  image1Url: string
  amenities: string[]
  vacancies: string
}

function getAmenityIcon(amenity: string) {
  switch (amenity.toLowerCase()) {
    case "wi-fi":
    case "free wifi":
      return <Wifi className="w-4 h-4" />
    case "parking area":
      return <Car className="w-4 h-4" />
    case "security cameras":
      return <Shield className="w-4 h-4" />
    default:
      return null
  }
}

export function HouseCard({ house }: { house: House }) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/50 hover:border-houselook-cyan/30 hover:-translate-y-2 backdrop-blur-sm">
      <div className="relative overflow-hidden">
        <Image
          src={house.image1Url || "/placeholder.svg"}
          alt={house.name}
          width={400}
          height={300}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="rounded-full p-2 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="rounded-full p-2 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
          >
            <Eye className="w-4 h-4 text-gray-600" />
          </Button>
        </div>

        <div className="absolute top-4 left-4">
          <Badge className={`text-white shadow-lg ${house.vacancies ? "bg-gradient-to-r from-green-500 to-green-600" : "bg-gradient-to-r from-red-500 to-red-600"}`}>
            {house.vacancies ? "✨ Available" : "🔒 Occupied"}
          </Badge>
        </div>

        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Badge variant="outline" className="bg-white/90 backdrop-blur-sm border-white/50 text-gray-700 shadow-lg">
            {house.bedroom}
          </Badge>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-black mb-3 line-clamp-2 group-hover:text-houselook-blue transition-colors duration-300">
          {house.name}
        </h3>

        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="w-4 h-4 mr-2 text-houselook-cyan" />
          <span className="text-sm font-medium">{house.city}</span>
        </div>

        <div className="flex items-center justify-between mb-5">
          <div className="text-2xl font-black bg-gradient-to-r from-houselook-cyan to-houselook-blue bg-clip-text text-transparent">
            KSh {house.rent} <span className="text-sm text-gray-500 font-normal ml-1">/month</span>
          </div>
          <div className="flex items-center text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium ml-1">4.8</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {house.amenities.slice(0, 3).map((amenity) => (
            <div
              key={amenity}
              className="flex items-center text-xs text-gray-600 bg-gradient-to-r from-houselook-aliceblue to-houselook-whitesmoke px-3 py-2 rounded-full border border-houselook-cyan/20 hover:border-houselook-cyan/40 transition-colors"
            >
              {getAmenityIcon(amenity)}
              <span className="ml-1 font-medium">{amenity}</span>
            </div>
          ))}
          {house.amenities.length > 3 && (
            <div className="flex items-center text-xs text-houselook-blue bg-houselook-cyan/10 px-3 py-2 rounded-full border border-houselook-cyan/30">
              <span className="font-medium">+{house.amenities.length - 3} more</span>
            </div>
          )}
        </div>

        <Link href={`/house/${house.id}`}>
          <Button className="w-full bg-gradient-to-r from-houselook-cyan to-houselook-blue text-white hover:shadow-xl transition-all duration-300 hover:scale-[1.02] font-semibold py-3 group-hover:shadow-2xl">
            <span className="flex items-center justify-center">
              View Details
              <Eye className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default function HousePage() {
  const [houses, setHouses] = useState<House[]>([])

  useEffect(() => {
    const houseRef = ref(db, "property")
    onValue(houseRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const list: House[] = Object.entries(data).map(([id, val]: any) => ({
          id,
          name: val.name || "Untitled",
          city: val.city || val.town || "Unknown",
          rent: parseInt(val.rent) || 0,
          bedroom: val.bedroom || "Bedsitter",
          image1Url: val.image1Url || val.image2Url || "/placeholder.svg",
          amenities: val.amenities || ["Wi-Fi", "Parking", "Security"],
          vacancies: val.vacancies,
        }))
        setHouses(list)
      }
    })
  }, [])

  return (
    <main className="py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-houselook-black">Explore Houses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
      </div>
    </main>
  )
}
