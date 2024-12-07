'use client'

import React from 'react'

import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'

import Link from 'next/link';
import { cn } from '@/lib/utils'
import Image from 'next/image';

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between
        bg-light-2 p-6 pt-24 max-sm:hidden lg:w-[264px] shadow-md'>
            <div className='flex flex-1 flex-col gap-6'>
                {sidebarLinks.map((link) => {
                    const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);

                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={cn('flex gap-4 items-center p-4 rounded-lg justify-start transition-colors hover:bg-zinc-300', {
                                'bg-blue-1 hover:bg-blue-500': isActive,
                            })}
                        >
                            {/* <Image
                                src={link.imgUrl}
                                alt={link.label}
                                width={24}
                                height={24}
                            /> */}
                            <p className='text-lg font-semibold max-lg:hidden'>
                                {link.label}
                            </p>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}

export default Sidebar
