import './globals.css'

import { Inter as FontSans } from 'next/font/google'
import type { Metadata } from 'next'
import NavBar from './components/NavBar'
import Providers from './components/Providers'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'For Airbox coding challenge',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-[#8E3E65] font-sans antialiased', fontSans.variable)}>
        <Providers>
          <NavBar />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
