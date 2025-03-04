import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
import MobileNav from './mobile-nav'
import { PC_CENTER_PAGE, WebSiteName } from '@/constants'
import LogOutButton from './auth/logout-button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

const Navbar = () => {
  return (
    <nav className='flex justify-between fixed z-50 w-full bg-light-2 px-6 py-4 lg:px-10 shadow'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={PC_CENTER_PAGE} className='flex w-fit items-center gap-1'>
              <Image
                src='/icons/logo.svg'
                width={36}
                height={36}
                alt='Site-logo'
                className='max-sm:size-10'
              />
              <p className='text-[26px] text-blue-2 font-extrabold max-sm:hidden transition-colors hover:text-blue-500'> {WebSiteName} </p>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Перейти на сайт компьютерного центра</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className='flex-between w-fit gap-5'>
        <MobileNav/>
        <LogOutButton additionalClassName={'max-sm:hidden'}/>
      </div>
    </nav>
  )
}

export default Navbar
