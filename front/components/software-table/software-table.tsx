import { z } from "zod"
import { SoftwareTableColumns } from "./columns"
import { ContractSchemaFromBack, SoftwareTableSchema } from "@/schemas"
import axios from "axios"
import { API_URL } from "@/constants"
import { SoftwareDataTable } from "./data-table"

type SoftwareSchemaFromBack = {
    name: string,
    short_name: string,
    program_link: string,
    version: string,
    version_date: string,
    license_id: number,
    contracts: z.infer<typeof ContractSchemaFromBack>[],
    id: number
}

async function getSoftwareData(): Promise<z.infer<typeof SoftwareTableSchema>[]> {
    const softwareData = (await axios.get(API_URL + '/software/all')).data

    const newData = await Promise.all(softwareData.map(async (elem: SoftwareSchemaFromBack) => {
        const licenseType = (await axios.get(API_URL + `/license/${elem.license_id}`)).data.license_type
        const newElem = {
            id: elem.id,
            name: elem.name,
            short_name: elem.short_name,
            program_link: elem.program_link,
            version: elem.version,
            version_date: elem.version_date,
            license_type: licenseType,
            contracts: elem.contracts,
        }
        return newElem
    }))

    return newData
}

export default async function SoftwareTable() {
    const data = await getSoftwareData()

    return (
        <SoftwareDataTable columns={SoftwareTableColumns} data={data} />
    )
}
