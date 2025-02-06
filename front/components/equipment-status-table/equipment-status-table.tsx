"use client"

import { z } from "zod"
import { EquipmentStatusTableColumns } from "./columns"
import { EquipmentStatusSchema, EquipmentStatusTableSchema, SingleResponsibleUserSchema } from "@/schemas"
import axios from "axios"
import { API_URL } from "@/constants"
import { EquipmentStatusDataTable } from "./data-table"
import { useEffect, useState } from "react"

export default function EquipmentStatusTable({
    equipmentId
}: {
    equipmentId: number
}) {
    const [data, setData] = useState<z.infer<typeof EquipmentStatusTableSchema>[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)

                const statuses_raw = (await axios.get(
                    `${API_URL}/equipment_status/by_equipment/${equipmentId}`
                )).data as z.infer<typeof EquipmentStatusSchema>[]

                const newData = await Promise.all(statuses_raw.map(async (status) => {
                    const status_type_name = (await axios.get(
                        `${API_URL}/equipment_status_type/${status.status_type_id}`
                    )).data.status_type_name

                    const responsible_user = (await axios.get(
                        `${API_URL}/responsible_users/${status.responsible_user_id}`
                    )).data as z.infer<typeof SingleResponsibleUserSchema>

                    const user_fio = [
                        responsible_user.last_name,
                        responsible_user.first_name,
                        responsible_user.paternity
                    ].filter(Boolean).join(" ")

                    const [user_job, user_office, building_address] = await Promise.all([
                        axios.get(`${API_URL}/responsible_users/job/${responsible_user.job_id}`),
                        axios.get(`${API_URL}/responsible_users/office/${responsible_user.office_id}`),
                        axios.get(`${API_URL}/buildings/${status.building_id}`)
                    ])

                    return {
                        status_type_name: status_type_name,
                        doc_number: status.doc_number,
                        status_change_date: status.status_change_date,
                        responsible_user_fio: user_fio,
                        responsible_user_job_name: user_job.data.job_name,
                        responsible_user_office_name: user_office.data.office_name,
                        building_address: building_address.data.building_address,
                        audience_id: status.audience_id,
                        id: status.id,
                        equipment_id: status.equipment_id
                    } as z.infer<typeof EquipmentStatusTableSchema>
                }))

                setData(newData)
            } catch (error) {
                console.error("Error loading equipment status data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [equipmentId])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <EquipmentStatusDataTable
            columns={EquipmentStatusTableColumns}
            data={data}
            equipmentId={equipmentId}
        />
    )
}
