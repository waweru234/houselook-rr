import type React from "react"
import type { Metadata } from "next"
import { Noto_Serif, Bebas_Neue, Rowdies } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-serif",
})

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas-neue",
})

const rowdies = Rowdies({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-rowdies",
})

export const metadata: Metadata = {
  title: "HouseLook - Find Your Vibe, Find Your Crib",
  description: "Kenya's premier house-hunting platform for Gen Z. Discover and rent homes with style.",
  generator: "v0.dev",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${notoSerif.variable} ${bebasNeue.variable} ${rowdies.variable} font-sans`}>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}
