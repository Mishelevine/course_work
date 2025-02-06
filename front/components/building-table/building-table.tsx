"use client"

import { BuildingDataTable } from "./data-table"
import { BuildingSchema } from "@/schemas"
import { BuildingTableColumns } from "./columns"

import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "@/constants"
import { z } from "zod"

export default function BuildingTable() {
  const [data, setData] = useState<z.infer<typeof BuildingSchema>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/buildings/all`)
        setData(response.data)
      } catch (error) {
        console.error("Error loading addresses:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>Loading addresses...</div>
  }

  return <BuildingDataTable columns={BuildingTableColumns} data={data} />
}
