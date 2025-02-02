import { z } from "zod"
import { EquipmentSpecsTableColumns } from "./columns"
import { EquipmentSpecsSchema } from "@/schemas"
import axios from "axios"
import { API_URL } from "@/constants"
import { EquipmentSpecsDataTable } from "./data-table"

async function getEquipmentSpecsData(equipmentId: number): Promise<z.infer<typeof EquipmentSpecsSchema>[]> {
    return (await axios.get(API_URL + `/equipment_specs/by_equipment/${equipmentId}`)).data
}

export default async function EquipmentSpecsTable(
{
    equipmentId
} : {
    equipmentId: number
}) {
    const data = await getEquipmentSpecsData(equipmentId)
    // console.log(data)
    return (
        <EquipmentSpecsDataTable columns={EquipmentSpecsTableColumns} data={data} equipmentId={equipmentId} />
    )
}
