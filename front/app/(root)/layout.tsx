"use client";

import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
// import { Toaster } from 'sonner';

import React, { ReactNode } from 'react'

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className='relative'>
      <Navbar />
      <div className='flex'>
          <Sidebar />
          <section className='flex min-h-screen flex-1 flex-col
                              max-sm:px-0 max-sm:pt-24 px-6 pb-6
                              pt-28 max-md:pb-14 sm:px-10 bg-gray-100'>
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
