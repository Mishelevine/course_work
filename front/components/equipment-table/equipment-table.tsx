import { z } from "zod"
import { EquipmentTableColumns } from "./columns"
import { EquipmentSchema } from "@/schemas"
import axios from "axios"
import { API_URL } from "@/constants"
import { EquipmentDataTable } from "./data-table"
import { cookies } from "next/headers";

async function getEquipmentData(equipmentId?: number): Promise<z.infer<typeof EquipmentSchema>[]> {
    if (!equipmentId){
        const cookieStore = await cookies();
        const cookieHeader = cookieStore.toString();
        return (await axios.get(API_URL + '/equipment/all', {
            headers: {
                Cookie: cookieHeader,
            },
        })).data
    }
    else {
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
