"use client"

import { EquipmentTypeDataTable } from "./data-table"
import { EquipmentTypeSchema } from "@/schemas"
import { EquipmentTypeTableColumns } from "./columns"

import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "@/constants"
import { z } from "zod"

export default function EquipmentTypeTable() {
  const [data, setData] = useState<z.infer<typeof EquipmentTypeSchema>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/equipment_types/all`)
        setData(response.data)
      } catch (error) {
        console.error("Error loading equipment types:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>Loading equipment types...</div>
  }

  return <EquipmentTypeDataTable columns={EquipmentTypeTableColumns} data={data} />
}
