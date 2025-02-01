import { z } from "zod"
import { ContractsTableColumns } from "./columns"
import { ContractSchema } from "@/schemas"
import axios from "axios"
import { API_URL } from "@/constants"
import { ContractsDataTable } from "./data-table"

const temp_contracts = [
    {
        id: 2,
        contract_number: "6027-914",
        contract_date: "2020-10-11",
        selected: true
    },
    {
        id: 3,
        contract_number: "string",
        contract_date: "2025-01-13",
        selected: false
    },
]

async function getContractsData({
    software_id
}: {
    software_id?: number | undefined
}): Promise<z.infer<typeof ContractSchema>[]> {
    const contractsDataFull = (await axios.get(API_URL + `/contract/${software_id}`)).data;
    if (software_id !== undefined) {
        const contractsDataById = (await axios.get(API_URL + '/contract/all')).data
    }
    // обработать дату, обрезать ее
    return contractsDataFull
}

export default async function ContractsTable({
    checkboxes,
    actions,
    software_id
} : {
    checkboxes: boolean,
    actions: boolean,
    software_id?: number | undefined
}) {
    // const data = await getContractsData(software_id)
    // console.log(data)
    const data = temp_contracts
    return (
        <section
            className='flex flex-col gap-5 bg-light-3 p-6
            rounded-[14px] border border-gray-300 shadow'
        >
            <ContractsDataTable columns={ContractsTableColumns} data={data} checkboxes={checkboxes} actions={actions} />
        </section>
    )
}
