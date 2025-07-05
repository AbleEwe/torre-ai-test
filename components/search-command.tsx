"use client"

import { useState } from "react"
import { Command, CommandInput } from "@/components/ui/command"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { UserProfile } from "@/types"
import { useUser } from "@/context/userContext"


export function SearchCommand() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [showResults, setShowResults] = useState(true)
  const { setSelectedUser, fetchGenomeData } = useUser()


  const handleUserSelect = async (user: UserProfile) => {
    setSelectedUser(user)
    setShowResults(false)
    await fetchGenomeData(user.username) 
  }

  const handleSearch = async (e: any) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setSearched(true);
    try {
      const response = await fetch('https://torre.ai/api/entities/_searchStream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          limit: 10,
        }),
      });

      if (!response.ok) throw new Error('Search failed');
      
      if (response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let resultsData = '';
        let parsedResults: UserProfile[] = [];

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          resultsData += decoder.decode(value, { stream: true });
          
          const lines = resultsData.split('\n');
          resultsData = lines.pop() || '';
          
          for (const line of lines) {
            if (line.trim()) {
              try {
                parsedResults.push(JSON.parse(line));
              } catch (e) {
                console.error('Error parsing line:', line);
              }
            }
          }
        }
        
        if (resultsData.trim()) {
          try {
            parsedResults.push(JSON.parse(resultsData));
          } catch (e) {
            console.error('Error parsing final line:', resultsData);
          }
        }
        
        setResults(parsedResults);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Torre Profile Search
          <Badge variant="secondary" className="ml-auto">
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Command className="rounded-lg border shadow-md flex-1">
            <CommandInput
              placeholder="Search for developers, designers, or skills..."
              value={query}
              onValueChange={setQuery}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
            />
          </Command>
          <Button onClick={handleSearch} disabled={loading || !query.trim()}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>

        <div className="border rounded-lg p-4">
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : searched ? (
            results.length > 0 ? (
              <div className="space-y-4">
                <h3 className="font-medium">Search Results</h3>
                {results.map((profile) => (
                  <div key={profile.ardaId} className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded" onClick={() => handleUserSelect(profile)} >
                    <img 
                      src={profile.imageUrl || "./placeholder-user.jpg" } 
                      alt={profile.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{profile.name}</p>
                      <p className="text-sm text-gray-600">{profile.professionalHeadline}</p>
                      {profile.verified && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p>No profiles found for "{query}"</p>
              </div>
            )
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}