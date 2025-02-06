"use client"

import { EquipmentStatusTypeDataTable } from "./data-table"
import { EquipmentStatusTypeSchema } from "@/schemas"
import { EquipmentStatusTypeTableColumns } from "./columns"

import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "@/constants"
import { z } from "zod"

export default function EquipmentStatusTypeTable() {
  const [data, setData] = useState<z.infer<typeof EquipmentStatusTypeSchema>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/equipment_status_type/all`)
        setData(response.data)
      } catch (error) {
        console.error("Error loading statuses:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>Loading statuses...</div>
  }

  return <EquipmentStatusTypeDataTable columns={EquipmentStatusTypeTableColumns} data={data} />
}
