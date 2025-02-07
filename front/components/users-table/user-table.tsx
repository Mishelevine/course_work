"use client"

import { UserDataTable } from "./data-table";
import { UserTableColumns } from "./columns"
import { useEffect, useState } from "react"
import { UserSchemaForTable } from "@/schemas"
import axios from "axios"
import { API_URL } from "@/constants"
import { z } from "zod"

export default function UserTable() {
  const [data, setData] = useState<z.infer<typeof UserSchemaForTable>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/all`)
        setData(response.data)
      } catch (error) {
        console.error("Error loading users data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>Loading users data...</div>
  }

  return <UserDataTable columns={UserTableColumns} data={data} />
}
