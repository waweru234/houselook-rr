"use client"

import { useState, useEffect } from "react"
import {
  Users,
  TrendingUp,
  DollarSign,
  Home,
  Download,
  PieChartIcon as PieIcon,
  Search,
  Coins,
  Activity,
  Star,
  Zap,
  Crown,
  Shield,
  Trophy,
  Target,
  Flame,
  Award,
  Rocket,
} from "lucide-react"
import {
  AreaChart,
  Area,
  PieChart as RechartsPieChart,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Pie,
} from "recharts"

// Mock data - replace with real data from your backend
const registrationData = [
  { month: "Jan", users: 45, revenue: 12500 },
  { month: "Feb", users: 67, revenue: 18900 },
  { month: "Mar", users: 89, revenue: 25600 },
  { month: "Apr", users: 123, revenue: 34200 },
  { month: "May", users: 156, revenue: 42800 },
  { month: "Jun", users: 198, revenue: 56700 },
  { month: "Jul", users: 234, revenue: 67300 },
  { month: "Aug", users: 267, revenue: 78900 },
  { month: "Sep", users: 298, revenue: 89400 },
  { month: "Oct", users: 334, revenue: 98700 },
  { month: "Nov", users: 378, revenue: 112300 },
  { month: "Dec", users: 423, revenue: 128900 },
]

const userTypeData = [
  { name: "Property Owners", value: 156, color: "#00FFFF" },
  { name: "Tenants", value: 234, color: "#008B8B" },
  { name: "Agents", value: 67, color: "#6F00FF" },
  { name: "Inactive", value: 43, color: "#6B7280" },
]

const revenueData = [
  { period: "Last 30 Days", amount: 45600, growth: 12.5, level: "Bronze", streak: 5 },
  { period: "Last 3 Months", amount: 128900, growth: 18.3, level: "Silver", streak: 12 },
  { period: "Last 6 Months", amount: 267800, growth: 24.7, level: "Gold", streak: 24 },
  { period: "Last Year", amount: 456700, growth: 31.2, level: "Diamond", streak: 52 },
]

const topMembers = [
  { name: "John Kamau", email: "john@email.com", points: 450, properties: 12, joined: "2024-01-15", status: "Premium" },
  { name: "Mary Wanjiku", email: "mary@email.com", points: 380, properties: 8, joined: "2024-02-20", status: "Active" },
  {
    name: "Peter Ochieng",
    email: "peter@email.com",
    points: 320,
    properties: 15,
    joined: "2024-01-08",
    status: "Premium",
  },
  {
    name: "Grace Akinyi",
    email: "grace@email.com",
    points: 290,
    properties: 6,
    joined: "2024-03-12",
    status: "Active",
  },
  {
    name: "David Mwangi",
    email: "david@email.com",
    points: 275,
    properties: 9,
    joined: "2024-02-05",
    status: "Active",
  },
]

// Gamification achievements
const achievements = [
  {
    title: "Revenue Milestone",
    description: "Reached KES 100K monthly revenue",
    icon: Trophy,
    color: "from-yellow-400 to-orange-500",
  },
  {
    title: "Growth Streak",
    description: "12 months of consecutive growth",
    icon: Flame,
    color: "from-red-500 to-pink-500",
  },
  {
    title: "User Champion",
    description: "1000+ registered users",
    icon: Crown,
    color: "from-purple-500 to-indigo-600",
  },
  { title: "Property Master", description: "500+ properties listed", icon: Award, color: "from-green-400 to-blue-500" },
]

export function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("30days")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const downloadReport = (type: string) => {
    // Mock download functionality
    const data = type === "users" ? registrationData : revenueData
    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(data[0]).join(",") +
      "\n" +
      data.map((row) => Object.values(row).join(",")).join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `houselook_${type}_report_${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filteredMembers = topMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Bronze":
        return "from-amber-600 to-yellow-600"
      case "Silver":
        return "from-gray-400 to-gray-600"
      case "Gold":
        return "from-yellow-400 to-yellow-600"
      case "Diamond":
        return "from-blue-400 to-purple-600"
      default:
        return "from-gray-400 to-gray-600"
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "Bronze":
        return Trophy
      case "Silver":
        return Award
      case "Gold":
        return Crown
      case "Diamond":
        return Rocket
      default:
        return Star
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-houselook-cyan/10 to-houselook-indigo/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-houselook-indigo/10 to-houselook-cyan/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-houselook-teal/5 to-houselook-cyan/5 rounded-full blur-2xl animate-spin-slow"></div>
      </div>

      {/* Header */}
      <div className="relative bg-gradient-to-r from-houselook-cyan via-houselook-teal to-houselook-indigo text-white shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-3 h-3 bg-white/30 rounded-full animate-ping"></div>
          <div className="absolute top-20 right-20 w-4 h-4 bg-white/20 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-10 right-1/3 w-3 h-3 bg-white/25 rounded-full animate-pulse delay-700"></div>
        </div>

        <div className="relative max-w-7xl mx-auto p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl border border-white/30">
                  <Shield className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
                    Admin Dashboard
                  </h1>
                  <p className="text-lg opacity-90 font-light">
                    Welcome back! Here's what's happening with{" "}
                    <span className="font-semibold text-yellow-300">HouseLook</span> today.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 min-w-[200px]">
              <div className="text-center">
                <p className="text-sm opacity-80 mb-1">Current Time</p>
                <p className="text-2xl font-bold">{currentTime.toLocaleTimeString()}</p>
                <p className="text-sm opacity-80">{currentTime.toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 -mt-16 relative z-10">
          <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 hover:bg-gradient-to-br hover:from-white hover:to-blue-50">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-houselook-cyan to-houselook-teal p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-green-500 text-sm font-semibold">
                  <TrendingUp className="w-4 h-4" />
                  +12.5%
                </div>
              </div>
            </div>
            <div>
              <p className="text-houselook-coolgray text-sm font-medium mb-1">Total Users</p>
              <p className="text-4xl font-black text-houselook-darkgray mb-2">1,247</p>
              <p className="text-xs text-houselook-coolgray">↗ Growth this month</p>
            </div>
          </div>

          <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 hover:bg-gradient-to-br hover:from-white hover:to-purple-50">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-houselook-indigo to-purple-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Home className="w-8 h-8 text-white" />
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-green-500 text-sm font-semibold">
                  <TrendingUp className="w-4 h-4" />
                  +8.3%
                </div>
              </div>
            </div>
            <div>
              <p className="text-houselook-coolgray text-sm font-medium mb-1">Properties Listed</p>
              <p className="text-4xl font-black text-houselook-darkgray mb-2">856</p>
              <p className="text-xs text-houselook-coolgray">↗ New listings</p>
            </div>
          </div>

          <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 hover:bg-gradient-to-br hover:from-white hover:to-green-50">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-green-500 text-sm font-semibold">
                  <TrendingUp className="w-4 h-4" />
                  +18.7%
                </div>
              </div>
            </div>
            <div>
              <p className="text-houselook-coolgray text-sm font-medium mb-1">Monthly Revenue</p>
              <p className="text-4xl font-black text-houselook-darkgray mb-2">KES 128K</p>
              <p className="text-xs text-houselook-coolgray">↗ Revenue growth</p>
            </div>
          </div>

          <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 hover:bg-gradient-to-br hover:from-white hover:to-orange-50">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-orange-500 text-sm font-semibold">
                  <Zap className="w-4 h-4" />
                  Live
                </div>
              </div>
            </div>
            <div>
              <p className="text-houselook-coolgray text-sm font-medium mb-1">Active Sessions</p>
              <p className="text-4xl font-black text-houselook-darkgray mb-2">342</p>
              <p className="text-xs text-houselook-coolgray">⚡ Real-time users</p>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon
            return (
              <div
                key={index}
                className="group bg-gradient-to-br from-slate-900 via-gray-900 to-black rounded-3xl p-6 shadow-2xl border border-gray-800 hover:shadow-3xl hover:scale-105 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div
                    className={`bg-gradient-to-r ${achievement.color} p-3 rounded-2xl w-fit mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">{achievement.title}</h4>
                  <p className="text-gray-400 text-sm">{achievement.description}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-xs font-semibold">UNLOCKED</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* Registration Trends */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-houselook-darkgray mb-2">Registration Trends</h3>
                <p className="text-houselook-coolgray">User growth over time</p>
              </div>
              <button
                onClick={() => downloadReport("users")}
                className="group flex items-center gap-3 bg-gradient-to-r from-houselook-cyan to-houselook-teal text-white px-6 py-3 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                <span className="font-semibold">Download</span>
              </button>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={registrationData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00FFFF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00FFFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.95)",
                    border: "none",
                    borderRadius: "16px",
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(10px)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#00FFFF"
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* User Types Distribution */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-houselook-darkgray mb-2">User Distribution</h3>
                <p className="text-houselook-coolgray">User types breakdown</p>
              </div>
              <div className="bg-gradient-to-r from-houselook-indigo to-purple-600 p-3 rounded-2xl">
                <PieIcon className="w-6 h-6 text-white" />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <RechartsPieChart>
                <Pie
                  data={userTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {userTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.95)",
                    border: "none",
                    borderRadius: "16px",
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(10px)",
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gamified Revenue Analytics */}
        <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-black rounded-3xl p-8 shadow-2xl border border-gray-800 hover:shadow-3xl transition-all duration-300 mb-8 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-lg animate-spin-slow"></div>
          </div>

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div className="mb-6 lg:mb-0">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-2xl shadow-lg">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white mb-2">🎮 Revenue Quest</h3>
                    <p className="text-gray-400">Level up your business performance!</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => downloadReport("revenue")}
                className="group flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105 font-bold"
              >
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                <span>Download Quest Report</span>
              </button>
            </div>

            {/* Gamified Revenue Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {revenueData.map((item, index) => {
                const LevelIcon = getLevelIcon(item.level)
                return (
                  <div
                    key={index}
                    className="group bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden"
                  >
                    {/* Level Badge */}
                    <div className="absolute top-4 right-4">
                      <div
                        className={`bg-gradient-to-r ${getLevelColor(item.level)} px-3 py-1 rounded-full flex items-center gap-2`}
                      >
                        <LevelIcon className="w-4 h-4 text-white" />
                        <span className="text-white text-xs font-bold">{item.level}</span>
                      </div>
                    </div>

                    {/* Streak Counter */}
                    <div className="flex items-center gap-2 mb-4">
                      <Flame className="w-5 h-5 text-orange-500" />
                      <span className="text-orange-500 font-bold text-sm">{item.streak} Week Streak!</span>
                    </div>

                    <div className="mb-4">
                      <p className="text-gray-400 text-sm font-medium mb-1">{item.period}</p>
                      <p className="text-3xl font-black text-white mb-2">KES {item.amount.toLocaleString()}</p>
                    </div>

                    {/* XP Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-xs">XP Progress</span>
                        <span className="text-cyan-400 text-xs font-bold">+{item.growth}% XP</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${Math.min(item.growth * 3, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Achievement Points */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 text-sm font-semibold">Goal Achieved!</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-yellow-400 font-bold text-sm">{Math.floor(item.amount / 1000)}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Dark Themed Revenue Chart */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Revenue Rocket 🚀</h4>
                    <p className="text-gray-400 text-sm">Your financial journey to the moon!</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">Total Score</p>
                  <p className="text-2xl font-bold text-cyan-400">2,847 XP</p>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={registrationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="darkRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#A855F7" stopOpacity={1} />
                      <stop offset="30%" stopColor="#EC4899" stopOpacity={0.9} />
                      <stop offset="70%" stopColor="#06B6D4" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#10B981" stopOpacity={0.7} />
                    </linearGradient>
                    <linearGradient id="darkRevenueHover" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C084FC" stopOpacity={1} />
                      <stop offset="30%" stopColor="#F472B6" stopOpacity={0.9} />
                      <stop offset="70%" stopColor="#22D3EE" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#34D399" stopOpacity={0.7} />
                    </linearGradient>
                    {/* Glow effect */}
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" strokeWidth={1} />
                  <XAxis dataKey="month" stroke="#D1D5DB" fontSize={14} fontWeight="bold" tick={{ fill: "#D1D5DB" }} />
                  <YAxis
                    stroke="#D1D5DB"
                    fontSize={12}
                    tick={{ fill: "#D1D5DB" }}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(17, 24, 39, 0.95)",
                      border: "2px solid #6366F1",
                      borderRadius: "16px",
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 20px rgba(99, 102, 241, 0.3)",
                      backdropFilter: "blur(16px)",
                      color: "white",
                      fontWeight: "bold",
                    }}
                    formatter={(value) => [
                      <span key="revenue-value" style={{ color: "#22D3EE", fontSize: "16px", fontWeight: "bold" }}>
                        KES {value.toLocaleString()}
                      </span>,
                      "🚀 Revenue",
                    ]}
                    labelStyle={{ color: "#A855F7", fontWeight: "bold", marginBottom: "8px" }}
                    cursor={{ fill: "rgba(168, 85, 247, 0.1)" }}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="url(#darkRevenue)"
                    radius={[12, 12, 4, 4]}
                    stroke="#A855F7"
                    strokeWidth={2}
                    filter="url(#glow)"
                    className="hover:opacity-90 transition-all duration-300"
                    onMouseEnter={(data, index) => {
                      // Add hover effect
                      const bars = document.querySelectorAll(".recharts-bar-rectangle")
                      if (bars[index]) {
                        bars[index].setAttribute("fill", "url(#darkRevenueHover)")
                      }
                    }}
                    onMouseLeave={(data, index) => {
                      // Remove hover effect
                      const bars = document.querySelectorAll(".recharts-bar-rectangle")
                      if (bars[index]) {
                        bars[index].setAttribute("fill", "url(#darkRevenue)")
                      }
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>

              {/* Progress Indicators */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-green-400 font-bold text-sm">Level 12</p>
                  <p className="text-gray-400 text-xs">Revenue Master</p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-r from-purple-400 to-pink-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-purple-400 font-bold text-sm">52 Weeks</p>
                  <p className="text-gray-400 text-xs">Growth Streak</p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-r from-cyan-400 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-cyan-400 font-bold text-sm">2,847 XP</p>
                  <p className="text-gray-400 text-xs">Total Score</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Members Management */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-houselook-darkgray mb-2">Members Management</h3>
              <p className="text-houselook-coolgray">Manage and monitor user accounts</p>
            </div>
            <div className="flex items-center gap-4 mt-4 lg:mt-0">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-houselook-coolgray" />
                <input
                  type="text"
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 border border-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-houselook-cyan bg-white/50 backdrop-blur-sm transition-all duration-300 w-64"
                />
              </div>
              <button className="group flex items-center gap-3 bg-gradient-to-r from-houselook-cyan to-houselook-teal text-white px-6 py-3 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105">
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                <span className="font-semibold">Export</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-houselook-whitesmoke">
                  <th className="text-left py-4 px-6 font-bold text-houselook-darkgray">Member</th>
                  <th className="text-left py-4 px-6 font-bold text-houselook-darkgray">Points</th>
                  <th className="text-left py-4 px-6 font-bold text-houselook-darkgray">Properties</th>
                  <th className="text-left py-4 px-6 font-bold text-houselook-darkgray">Joined</th>
                  <th className="text-left py-4 px-6 font-bold text-houselook-darkgray">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member, index) => (
                  <tr
                    key={index}
                    className="border-b border-houselook-whitesmoke hover:bg-gradient-to-r hover:from-houselook-aliceblue/30 hover:to-transparent transition-all duration-300 group"
                  >
                    <td className="py-6 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-houselook-cyan to-houselook-indigo rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-houselook-darkgray group-hover:text-houselook-cyan transition-colors duration-300">
                            {member.name}
                          </p>
                          <p className="text-sm text-houselook-coolgray">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-xl">
                          <Coins className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-houselook-darkgray text-lg">{member.points}</span>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-houselook-indigo to-purple-600 p-2 rounded-xl">
                          <Home className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-houselook-darkgray text-lg">{member.properties}</span>
                      </div>
                    </td>
                    <td className="py-6 px-6 text-houselook-coolgray font-medium">
                      {new Date(member.joined).toLocaleDateString()}
                    </td>
                    <td className="py-6 px-6">
                      <div className="flex items-center gap-2">
                        {member.status === "Premium" ? (
                          <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                            <Crown className="w-4 h-4" />
                            Premium
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                            <Star className="w-4 h-4" />
                            Active
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
