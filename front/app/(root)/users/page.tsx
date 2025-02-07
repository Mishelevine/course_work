"use client"

import TabsShower from '@/components/tabs-shower'

import UserLogTable from '@/components/user-log-table/user-log-table'
import UserTable from '@/components/users-table/user-table'
import UserJobTable from '@/components/user-job-table/user-job-table'
import UserOfficeTable from '@/components/user-office-table/user-office-table'

const tabs = [
    {
        value: "users",
        tab_text: "Пользователи системы",
        description: "Здесь вы можете просмотреть информацию пользователях системы",
        children: <UserTable />
    },
    {
        value: "userjobs",
        tab_text: "Должности",
        description: "Здесь вы можете просмотреть все доступные должности пользователей системы",
        children: <UserJobTable/>
    },
    {
        value: "useroffices",
        tab_text: "Подразделения",
        description: "Здесь вы можете просмотреть все доступные подразделения пользователей системы",
        children: <UserOfficeTable/>
    },
    {
        value: "userlog",
        tab_text: "Журнал аудита",
        description: "Здесь вы можете просмотреть информацию сессиях пользователей системы",
        children: <UserLogTable/>
    },
]

const UsersPage = () => {
  return (
     <section
          className='flex flex-col gap-5 bg-light-3 p-6
          rounded-[14px] border border-gray-300 shadow'
      >
        <TabsShower tabs={tabs}/>
      </section>
  )
}

export default UsersPage
