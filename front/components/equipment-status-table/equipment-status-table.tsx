import { z } from "zod"
import { EquipmentStatusTableColumns } from "./columns"
import { EquipmentStatusSchema, EquipmentStatusTableSchema, ResponsibleUserSchema } from "@/schemas"
import axios from "axios"
import { API_URL } from "@/constants"
import { EquipmentStatusDataTable } from "./data-table"

async function getEquipmentStatusData(equipmentId: number): Promise<z.infer<typeof EquipmentStatusTableSchema>[]> {
    const statuses_raw = (await axios.get(API_URL + `/equipment_status/by_equipment/${equipmentId}`)).data as z.infer<typeof EquipmentStatusSchema>[]

    const newData = await Promise.all(statuses_raw.map(async (status: z.infer<typeof EquipmentStatusSchema>) => {
        const status_type_name = (await axios.get(API_URL + `/equipment_status_type/${status.status_type_id}`)).data.status_type_name
        const responsible_user = (await axios.get(API_URL + `/responsible_users/${status.responsible_user_id}`)).data as z.infer<typeof ResponsibleUserSchema>
        const user_fio =    responsible_user.last_name + " " +
                            responsible_user.first_name + " " +
                            (responsible_user.paternity ? responsible_user.paternity + " " : "");
        const user_job = (await axios.get(API_URL + `/responsible_users/job/${responsible_user.job_id}`)).data.job_name
        const user_office = (await axios.get(API_URL + `/responsible_users/office/${responsible_user.office_id}`)).data.office_name
        const building_address = (await axios.get(API_URL + `/buildings/${status.building_id}`)).data.building_address

        return {
            status_type_name: status_type_name,
            doc_number: status.doc_number,
            status_change_date: status.status_change_date,
            responsible_user_fio: user_fio,
            responsible_user_job_name: user_job,
            responsible_user_office_name: user_office,
            building_address: building_address,
            audience_id: status.audience_id,
            id: status.id,
            equipment_id: status.equipment_id
        } as z.infer<typeof EquipmentStatusTableSchema>
    }))

    return newData
}

export default async function EquipmentStatusTable(
{
    equipmentId
} : {
    equipmentId: number
}) {
    const data = await getEquipmentStatusData(equipmentId)
    // console.log(data)
    return (
        <EquipmentStatusDataTable columns={EquipmentStatusTableColumns} data={data} equipmentId={equipmentId} />
    )
}
