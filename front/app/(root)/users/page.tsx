"use client"

import TabsShower from '@/components/tabs-shower'

import UserLogTable from '@/components/user-log-table/user-log-table'
import UserTable from '@/components/users-table/user-table'
import UserJobTable from '@/components/user-job-table/user-job-table'
import UserOfficeTable from '@/components/user-office-table/user-office-table'
import { Skeleton } from '@/components/ui/skeleton'
import { useUser } from '@/hooks/use-user'
import { useEffect, useState } from 'react'

const tabs = [
    {
        value: "users",
        tab_text: "Пользователи системы",
        description: "Здесь вы можете просмотреть информацию пользователях системы",
        children: <UserTable />,
        min_needed_role: 4
    },
    {
        value: "user_jobs",
        tab_text: "Должности",
        description: "Здесь вы можете просмотреть все доступные должности пользователей системы",
        children: <UserJobTable />,
        min_needed_role: 4
    },
    {
        value: "user_offices",
        tab_text: "Подразделения",
        description: "Здесь вы можете просмотреть все доступные подразделения пользователей системы",
        children: <UserOfficeTable />,
        min_needed_role: 4
    },
    {
        value: "user_log",
        tab_text: "Журнал аудита",
        description: "Здесь вы можете просмотреть информацию сессиях пользователей системы",
        children: <UserLogTable />,
        min_needed_role: 4
    },
]

const UsersPage = () => {
    const { userRole, isLoadingUser } = useUser()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [lastTab, setLastTab] = useState<string | null>(null)

    useEffect(() => {
        setIsLoading(true)
        setLastTab(localStorage.getItem("last_tab"))
        localStorage.removeItem("last_tab")
        setIsLoading(false)
    }, [])

    if (isLoading || isLoadingUser) return <Skeleton className="flex size-full" />

    return (
        <section
            className='flex flex-col gap-5 bg-light-3 p-6
            rounded-[14px] border border-gray-300 shadow'
        >
            <TabsShower tabs={tabs} userRole={userRole} startTab={lastTab} />
        </section>
    )
}

export default UsersPage
