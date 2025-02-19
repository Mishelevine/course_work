"use client"

import TabsShower from '@/components/tabs-shower'

import EquipmentTable from '@/components/equipment-table/equipment-table'
import EquipmentTypeTable from '@/components/equipment-type-table/equipment-type-table'
import EquipmentStatusTypeTable from '@/components/equipment-status-type-table/equipment-status-type-table'
import BuildingTable from '@/components/building-table/building-table'
import ResponsibleUserTable from '@/components/responsible-user-table/responsible-user-table'
import ResponsibleUserJobTable from '@/components/responsible-user-job-table/responsible-user-job-table'
import ResponsibleUserOfficeTable from '@/components/responsible-user-office-table/responsible-user-office-table'
import { Skeleton } from '@/components/ui/skeleton'
import { useUser } from '@/hooks/use-user'
import { useEffect, useState } from 'react'

const EquipmentPage = () => {
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

    const tabs = [
        {
            value: "equipment",
            tab_text: "Учёт комплекса ТС",
            description: "Здесь вы можете просмотреть информацию о комплексе технических средств, который используется в НИУ ВШЭ г. Пермь",
            children: <EquipmentTable forStatus={false} userRole={userRole} />,
            min_needed_role: 2
        },
        {
            value: "equipment_types",
            tab_text: "Типы оборудования",
            description: "Здесь вы можете просмотреть все доступные типы оборудования",
            children: <EquipmentTypeTable />,
            min_needed_role: 3
        },
        {
            value: "equipment_statuses",
            tab_text: "Статусы оборудования",
            description: "Здесь вы можете просмотреть все доступные статусы оборудования",
            children: <EquipmentStatusTypeTable />,
            min_needed_role: 3
        },
        {
            value: "buildings",
            tab_text: "Адреса корпусов",
            description: "Здесь вы можете просмотреть все доступные адреса учебных корпусов",
            children: <BuildingTable />,
            min_needed_role: 3
        },
        {
            value: "responsible_users",
            tab_text: "Ответственные лица",
            description: "Здесь вы можете просмотреть информацию об ответственных за оборудование лицах",
            children: <ResponsibleUserTable />,
            min_needed_role: 3
        },
        {
            value: "responsible_users_jobs",
            tab_text: "Должности",
            description: "Здесь вы можете просмотреть все доступные должности ответственных за оборудование лиц",
            children: <ResponsibleUserJobTable />,
            min_needed_role: 3
        },
        {
            value: "responsible_users_offices",
            tab_text: "Подразделения",
            description: "Здесь вы можете просмотреть все доступные подразделения ответственных за оборудование лиц",
            children: <ResponsibleUserOfficeTable />,
            min_needed_role: 3
        },
    ]

    return (
        <section className='flex size-full flex-col gap-5
        bg-light-3 p-6 rounded-[14px] border shadow-sm max-sm:w-screen'
        >
            <TabsShower tabs={tabs} userRole={userRole} startTab={lastTab} />
        </section>
    )
}

export default EquipmentPage
