import ContractsTable from '@/components/contracts_table/contracts-table'
import React from 'react'

const ContractsPage = () => {
    return (
        <section
            className='flex flex-col gap-5 bg-light-3 p-6
            rounded-[14px] border border-gray-300 shadow'
        >
            <ContractsTable checkboxes={true} actions={true}/>
        </section>
    )
}

export default ContractsPage
