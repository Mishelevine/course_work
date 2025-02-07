"use client"

import { z } from "zod"
import { UserLogTableColumns } from "./columns"
import { UserLogSchema } from "@/schemas"
import axios from "axios"
import { API_URL } from "@/constants"
import { UserLogDataTable } from "./data-table"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

type UserLogSchemaFromBack = {
    event_type: string,
    time: string,
    user_id: number,
    user_role: number
}

export default function UserLogTable() {
    const [data, setData] = useState<z.infer<typeof UserLogSchema>[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                setError(null)
                const logs = (await axios.get(API_URL + "/sessionlog/all")).data // FIXME: жду мишу и надо редачить
                setData(logs)
            } catch (e) {
                console.error("Error fetching logs:", e)
                setError("Не удалось загрузить данные журнала")
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-[40px] w-full" />
                <Skeleton className="h-[400px] w-full" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-red-500 p-4 border rounded bg-red-50">
                {error}
            </div>
        )
    }

    return <UserLogDataTable columns={UserLogTableColumns} data={data} />
}
