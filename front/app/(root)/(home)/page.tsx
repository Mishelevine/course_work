"use client"

import ContractsTable from "@/components/contracts-table/contracts-table"
import LicensesTable from "@/components/license-table/licenses-table"
import SoftwareTable from "@/components/software-table/software-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"

function TabsShower() {
  return (
    <Tabs defaultValue="software" className="w-full">
      <TabsList className="grid w-full grid-cols-3 gap-x-0.5 max-md:h-12 ">
        <TabsTrigger className='data-[state=active]:text-white
                                  data-[state=active]:shadow-sm
                                  data-[state=active]:bg-blue-2
                                  max-md:text-xs
                                  h-full
                                  whitespace-normal'
                     value="software">Учёт ПО</TabsTrigger>
        <TabsTrigger className='data-[state=active]:text-white
                                  data-[state=active]:shadow-sm
                                  data-[state=active]:bg-blue-2
                                  max-md:text-xs
                                  h-full
                                  whitespace-normal'
                     value="contracts">Договоры</TabsTrigger>
        <TabsTrigger className='data-[state=active]:text-white
                                  data-[state=active]:shadow-sm
                                  data-[state=active]:bg-blue-2
                                  max-md:text-xs
                                  h-full
                                  whitespace-normal'
                     value="licenses">Лицензии</TabsTrigger>
      </TabsList>
      <TabsContent value="software">
        <Card>
          <CardHeader>
            <CardTitle>Учёт ПО</CardTitle>
            <CardDescription>
              Здесь вы можете просмотреть информацию о ПО, которое используется в НИУ ВШЭ г. Пермь
            </CardDescription>
          </CardHeader>
          <Separator className="bg-gray-300"/>
          <CardContent className="space-y-2">
            <SoftwareTable/>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="contracts">
        <Card>
          <CardHeader>
            <CardTitle>Договоры</CardTitle>
            <CardDescription>
              Здесь вы можете просмотреть информацию о договорах для ПО
            </CardDescription>
          </CardHeader>
          <Separator className="bg-gray-300"/>
          <CardContent className="space-y-2">
            <ContractsTable checkboxes={false} actions={true}/>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="licenses">
        <Card>
          <CardHeader>
            <CardTitle>Лицензии</CardTitle>
            <CardDescription>
              Здесь вы можете просмотреть информацию о лицензиях для ПО
            </CardDescription>
          </CardHeader>
          <Separator className="bg-gray-300"/>
          <CardContent className="space-y-2">
            <LicensesTable/>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

function Home() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return <div>Loading...</div>

  return (
    <section className='flex size-full flex-col gap-5
      bg-light-3 p-6 rounded-[14px] border shadow-sm max-sm:w-screen'>
      <TabsShower/>
    </section>
  )
}

export default Home
