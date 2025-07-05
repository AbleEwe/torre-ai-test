// contexts/UserContext.tsx
"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { PersonResponse, UserProfile } from "../types" 

interface UserContextType {
  selectedUser: UserProfile | null
  genomeData: PersonResponse | null
  setSelectedUser: (user: UserProfile | null) => void
  fetchGenomeData: (username: string) => Promise<void>
  clearUser: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null)
  const [genomeData, setGenomeData] = useState<PersonResponse | null>(null)

  const fetchGenomeData = async (username: string) => {
    try {
      const response = await fetch(`/api/genome?username=${encodeURIComponent(username)}`);
      if (!response.ok) throw new Error('Failed to fetch genome data');
      const data = await response.json();
      setGenomeData(data);
    } catch (error) {
      console.error('Error:', error);
      setGenomeData(null);
    }
  };

  const clearUser = () => {
    setSelectedUser(null)
    setGenomeData(null)
  }

  return (
    <UserContext.Provider value={{ 
      selectedUser, 
      genomeData,
      setSelectedUser, 
      fetchGenomeData,
      clearUser 
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}