import { z } from "zod"
import { EquipmentTableColumns } from "./columns"
import { EquipmentSchema } from "@/schemas"
import axios from "axios"
import { API_URL } from "@/constants"
import { EquipmentDataTable } from "./data-table"

type EquipmentSchemaFromBack = {
    type_id: number,
    model: string,
    serial_number: string,
    inventory_number: string,
    network_name: string,
    remarks: string,
    responsible_user_full_name: string,
    id: number
}

async function getEquipmentData(): Promise<z.infer<typeof EquipmentSchema>[]> {
    const equipmentData = (await axios.get(API_URL + '/equipment/all')).data
    return equipmentData
}

export default async function EquipmentTable() {
    const data = await getEquipmentData()

    return (
        <EquipmentDataTable columns={EquipmentTableColumns} data={data} />
    )
}
