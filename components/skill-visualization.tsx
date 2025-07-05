"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Layers, Code, Users, Lightbulb, Star } from "lucide-react"
import { useUser } from "@/context/userContext"


export function SkillVisualization() {
  const [activeCategories, setActiveCategories] = useState<string[]>(["technical", "soft", "domain"])
  const { genomeData } = useUser()
  const strengths = genomeData?.strengths || [] 

  const toggleCategory = (category: string) => {
    setActiveCategories((prev) => (prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]))
  }

  const getCategory = (code: number): "technical" | "soft" | "domain" => {
    if (code >= 100 && code < 200) return "technical"
    if (code >= 200 && code < 300) return "soft"
    return "domain"
  }

  const filteredData = strengths.filter((strength) => 
    activeCategories.includes(getCategory(strength.code))
  )

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "technical":
        return <Code className="w-4 h-4" />
      case "soft":
        return <Users className="w-4 h-4" />
      case "domain":
        return <Lightbulb className="w-4 h-4" />
      default:
        return null
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "technical":
        return "bg-blue-500"
      case "soft":
        return "bg-green-500"
      case "domain":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const getProficiencyLevel = (proficiency: string) => {
    switch (proficiency.toLowerCase()) {
      case "beginner":
        return 30
      case "intermediate":
        return 65
      case "advanced":
        return 85
      case "expert":
        return 95
      default:
        return 50
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers className="w-5 h-5" />
          Strengths Visualization
        </CardTitle>
        <div className="flex flex-wrap gap-2">
          {["technical", "soft", "domain"].map((category) => (
            <Button
              key={category}
              variant={activeCategories.includes(category) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleCategory(category)}
              className="capitalize"
            >
              {getCategoryIcon(category)}
              <span className="ml-1">{category}</span>
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {filteredData.length > 0 ? (
          filteredData.map((strength) => {
            const category = getCategory(strength.code)
            const proficiencyLevel = getProficiencyLevel(strength.proficiency)
            
            return (
              <div key={strength.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${getCategoryColor(category)}`} />
                  <span className="font-medium">{strength.name}</span>
                  <Badge variant="secondary" className="capitalize">
                    {category}
                  </Badge>
                  {strength.pin && <Star className="w-4 h-4 text-yellow-500" />}
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">{proficiencyLevel}%</div>
                    <div className="text-xs text-muted-foreground">{strength.proficiency}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{strength.weight.toFixed(1)}</div>
                    <div className="text-xs text-muted-foreground">Weight</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{strength.recommendations}</div>
                    <div className="text-xs text-muted-foreground">Recs</div>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            No strengths found or data is loading...
          </div>
        )}
      </CardContent>
    </Card>
  )
}