import type { Metadata } from 'next'
import './globals.css'
import { UserProvider } from '@/context/userContext'


export const metadata: Metadata = {
  title: 'Match jobs',
  description: 'Created to solver the technical test',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>        
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  )
}
