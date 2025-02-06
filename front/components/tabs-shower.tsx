import React from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Tab = {
    value: string,
    tab_text: string,
    description: string,
    children: React.ReactNode
}

export default function TabsShower({
    tabs
} : {
    tabs: Tab[]
}) {
  return (
    <Tabs defaultValue={tabs[0].value} className="w-full">
      <TabsList className={`grid w-full grid-cols-${tabs.length} gap-x-0.5 h-fit`}>
        {tabs.map(tab => {
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
        {tabs.map(tab => {
            return (
                <TabsContent key={tab.value} value={tab.value}>
                    <Card>
                        <CardHeader>
                            <CardTitle>{tab.tab_text}</CardTitle>
                            <CardDescription>{tab.description}</CardDescription>
                        </CardHeader>
                        <Separator className="bg-gray-300"/>
                        <CardContent className="space-y-2">{tab.children}</CardContent>
                    </Card>
                </TabsContent>
            )
        })}
    </Tabs>
  )
}
