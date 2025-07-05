import { Suspense } from "react"
import { HeroSection } from "@/components/hero-section"
import { SearchCommand } from "@/components/search-command"
import { SkillVisualization } from "@/components/skill-visualization"
import { JobMatches } from "@/components/job-matches"
import { Navbar } from "@/components/navbar"

export default function HomePage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        <div className="mt-12 space-y-8">
          <Suspense fallback={<div>Loading search...</div>}>
            <SearchCommand />
          </Suspense>
          <div className="grid lg:grid-cols-2 gap-8">
            <Suspense fallback={<div>Loading skills...</div>}>
              <SkillVisualization />
            </Suspense>
            <Suspense fallback={<div>Loading matches...</div>}>
              <JobMatches />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  )
}
