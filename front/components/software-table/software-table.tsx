"use client"

import { SoftwareDataTable } from "./data-table"
import { SoftwareTableColumns } from "./columns"
import { useEffect, useState } from "react"
import { SoftwareTableSchema } from "@/schemas"
import axios from "axios"
import { API_URL } from "@/constants"
import { z } from "zod"

export default function SoftwareTable() {
  const [data, setData] = useState<z.infer<typeof SoftwareTableSchema>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/software/all`)
        const processedData = await Promise.all(
          response.data.map(async (item: any) => ({
            ...item,
            license_type: (await axios.get(`${API_URL}/license/${item.license_id}`)).data.license_type
          }))
        )
        setData(processedData)
      } catch (error) {
        console.error("Error loading software data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>Loading software data...</div>
  }

  return <SoftwareDataTable columns={SoftwareTableColumns} data={data} />
}
