"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Search,
  Plus,
  Bell,
  Eye,
  Trash2,
  AlertTriangle,
  Home,
  Calendar,
  Coins,
  CreditCard,
  Smartphone,
} from "lucide-react"
import { Footer } from "@/components/footer"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getCurrentUser } from "@/lib/auth"
import { getUserProperties, getSavedHouses, getUserPoints, setUserPoints } from "@/lib/houses"

export function DashboardContent() {
  const [isAnimated, setIsAnimated] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string; uid: string } | null>(null)
  const [userProperties, setUserProperties] = useState<any[]>([])

  const [userPoints, setUserPointsState] = useState(100) // Starting points
  const [pointsToAdd, setPointsToAdd] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showTopUp, setShowTopUp] = useState(false)
  const [mpesaPhone, setMpesaPhone] = useState("")
  const [savedCount, setSavedCount] = useState(0)

  // Add phone number formatting function
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "")

    // If starts with 0, replace with 254
    if (digits.startsWith("0")) {
      return "254" + digits.slice(1)
    }

    // If starts with 254, keep as is
    if (digits.startsWith("254")) {
      return digits
    }

    // If starts with 7, add 254
    if (digits.startsWith("7")) {
      return "254" + digits
    }

    return digits
  }

  // Add Safaricom validation function
  const isSafaricomNumber = (phone: string) => {
    const safaricomPrefixes = ["2547", "25470", "25471", "25472", "25479"]
    return safaricomPrefixes.some((prefix) => phone.startsWith(prefix))
  }

  const handleMpesaPayment = async () => {
    if (!pointsToAdd || Number.parseInt(pointsToAdd) < 10) {
      alert("❌ Minimum top-up is 10 points (KSh 10)")
      return
    }

    const formattedPhone = formatPhoneNumber(mpesaPhone)

    if (!formattedPhone || formattedPhone.length < 12) {
      alert("❌ Please enter a valid phone number")
      return
    }

    if (!isSafaricomNumber(formattedPhone)) {
      alert("❌ Only Safaricom M-Pesa numbers are supported (07XX XXX XXX)")
      return
    }

    setIsLoading(true)

    setTimeout(async () => {
      const newPoints = userPoints + Number.parseInt(pointsToAdd)
      const transactionCode = `QH${Math.random().toString(36).substr(2, 8).toUpperCase()}`
      await updateUserPoints(newPoints)
      setPointsToAdd("")
      setMpesaPhone("")
      setShowTopUp(false)
      setIsLoading(false)

      // Show success alert
      alert(
        `✅ M-PESA PAYMENT SUCCESSFUL!

💰 Amount: KSh ${pointsToAdd}
🎯 Points Added: ${pointsToAdd}
📱 From: ${formattedPhone}
🔢 Transaction Code: ${transactionCode}

🎉 Your new balance: ${newPoints} points

Thank you for using HouseLook! 🏠`,
      )
    }, 3000)
  }

  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userData")
    router.push("/")
  }

  const handleDeleteAccount = async () => {
    // Simulate account deletion
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userData")
    localStorage.removeItem("userPoints")

    // In real app, this would delete from Firebase Auth and database
    alert("Your account and all data have been permanently deleted.")
    router.push("/")
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true)
    }, 100)

    // Load user data
    const userData = getCurrentUser()
    if (userData) {
      setUser(userData)
      // Fetch properties from Firebase
      getUserProperties(userData.uid).then((props) => {
        setUserProperties(props)
      })
      // Fetch saved houses count
      getSavedHouses(userData.uid).then((ids) => {
        setSavedCount(ids.length)
      })
      // Fetch user points
      getUserPoints(userData.uid).then((points) => {
        setUserPointsState(points)
      })
    }
    return () => clearTimeout(timer)
  }, [])

  // Helper to update points in DB and state
  const updateUserPoints = async (newPoints: number) => {
    if (user) {
      await setUserPoints(user.uid, newPoints)
      setUserPointsState(newPoints)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-houselook-aliceblue via-houselook-white to-houselook-whitesmoke pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div
          className={`mb-6 transition-all duration-1000 ${isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-black text-houselook-black mb-1 font-heading">
                Welcome back, {user?.name || "User"}! 👋
              </h1>
              <p className="text-sm text-houselook-darkGray">Manage your properties and track your success</p>
            </div>

            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-houselook-coolGray/30 text-houselook-darkGray hover:text-houselook-cyan hover:border-houselook-cyan/50 transition-all duration-300 rounded-lg text-sm"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Points Management Section */}
        <div
          className={`mb-6 transition-all duration-1000 delay-200 ${isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Points Overview */}
            <Card className="lg:col-span-2 bg-houselook-white shadow-soft-xl border-0 rounded-xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-bold text-houselook-black font-heading">
                  <Coins className="w-4 h-4 text-houselook-cyan" />
                  Points Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-3 bg-gradient-to-br from-houselook-cyan/5 to-houselook-teal/5 rounded-lg">
                    <div className="text-lg font-black text-houselook-cyan mb-1 font-heading">{userPoints}</div>
                    <div className="text-xs text-houselook-coolGray">Available Points</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                    <div className="text-lg font-black text-green-600 mb-1 font-heading">150</div>
                    <div className="text-xs text-houselook-coolGray">Total Earned</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
                    <div className="text-lg font-black text-orange-600 mb-1 font-heading">50</div>
                    <div className="text-xs text-houselook-coolGray">Points Used</div>
                  </div>
                </div>

                <div className="bg-houselook-aliceblue/50 rounded-lg p-3">
                  <h4 className="font-semibold text-houselook-black mb-2 text-xs">How Points Work:</h4>
                  <ul className="space-y-1 text-xs text-houselook-darkGray">
                    <li>
                      • <strong>20 points</strong> to view house details
                    </li>
                    <li>
                      • <strong>10 points</strong> to save a property
                    </li>
                    <li>
                      • <strong>1 point = KSh 1</strong>
                    </li>
                    <li>
                      • Get <strong>50 bonus points</strong> for new account
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Top Up Points */}
            <Card className="bg-houselook-white shadow-soft-xl border-0 rounded-xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-bold text-houselook-black font-heading">
                  <CreditCard className="w-4 h-4 text-houselook-cyan" />
                  Add Points
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {!showTopUp ? (
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-houselook-cyan/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Smartphone className="w-6 h-6 text-houselook-cyan" />
                      </div>
                      <p className="text-houselook-darkGray mb-3 text-sm">Top up your points using M-Pesa</p>
                    </div>

                    <div className="space-y-2">
                      <Button
                        onClick={() => setShowTopUp(true)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition-all duration-300 text-sm"
                      >
                        <Smartphone className="w-3 h-3 mr-2" />
                        Pay with M-Pesa
                      </Button>

                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setPointsToAdd("50")
                            setShowTopUp(true)
                          }}
                          className="text-xs"
                        >
                          +50 pts
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setPointsToAdd("100")
                            setShowTopUp(true)
                          }}
                          className="text-xs"
                        >
                          +100 pts
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="phone" className="text-xs font-semibold text-houselook-darkGray mb-1 block">
                        M-Pesa Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={mpesaPhone}
                        onChange={(e) => setMpesaPhone(e.target.value)}
                        placeholder="0700123456 or 254700123456"
                        className="border-houselook-aliceblue focus:border-houselook-cyan rounded-lg text-sm font-semibold"
                      />
                      <p className="text-xs text-houselook-coolGray mt-1">
                        ✅ Only Safaricom M-Pesa numbers (07XX, 01XX) are supported
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="points" className="text-xs font-semibold text-houselook-darkGray mb-1 block">
                        Points to Add (Min: 10)
                      </Label>
                      <Input
                        id="points"
                        type="number"
                        min="10"
                        value={pointsToAdd}
                        onChange={(e) => setPointsToAdd(e.target.value)}
                        placeholder="Enter points amount"
                        className="border-houselook-aliceblue focus:border-houselook-cyan rounded-lg text-sm"
                      />
                      {pointsToAdd && <p className="text-xs text-houselook-coolGray mt-1">Cost: KSh {pointsToAdd}</p>}
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-xs text-green-800 font-medium">Payment Process:</p>
                      <ol className="text-xs text-green-700 mt-1 space-y-1">
                        <li>1. Enter your M-Pesa phone number</li>
                        <li>2. Click "Send M-Pesa Request"</li>
                        <li>3. Check your phone for M-Pesa prompt</li>
                        <li>4. Enter your M-Pesa PIN to complete</li>
                      </ol>
                    </div>

                    <div className="space-y-2">
                      <Button
                        onClick={handleMpesaPayment}
                        disabled={isLoading || !pointsToAdd || !mpesaPhone || Number.parseInt(pointsToAdd) < 10}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition-all duration-300 text-sm"
                      >
                        {isLoading ? (
                          <div className="flex items-center">
                            <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                            Sending M-Pesa Request...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Smartphone className="w-3 h-3 mr-2" />
                            Send M-Pesa Request - KSh {pointsToAdd || 0}
                          </div>
                        )}
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowTopUp(false)
                          setPointsToAdd("")
                          setMpesaPhone("")
                        }}
                        className="w-full text-sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Stats */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 transition-all duration-1000 delay-300 ${isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <Card className="bg-houselook-white shadow-soft border-0 rounded-xl">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-houselook-cyan/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Home className="w-5 h-5 text-houselook-cyan" />
              </div>
              <h3 className="text-lg font-bold text-houselook-black font-heading">{userProperties.length}</h3>
              <p className="text-houselook-coolGray font-medium text-sm">Properties Listed</p>
            </CardContent>
          </Card>

          <Card className="bg-houselook-white shadow-soft border-0 rounded-xl">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-houselook-teal/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Heart className="w-5 h-5 text-houselook-teal" />
              </div>
              <h3 className="text-lg font-bold text-houselook-black font-heading">{savedCount}</h3>
              <p className="text-houselook-coolGray font-medium text-sm">Houses Saved</p>
            </CardContent>
          </Card>
        </div>

        {/* Properties List */}
        <div
          className={`mb-8 transition-all duration-1000 delay-400 ${isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <Card className="bg-houselook-white shadow-soft-xl border-0 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-black text-houselook-black font-heading">Your Properties</CardTitle>
            </CardHeader>
            <CardContent>
              {userProperties.length > 0 ? (
                <div className="space-y-4">
                  {userProperties.map((property) => (
                    <div
                      key={property.id}
                      className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-houselook-aliceblue/30 rounded-xl border border-houselook-coolGray/10"
                    >
                      <div className="flex-1">
                        <h3 className="font-bold text-houselook-black text-base mb-2 font-heading">{property.title || property.name || 'Untitled Property'}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-houselook-coolGray">
                          {property.dateSubmitted && (
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              Submitted: {property.dateSubmitted}
                            </div>
                          )}
                          {property.views !== undefined && (
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {property.views} views
                            </div>
                          )}
                          {property.inquiries !== undefined && (
                            <div className="flex items-center">
                              <Bell className="w-4 h-4 mr-1" />
                              {property.inquiries} inquiries
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mt-4 md:mt-0">
                        <Badge
                          variant={property.status === "Active" ? "default" : "secondary"}
                          className={
                            property.status === "Active"
                              ? "bg-houselook-success/10 text-houselook-success border-houselook-success/20"
                              : "bg-houselook-warning/10 text-houselook-warning border-houselook-warning/20"
                          }
                        >
                          {property.status || 'Unknown'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-houselook-coolGray/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Home className="w-8 h-8 text-houselook-coolGray" />
                  </div>
                  <h3 className="text-lg font-bold text-houselook-black mb-2">No Properties Listed Yet</h3>
                  <p className="text-houselook-coolGray mb-6">Start by listing your first property</p>
                  <Button
                    onClick={() => router.push("/list-property")}
                    className="bg-houselook-cyan hover:bg-houselook-teal text-houselook-black font-bold px-6 py-3 rounded-lg shadow-soft hover:shadow-cyan-glow transition-all duration-300"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    List Your First Property
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div
          className={`mb-8 transition-all duration-1000 delay-600 ${isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-xl font-bold text-houselook-black mb-6 font-heading">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Button
              onClick={() => router.push("/list-property")}
              className="h-20 bg-houselook-cyan hover:bg-houselook-teal text-houselook-black font-bold shadow-soft hover:shadow-cyan-glow transition-all duration-300 hover:scale-105 rounded-xl"
            >
              <div className="flex items-center">
                <Plus className="w-6 h-6 mr-3" />
                <span>List New Property</span>
              </div>
            </Button>

            <Button
              onClick={() => router.push("/listings")}
              className="h-20 bg-houselook-indigo hover:bg-houselook-indigo/90 text-houselook-white font-bold shadow-soft hover:shadow-indigo-glow transition-all duration-300 hover:scale-105 rounded-xl"
            >
              <div className="flex items-center">
                <Search className="w-6 h-6 mr-3" />
                <span>Browse Properties</span>
              </div>
            </Button>

            <Button
              onClick={() => router.push("/saved")}
              className="h-20 bg-houselook-teal hover:bg-houselook-teal/90 text-houselook-white font-bold shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:scale-105 rounded-xl"
            >
              <div className="flex items-center">
                <Heart className="w-6 h-6 mr-3" />
                <span>Saved Properties</span>
              </div>
            </Button>
          </div>
        </div>

        {/* Delete Account Section */}
        <div
          className={`transition-all duration-1000 delay-800 ${isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <Card className="bg-houselook-white shadow-soft-xl border-0 rounded-2xl border-l-4 border-l-houselook-error">
            <CardHeader>
              <CardTitle className="text-lg font-black text-houselook-black font-heading flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3 text-houselook-error" />
                Account Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-houselook-black mb-2">Delete My Account</h3>
                  <p className="text-houselook-coolGray text-sm">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="bg-houselook-error hover:bg-houselook-error/90 text-houselook-white font-bold px-6 py-3 rounded-lg shadow-soft transition-all duration-300"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-houselook-white border-0 shadow-soft-xl rounded-2xl">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-lg font-black text-houselook-black font-heading flex items-center">
                        <AlertTriangle className="w-6 h-6 mr-3 text-houselook-error" />
                        Delete Account Permanently?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-houselook-darkGray">
                        Are you sure you want to permanently delete your account and all data? This action cannot be
                        undone and will:
                        <ul className="list-disc list-inside mt-3 space-y-1">
                          <li>Delete your HouseLook account</li>
                          <li>Remove all your property listings</li>
                          <li>Delete your saved properties</li>
                          <li>Remove all your data from our system</li>
                        </ul>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="border-houselook-coolGray text-houselook-darkGray hover:bg-houselook-aliceblue rounded-lg">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        className="bg-houselook-error hover:bg-houselook-error/90 text-houselook-white rounded-lg"
                      >
                        Yes, Delete My Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
