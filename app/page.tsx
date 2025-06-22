import { HeroSection } from "@/components/hero-section"
import { SearchSection } from "@/components/search-section"
import { FeaturedHouses } from "@/components/featured-houses"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <SearchSection />
      <div className="bg-houselook-whitesmoke pt-24 pb-16">
        <FeaturedHouses />
      </div>
      <Footer />
    </div>
  )
}
