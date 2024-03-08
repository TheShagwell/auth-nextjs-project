
import React from 'react'

export default function DashboardLayout({children}: {children: React.ReactNode}) {
  return (
      <main className='flex min-h-screen flex-col w-full bg-white lg:flex-row'>
          {children}
      </main>
  )
}