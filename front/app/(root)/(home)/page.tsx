"use client"

import TabsShower from "@/components/tabs-shower"

import ContractsTable from "@/components/contracts-table/contracts-table"
import LicensesTable from "@/components/license-table/licenses-table"
import SoftwareTable from "@/components/software-table/software-table"

const tabs = [
    {
        value: "software",
        tab_text: "Учёт ПО",
        description: "Здесь вы можете просмотреть информацию о ПО, которое используется в НИУ ВШЭ г. Пермь",
        children: <SoftwareTable/>
    },
    {
        value: "contracts",
        tab_text: "Договоры",
        description: "Здесь вы можете просмотреть все доступные договоры для ПО",
        children: <ContractsTable checkboxes={false} actions={true}/>
    },
    {
        value: "licenses",
        tab_text: "Лицензии",
        description: "Здесь вы можете просмотреть все доступные лицензии для ПО",
        children: <LicensesTable/>
    },
]

function Home() {
  return (
    <section className='flex size-full flex-col gap-5
      bg-light-3 p-6 rounded-[14px] border shadow-sm max-sm:w-screen'>
      <TabsShower tabs={tabs}/>
    </section>
  )
}

export default Home
