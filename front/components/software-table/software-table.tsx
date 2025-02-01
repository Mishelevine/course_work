import { z } from "zod"
import { SoftwareTableColumns } from "./columns"
import { SoftwareTableSchema } from "@/schemas"
import axios from "axios"
import { API_URL } from "@/constants"
import { SoftwareDataTable } from "./data-table"

type Contract = {
    contract_number: string,
    contract_date: string,
    id: number
}

type SoftwareSchemaFromBack = {
    name: string,
    short_name: string,
    program_link: string,
    version: string,
    version_date: string,
    license_id: number,
    contracts: Contract[],
    id: number
}

async function getSoftwareData(): Promise<z.infer<typeof SoftwareTableSchema>[]> {
    const softwareData = (await axios.get(API_URL + '/software/all')).data

    const newData = await Promise.all(softwareData.map(async (elem: SoftwareSchemaFromBack) => {
        const licenseType = (await axios.get(API_URL + `/license/${elem.license_id}`)).data.license_type
        const contract = elem.contracts[0]
        const newElem = {
            name: elem.name,
            short_name: elem.short_name,
            program_link: elem.program_link,
            version: elem.version,
            version_date: elem.version_date.substring(0, 10),
            license_type: licenseType,
            contract_number: contract.contract_number,
            contract_date: contract.contract_date.substring(0, 10),
            id: elem.id
        }
        return newElem
    }))

    return newData
}

export default async function SoftwareTable() {
    const data = await getSoftwareData()
    // console.log(data)
    return (
        <section
            className='flex flex-col gap-5 bg-light-3 p-6
            rounded-[14px] border border-gray-300 shadow'
        >
            <SoftwareDataTable columns={SoftwareTableColumns} data={data} />
        </section>
    )
}
