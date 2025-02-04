"use client"

import { z } from "zod"
import { EquipmentSpecsTableColumns } from "./columns"
import { EquipmentSpecsSchema } from "@/schemas"
import axios from "axios"
import { API_URL } from "@/constants"
import { EquipmentSpecsDataTable } from "./data-table"
import { useEffect, useState } from "react"

export default function EquipmentSpecsTable({
    equipmentId
}: {
    equipmentId: number
}) {
    const [data, setData] = useState<z.infer<typeof EquipmentSpecsSchema>[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await axios.get(
                    `${API_URL}/equipment_specs/by_equipment/${equipmentId}`
                )
                setData(response.data)
            } catch (error) {
                console.error("Error loading equipment specs:", error)
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
        <EquipmentSpecsDataTable
            columns={EquipmentSpecsTableColumns}
            data={data}
            equipmentId={equipmentId}
        />
    )
}
