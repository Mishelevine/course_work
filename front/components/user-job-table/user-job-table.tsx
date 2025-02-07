"use client"

import { UserJobDataTable } from "./data-table"
import { UserJobSchema } from "@/schemas"
import { UserJobTableColumns } from "./columns"

import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "@/constants"
import { z } from "zod"

export default function UserJobTable() {
  const [data, setData] = useState<z.infer<typeof UserJobSchema>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/job/all`)
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

  return <UserJobDataTable columns={UserJobTableColumns} data={data} />
}
