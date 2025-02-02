import EquipmentTable from '@/components/equipment-table/equipment-table'
import React from 'react'

const EquipmentPage = () => {
    return (
        <section className='flex size-full flex-col gap-5
        bg-light-3 p-6 rounded-[14px] border shadow-sm max-sm:w-screen'
        >
            <EquipmentTable forStatus={false} />
        </section>
    )
}

export default EquipmentPage
