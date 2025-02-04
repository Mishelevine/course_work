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

async function getEquipmentData(equipmentId?: number): Promise<z.infer<typeof EquipmentSchema>[]> {
    if (!equipmentId)
        return (await axios.get(API_URL + '/equipment/all')).data
    else{
        const equipment = (await axios.get(API_URL + `/equipment/${equipmentId}`)).data
        const typeId = (await axios.get(API_URL + `/equipment_types/${equipmentId}`)).data.type_name
        return [{
            ...equipment,
            type_name: typeId
        }]
    }
}

export default async function EquipmentTable(
{
    forStatus,
    equipmentId
} : {
    forStatus: boolean,
    equipmentId?: number
}) {
    const data = await getEquipmentData(equipmentId)
    return (
        <EquipmentDataTable columns={EquipmentTableColumns} data={data} forStatus={forStatus} />
    )
}
