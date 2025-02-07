"use client"

import { ResponsibleUserDataTable } from "./data-table"
import { ResponsibleUserSchema } from "@/schemas"
import { ResponsibleUserTableColumns } from "./columns"

import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "@/constants"
import { z } from "zod"


export default function ResponsibleUserTable() {
  const [data, setData] = useState<z.infer<typeof ResponsibleUserSchema>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/responsible_users/all`)
        setData(response.data)
      } catch (error) {
        console.error("Error loading responsible users:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>Loading responsible users...</div>
  }

  return <ResponsibleUserDataTable columns={ResponsibleUserTableColumns} data={data} />
}
