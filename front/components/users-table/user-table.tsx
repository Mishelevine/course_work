"use client"

import { UserDataTable } from "./data-table";
import { UserTableColumns } from "./columns"
import { useEffect, useState } from "react"
import { UserSchemaForTable } from "@/schemas"
import axios from "axios"
import { API_URL } from "@/constants"
import { z } from "zod"

const tempData = [
  {
    full_name: "Огаркова Екатерина Андреевна",
    username: "KateHSE",
    job_name: "Студентка",
    office_name: "НИУ ВШЭ - Пермь",
    role_name: "2",
    id: 1
  },
  {
    full_name: "Огаркова Екатерина Андреевна",
    username: "KateHSE",
    job_name: "Студентка",
    office_name: "peppa pig",
    role_name: "2",
    id: 1
  },
  {
    full_name: "Васильев Вадим Дмитриевич",
    username: "VadimCharmingConcerts",
    job_name: "Клоун",
    office_name: "НИУ ВШЭ - Пермь",
    role_name: "1",
    id: 2
  },
  {
    full_name: "Талан Кирилл Антонович",
    username: "mgzephyrr",
    job_name: "ГИГАЧАД",
    office_name: "Бенто Суши Роллы",
    role_name: "5",
    id: 4
  },
] as z.infer<typeof UserSchemaForTable>[]

export default function UserTable() {
  const [data, setData] = useState<z.infer<typeof UserSchemaForTable>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/userusers/all`)
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
