
import Sidebar from '@/components/shared/Sidebar'
import React from 'react'

export default function DashboardLayout({children}: {children: React.ReactNode}) {
  const loggedIn = {
    firstname: "Ezrah",
    lastname: "Murray",
  }
  return (
      <main className='flex min-h-screen flex-col w-full bg-white lg:flex-row'>
        <Sidebar user={loggedIn?.firstname || loggedIn.firstname}/>
          {children}
      </main>
  )
}