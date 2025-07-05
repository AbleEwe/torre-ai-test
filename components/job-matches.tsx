"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Flame, MapPin, Building, Clock, ExternalLink, Info } from "lucide-react"

interface JobMatch {
  id: string
  title: string
  company: string
  location: string
  remote: boolean
  matchScore: number
  skillMatch: number
  seniorityMatch: number
  locationMatch: number
  explanation: string
  postedAt: string
  salary?: string
}

const mockJobMatches: JobMatch[] = [
  {
    id: "1",
    title: "Senior React Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    remote: true,
    matchScore: 94,
    skillMatch: 92,
    seniorityMatch: 95,
    locationMatch: 100,
    explanation:
      "Perfect match! You have 92% skill overlap with React, TypeScript, and GraphQL. Your senior-level experience aligns perfectly with their requirements.",
    postedAt: "2 days ago",
    salary: "$120k - $160k",
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "New York, NY",
    remote: false,
    matchScore: 87,
    skillMatch: 85,
    seniorityMatch: 90,
    locationMatch: 85,
    explanation:
      "Great match! Strong overlap in React and Node.js skills. Location preference slightly different but role offers growth opportunities.",
    postedAt: "1 week ago",
    salary: "$100k - $140k",
  },
  {
    id: "3",
    title: "Frontend Architect",
    company: "Enterprise Solutions",
    location: "Austin, TX",
    remote: true,
    matchScore: 82,
    skillMatch: 88,
    seniorityMatch: 85,
    locationMatch: 75,
    explanation:
      "Good match with strong technical skills alignment. Leadership experience valued for this architect role.",
    postedAt: "3 days ago",
    salary: "$140k - $180k",
  },
]

export function JobMatches() {
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null)

  const getMatchBadge = (score: number) => {
    if (score >= 90) return { label: "🔥 Hot Match", variant: "destructive" as const }
    if (score >= 80) return { label: "⭐ Great Match", variant: "default" as const }
    if (score >= 70) return { label: "👍 Good Match", variant: "secondary" as const }
    return { label: "💡 Potential Match", variant: "outline" as const }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="w-5 h-5" />
          Job Matches
          <Badge variant="secondary" className="ml-auto">
            {mockJobMatches.length} matches
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockJobMatches.map((match) => {
          const matchBadge = getMatchBadge(match.matchScore)

          return (
            <div
              key={match.id}
              className={`p-4 border rounded-lg transition-all cursor-pointer hover:shadow-md ${
                selectedMatch === match.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
              }`}
              onClick={() => setSelectedMatch(selectedMatch === match.id ? null : match.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{match.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Building className="w-4 h-4" />
                    {match.company}
                    <MapPin className="w-4 h-4 ml-2" />
                    {match.location}
                    {match.remote && (
                      <Badge variant="outline" className="text-xs">
                        Remote
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{match.matchScore}%</div>
                  <Badge {...matchBadge} className="text-xs">
                    {matchBadge.label}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Skills Match</span>
                  <span className="font-medium">{match.skillMatch}%</span>
                </div>
                <Progress value={match.skillMatch} className="h-2" />

                <div className="flex items-center justify-between text-sm">
                  <span>Seniority Match</span>
                  <span className="font-medium">{match.seniorityMatch}%</span>
                </div>
                <Progress value={match.seniorityMatch} className="h-2" />

                <div className="flex items-center justify-between text-sm">
                  <span>Location Match</span>
                  <span className="font-medium">{match.locationMatch}%</span>
                </div>
                <Progress value={match.locationMatch} className="h-2" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {match.postedAt}
                  </div>
                  {match.salary && <div className="font-medium text-green-600">{match.salary}</div>}
                </div>

                <div className="flex items-center gap-2">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Info className="w-4 h-4" />
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-semibold">Match Explanation</h4>
                        <p className="text-sm text-muted-foreground">{match.explanation}</p>
                        <div className="text-xs text-muted-foreground">
                          Score calculated:{" "}
                          {match.skillMatch * 0.7 + match.seniorityMatch * 0.2 + match.locationMatch * 0.1}% (70%
                          skills, 20% seniority, 10% location)
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>

                  <Button size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Job
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
