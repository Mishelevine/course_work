"use client"

import { UserJobDataTable } from "./data-table"
import { UserJobSchema } from "@/schemas"
import { UserJobTableColumns } from "./columns"

import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "@/constants"
import { z } from "zod"

const tempData = [
    {
        job_name: "Студентка",
        id: 1
    },
    {
        job_name: "Клоун",
        id: 2
    },
    {
        job_name: "ГИГАЧАД",
        id: 3
    },
]

export default function UserJobTable() {
  const [data, setData] = useState<z.infer<typeof UserJobSchema>[]>([])
  const [loading, setLoading] = useState(false) // TODO: когда почявится ручка сделать тут true

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/license/all`)
//         setData(response.data)
//       } catch (error) {
//         console.error("Error loading jobs:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [])

  if (loading) {
    return <div>Loading jobs...</div>
  }

  return <UserJobDataTable columns={UserJobTableColumns} data={tempData} /> // TODO: поменять на данные с бэка как появится ручка
}
