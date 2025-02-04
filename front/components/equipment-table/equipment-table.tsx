'use client'

import { z } from "zod"
import { EquipmentTableColumns } from "./columns"
import { EquipmentSchema } from "@/schemas"
import axios from "axios"
import { API_URL } from "@/constants"
import { EquipmentDataTable } from "./data-table"
import { useEffect, useState } from "react"

export default function EquipmentTable({
    forStatus,
    equipmentId
}: {
    forStatus: boolean,
    equipmentId?: number
}) {
    const [data, setData] = useState<z.infer<typeof EquipmentSchema>[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                axios.defaults.withCredentials = true
                var response = []
                if (equipmentId) {
                    const equipment = (await axios.get(`${API_URL}/equipment/${equipmentId}`)).data
                    const type = (await axios.get(`${API_URL}/equipment_types/${equipment.type_id}`)).data.type_name
                    response = [{...equipment, type_name: type}]
                } else {
                    response = (await axios.get(`${API_URL}/equipment/all`)).data
                }

                setData(response)
            } catch (error) {
                console.error('Ошибка загрузки данных:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [equipmentId])

    if (loading) return <div>Loading...</div>

    return <EquipmentDataTable columns={EquipmentTableColumns} data={data} forStatus={forStatus} />
}
