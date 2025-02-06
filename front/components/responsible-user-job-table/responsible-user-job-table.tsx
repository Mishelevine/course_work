"use client"

import { ResponsibleUserJobDataTable } from "./data-table"
import { ResponsibleUserJobSchema } from "@/schemas"
import { ResponsibleUserJobTableColumns } from "./columns"

import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "@/constants"
import { z } from "zod"

export default function ResponsibleUserJobTable() {
  const [data, setData] = useState<z.infer<typeof ResponsibleUserJobSchema>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/responsible_users/job/all`)
        setData(response.data)
      } catch (error) {
        console.error("Error loading jobs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>Loading jobs...</div>
  }

  return <ResponsibleUserJobDataTable columns={ResponsibleUserJobTableColumns} data={data} />
}
