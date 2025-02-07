"use client"

import { UserOfficeDataTable } from "./data-table"
import { UserOfficeSchema } from "@/schemas"
import { UserOfficeTableColumns } from "./columns"

import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "@/constants"
import { z } from "zod"

export default function UserOfficeTable() {
  const [data, setData] = useState<z.infer<typeof UserOfficeSchema>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/office/all`)
        setData(response.data)
      } catch (error) {
        console.error("Error loading offices:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>Loading offices...</div>
  }

  return <UserOfficeDataTable columns={UserOfficeTableColumns} data={data} />
}
