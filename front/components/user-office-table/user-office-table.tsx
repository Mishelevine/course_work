"use client"

import { UserOfficeDataTable } from "./data-table"
import { UserOfficeSchema } from "@/schemas"
import { UserOfficeTableColumns } from "./columns"

import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "@/constants"
import { z } from "zod"

const tempData = [
    {
        office_name: "НИУ ВШЭ - Пермь",
        id: 1
    },
    {
        office_name: "Бебра",
        id: 2
    },
    {
        office_name: "это че такое",
        id: 3
    },
]

export default function UserOfficeTable() {
  const [data, setData] = useState<z.infer<typeof UserOfficeSchema>[]>([])
  const [loading, setLoading] = useState(false) // TODO: когда почявится ручка сделать тут true

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/office/all`)
//         setData(response.data)
//       } catch (error) {
//         console.error("Error loading offices:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [])

  if (loading) {
    return <div>Loading offices...</div>
  }

  return <UserOfficeDataTable columns={UserOfficeTableColumns} data={tempData} /> // TODO: поменять на данные с бэка как появится ручка
}
