'use client'

import React, { useEffect, useState } from 'react'

import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { useUser } from '@/hooks/use-user';
import { Skeleton } from './ui/skeleton';

type SidebarLink = {
    label: string;
    route: string;
    min_needed_role: number;
}

const Sidebar = () => {
    const pathname = usePathname();
    const { userRole, isLoadingUser } = useUser()

    const [linksFiltered, setLinksFiltered] = useState<SidebarLink[]>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        console.log("In UseEffect")
        const linksFilteredArr = sidebarLinks.filter(link => link.min_needed_role <= userRole)
        setLinksFiltered(linksFilteredArr)
        setIsLoading(false)
    }, [userRole])

    if (isLoadingUser || isLoading || !linksFiltered?.length) return <Skeleton
        className='sticky left-0 top-0 flex h-screen w-fit max-sm:hidden lg:w-[264px]'
    />

    return (
        <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between
        bg-light-2 p-6 pt-24 max-sm:hidden lg:w-[264px] shadow-md'>
            <div className='flex flex-1 flex-col gap-6'>
                {linksFiltered.map((link) => {
                    const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);

                    return (
                        <a
                            href={link.route}
                            key={link.label}
                            className={cn(
                                'flex gap-4 items-center p-4 rounded-lg justify-start transition-colors hover:bg-zinc-300',
                                {
                                'bg-blue-1 hover:bg-blue-500': isActive,
                                }
                            )}
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
                        </a>
                    )
                })}
            </div>
        </section>
    )
}

export default Sidebar
