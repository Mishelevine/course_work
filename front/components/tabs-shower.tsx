import React, { useEffect, useState } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from 'axios'
import { API_URL } from '@/constants'
import { Skeleton } from './ui/skeleton'
import { useUser } from '@/hooks/use-user'

type Tab = {
    value: string,
    tab_text: string,
    description: string,
    children: React.ReactNode
    min_needed_role: number
}

export default function TabsShower({
    tabs,
    userRole,
    startTab
}: {
    tabs: Tab[]
    userRole: number
    startTab: string | null
}) {
    const [tabsFiltered, setTabsFiltered] = useState<Tab[]>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const tabsFilteredArr = tabs.filter(tab => tab.min_needed_role <= userRole)
        setTabsFiltered(tabsFilteredArr)
        setIsLoading(false)
    }, [userRole])

    if (isLoading || !tabsFiltered?.length) return <Skeleton className='w-full' />

    return (
        <Tabs defaultValue={startTab ? startTab : tabsFiltered[0].value} className="w-full">
            <TabsList className={`grid w-full gap-x-0.5 h-fit`} style={{ gridTemplateColumns: `repeat(${tabsFiltered.length}, 1fr)` }}>
                {tabsFiltered.map(tab => {
                    return (
                        <TabsTrigger
                            className='data-[state=active]:text-white
                        data-[state=active]:shadow-sm
                        data-[state=active]:bg-blue-2
                        max-md:text-xs
                        h-full
                        whitespace-normal'
                            key={tab.value}
                            value={tab.value}
                        >
                            {tab.tab_text}
                        </TabsTrigger>
                    )
                })}
            </TabsList>
            {tabsFiltered.map(tab => {
                return (
                    <TabsContent key={tab.value} value={tab.value}>
                        <Card>
                            <CardHeader>
                                <CardTitle>{tab.tab_text}</CardTitle>
                                <CardDescription>{tab.description}</CardDescription>
                            </CardHeader>
                            <Separator className="bg-gray-300" />
                            <CardContent className="space-y-2">{tab.children}</CardContent>
                        </Card>
                    </TabsContent>
                )
            })}
        </Tabs>
    )
}
