"use client";

// import Navbar from '@/components/Navbar'
// import Sidebar from '@/components/Sidebar'
// import { Toaster } from 'sonner';

import React, { ReactNode } from 'react'

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className='relative'>
      {/* <Navbar /> */}
      <h1>Hello, this is header!</h1>
      <div className='flex'>
          {/* <Sidebar /> */}
          <h1>This is Sidebar if needed :)</h1>
          <section className='flex min-h-screen flex-1 flex-col
                              max-sm:px-0 max-sm:pt-24 px-6 pb-6
                              pt-28 max-md:pb-14 sm:px-10'>
              <div className='w-full'>
                  {children}
              </div>
              {/* <Toaster /> */}
          </section>
      </div>
    </main>
  )
}

export default RootLayout
