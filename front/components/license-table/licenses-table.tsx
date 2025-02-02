import { z } from "zod"
import { LicensesTableColumns } from "./columns"
import axios from "axios"
import { API_URL } from "@/constants"
import { LicenseDataTable } from "./data-table"
import { LicenseSchema } from "@/schemas"

async function getLicensesData(): Promise<z.infer<typeof LicenseSchema>[]> {
    const licensesData = (await axios.get(API_URL + '/license/all')).data
    return licensesData
}

export default async function LicensesTable() {
    const data = await getLicensesData()

    return (
        <LicenseDataTable columns={LicensesTableColumns} data={data} />
    )
}
