'use client'

import React from 'react'

import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { WebSiteName, sidebarLinks } from "@/constants"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import LogOutButton from './auth/logout-button'

const MobileNav = () => {
    const pathname = usePathname();

    return (
        <section className='w-full max-w-[264px]'>
            <Sheet>
                <SheetTitle />
                <SheetTrigger asChild>
                    <Image
                        src='/icons/hamburger.svg'
                        width={36}
                        height={36}
                        alt='ham icon'
                        className='cursor-pointer sm:hidden'
                    />
                </SheetTrigger>
                <SheetContent side="left" className="border-none bg-light-2">
                    <Link href='/' className='flex items-center gap-1'>
                        <Image
                        src='/icons/logo.svg'
                        width={36}
                        height={36}
                        alt='Site-logo'
                        className='max-sm:size-10'
                        />
                        <p className='text-[26px] text-blue-2 font-extrabold'> {WebSiteName} </p>
                    </Link>
                    <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
                        <SheetClose asChild>
                            <section className="flex h-full flex-col gap-6 pt-16">
                                {sidebarLinks.map((link) => {
                                    const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);

                                    return (
                                        <SheetClose asChild key={link.route}>
                                            <Link
                                                href={link.route}
                                                key={link.label}
                                                className={cn('flex gap-4 items-center p-4 rounded-lg w-full', {
                                                    'bg-blue-1': isActive,
                                                })}
                                            >
                                                {/* <Image
                                                    src={link.imgUrl}
                                                    alt={link.label}
                                                    width={20}
                                                    height={20}
                                                /> */}
                                                <p className='font-semibold'>
                                                    {link.label}
                                                </p>
                                            </Link>
                                        </SheetClose>
                                    )
                                })}
                            </section>
                        </SheetClose>
                        <LogOutButton/>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    )
}

export default MobileNav
