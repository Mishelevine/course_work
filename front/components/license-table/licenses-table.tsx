"use client"

import { LicenseDataTable } from "./data-table"
import { useEffect, useState } from "react"
import { LicenseSchema } from "@/schemas"
import { LicensesTableColumns } from "./columns"
import axios from "axios"
import { API_URL } from "@/constants"
import { z } from "zod"

export default function LicensesTable() {
  const [data, setData] = useState<z.infer<typeof LicenseSchema>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/license/all`)
        setData(response.data)
      } catch (error) {
        console.error("Error loading licenses:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>Loading licenses...</div>
  }

  return <LicenseDataTable columns={LicensesTableColumns} data={data} />
}
