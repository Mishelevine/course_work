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

                // Получаем основные данные логов
                const logsResponse = await axios.get<UserLogSchemaFromBack[]>(`${API_URL}/sessionlog/all`)
                const basicLogsData = logsResponse.data

                // Параллельно запрашиваем дополнительные данные для каждой записи
                const enrichedData = await Promise.all(
                    basicLogsData.map(async (log) => {
                        try {
                            const [nameResponse, roleResponse] = await Promise.all([
                                axios.get<string>(`${API_URL}/auth/${log.user_id}/fullname`),
                                axios.get<{ role_name: string }>(`${API_URL}/role/${log.user_role}`)
                            ])

                            return {
                                user_name: nameResponse.data,
                                event_type: log.event_type,
                                time: log.time,
                                user_role: roleResponse.data.role_name,
                            }
                        } catch (e) {
                            console.error(`Error enriching log entry ${log.user_id}:`, e)
                            return {
                                user_name: "N/A",
                                event_type: log.event_type,
                                time: log.time,
                                user_role: "N/A",
                            }
                        }
                    })
                )

                setData(enrichedData)
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
