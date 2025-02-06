"use client"

import { ResponsibleUserOfficeDataTable } from "./data-table"
import { ResponsibleUserOfficeSchema } from "@/schemas"
import { ResponsibleUserOfficeTableColumns } from "./columns"

import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "@/constants"
import { z } from "zod"

export default function ResponsibleUserOfficeTable() {
  const [data, setData] = useState<z.infer<typeof ResponsibleUserOfficeSchema>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/responsible_users/office/all`)
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

  return <ResponsibleUserOfficeDataTable columns={ResponsibleUserOfficeTableColumns} data={data} /> // TODO: поменять на данные с бэка как появится ручка
}
