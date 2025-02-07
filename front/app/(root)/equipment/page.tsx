"use client"

import TabsShower from '@/components/tabs-shower'

import EquipmentTable from '@/components/equipment-table/equipment-table'
import EquipmentTypeTable from '@/components/equipment-type-table/equipment-type-table'
import EquipmentStatusTypeTable from '@/components/equipment-status-type-table/equipment-status-type-table'
import BuildingTable from '@/components/building-table/building-table'
import ResponsibleUserTable from '@/components/responsible-user-table/responsible-user-table'
import ResponsibleUserJobTable from '@/components/responsible-user-job-table/responsible-user-job-table'
import ResponsibleUserOfficeTable from '@/components/responsible-user-office-table/responsible-user-office-table'

const tabs = [
    {
        value: "equipment",
        tab_text: "Учёт комплекса ТС",
        description: "Здесь вы можете просмотреть информацию о комплексе технических средств, который используется в НИУ ВШЭ г. Пермь",
        children: <EquipmentTable forStatus={false} />
    },
    {
        value: "equipment_types",
        tab_text: "Типы оборудования",
        description: "Здесь вы можете просмотреть все доступные типы оборудования",
        children: <EquipmentTypeTable/>
    },
    {
        value: "equipment_statuses",
        tab_text: "Статусы оборудования",
        description: "Здесь вы можете просмотреть все доступные о статусы оборудования",
        children: <EquipmentStatusTypeTable/>
    },
    {
        value: "buildings",
        tab_text: "Адреса УК",
        description: "Здесь вы можете просмотреть все доступные адреса учебных корпусов",
        children: <BuildingTable/>
    },
    {
        value: "responsible_users",
        tab_text: "Ответственные лица",
        description: "Здесь вы можете просмотреть информацию об ответственных за оборудование лицах",
        children: <ResponsibleUserTable/>
    },
    {
        value: "responsible_users_jobs",
        tab_text: "Должности ответственных лиц",
        description: "Здесь вы можете просмотреть все доступные должности ответственных за оборудование лиц",
        children: <ResponsibleUserJobTable/>
    },
    {
        value: "responsible_users_offices",
        tab_text: "Подразделения ответственных лиц",
        description: "Здесь вы можете просмотреть все доступные подразделения ответственных за оборудование лиц",
        children: <ResponsibleUserOfficeTable/>
    },
]

const EquipmentPage = () => {
    return (
        <section className='flex size-full flex-col gap-5
        bg-light-3 p-6 rounded-[14px] border shadow-sm max-sm:w-screen'
        >
            <TabsShower tabs={tabs}/>
        </section>
    )
}

export default EquipmentPage
