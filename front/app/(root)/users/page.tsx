import UserLogTable from '@/components/user-log-table/user-log-table'
import React from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function TabsShower() {
  return (
    <Tabs defaultValue="users" className="w-full">
      <TabsList className="grid w-full grid-cols-2 gap-x-0.5 max-md:h-12 ">
        <TabsTrigger className='data-[state=active]:text-white
                                  data-[state=active]:shadow-sm
                                  data-[state=active]:bg-blue-2
                                  max-md:text-xs
                                  h-full
                                  whitespace-normal'
                     value="users">Пользователи системы</TabsTrigger>
        <TabsTrigger className='data-[state=active]:text-white
                                  data-[state=active]:shadow-sm
                                  data-[state=active]:bg-blue-2
                                  max-md:text-xs
                                  h-full
                                  whitespace-normal'
                     value="userlog">Журнал аудита</TabsTrigger>
      </TabsList>
      <TabsContent value="users">
        <Card>
          <CardHeader>
            <CardTitle>Пользователи системы</CardTitle>
            <CardDescription>
              Здесь вы можете просмотреть информацию пользователях системы
            </CardDescription>
          </CardHeader>
          <Separator className="bg-gray-300"/>
          <CardContent className="space-y-2">
            <div> full users table ! </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="userlog">
        <Card>
          <CardHeader>
            <CardTitle>Журнал аудита</CardTitle>
            <CardDescription>
              Здесь вы можете просмотреть информацию сессиях пользователей системы
            </CardDescription>
          </CardHeader>
          <Separator className="bg-gray-300"/>
          <CardContent className="space-y-2">
            <UserLogTable />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

const UsersPage = () => {
  return (
     <section
          className='flex flex-col gap-5 bg-light-3 p-6
          rounded-[14px] border border-gray-300 shadow'
      >
        <TabsShower />
      </section>
  )
}

export default UsersPage
