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
import { getCurrentUser } from "@/lib/auth"
import { saveHouse, unsaveHouse, getSavedHouses } from "@/lib/houses"

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
      return <Wifi className="w-3 h-3" />
    case "parking area":
      return <Car className="w-3 h-3" />
    case "security cameras":
      return <Shield className="w-3 h-3" />
    default:
      return null
  }
}

export function HouseCard({ house }: { house: House }) {
  const [isSaved, setIsSaved] = useState(false)
  const user = getCurrentUser()

  useEffect(() => {
    if (user) {
      getSavedHouses(user.uid).then((saved) => {
        if (saved.includes(house.id)) {
          setIsSaved(true)
        }
      })
    }
  }, [user, house.id])

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!user) {
      // or redirect to login
      alert("You must be logged in to save houses.")
      return
    }

    if (isSaved) {
      await unsaveHouse(user.uid, house.id)
      setIsSaved(false)
    } else {
      await saveHouse(user.uid, house.id)
      setIsSaved(true)
      alert("House saved! It will be available in your saved list for 48 hours, then it will disappear.")
    }
  }

  return (
    <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/50 hover:border-houselook-cyan/30 hover:-translate-y-2 backdrop-blur-sm">
      <div className="relative overflow-hidden">
        <Image
          src={house.image1Url || "/placeholder.svg"}
          alt={house.name}
          width={400}
          height={300}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="absolute top-3 right-3 flex gap-2">
          <Button
            onClick={handleSave}
            size="sm"
            variant="secondary"
            className="rounded-full p-1.5 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <Heart
              className={`w-3 h-3 text-gray-600 transition-colors ${
                isSaved ? "text-red-500 fill-current" : "hover:text-red-500"
              }`}
            />
          </Button>
          <Button
            className="rounded-full p-1.5 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
          >
            <Eye className="w-3 h-3 text-gray-600" />
          </Button>
        </div>

        <div className="absolute top-3 left-3">
          <Badge className={`text-white shadow-lg text-xs ${house.vacancies ? "bg-gradient-to-r from-green-500 to-green-600" : "bg-gradient-to-r from-red-500 to-red-600"}`}>
            {house.vacancies ? "Available" : "Occupied"}
          </Badge>
        </div>

        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Badge className="bg-white/90 backdrop-blur-sm border-white/50 text-gray-700 shadow-lg text-xs">
            {house.bedroom}
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-bold text-black mb-2 line-clamp-2 group-hover:text-houselook-blue transition-colors duration-300 font-heading">
          {house.name}
        </h3>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-3 h-3 mr-1.5 text-houselook-cyan" />
          <span className="text-xs font-medium">{house.city}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-base font-black bg-gradient-to-r from-houselook-cyan to-houselook-blue bg-clip-text text-transparent font-heading">
            KSh {house.rent} <span className="text-xs text-gray-500 font-normal ml-1">/month</span>
          </div>
          <div className="flex items-center text-yellow-500">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-xs font-medium ml-1">4.8</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {house.amenities.slice(0, 3).map((amenity) => (
            <div
              key={amenity}
              className="flex items-center text-xs text-gray-600 bg-gradient-to-r from-houselook-aliceblue to-houselook-whitesmoke px-2 py-1.5 rounded-full border border-houselook-cyan/20 hover:border-houselook-cyan/40 transition-colors"
            >
              {getAmenityIcon(amenity)}
              <span className="ml-1 font-medium text-xs">{amenity}</span>
            </div>
          ))}
          {house.amenities.length > 3 && (
            <div className="flex items-center text-xs text-houselook-blue bg-houselook-cyan/10 px-2 py-1.5 rounded-full border border-houselook-cyan/30">
              <span className="font-medium text-xs">+{house.amenities.length - 3} more</span>
            </div>
          )}
        </div>

        <Link href={`/house/${house.id}`}>
          <Button className="w-full bg-gradient-to-r from-houselook-cyan to-houselook-blue text-white hover:shadow-xl transition-all duration-300 hover:scale-[1.02] font-semibold py-2 text-sm group-hover:shadow-2xl">
            <span className="flex items-center justify-center">
              View Details
              <Eye className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
