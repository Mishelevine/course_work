import { z } from "zod"
import { UserLogTableColumns } from "./columns"
import { UserLogSchema } from "@/schemas"
import axios from "axios"
import { API_URL } from "@/constants"
import { UserLogDataTable } from "./data-table"

type UserLogSchemaFromBack = {
    event_type: string,
    time: string,
    user_id: number,
    user_role: number
}

async function getUserLogData(): Promise<z.infer<typeof UserLogSchema>[]> {
    const userLogData = (await axios.get(API_URL + "/sessionlog/all")).data

    const newData = await Promise.all(userLogData.map(async (elem: UserLogSchemaFromBack) => {
        const fullName = (await axios.get(API_URL + `/auth/${elem.user_id}/fullname`)).data
        const roleName = (await axios.get(API_URL + `/role/${elem.user_role}`)).data.role_name

        const newElem = {
            user_name: fullName,
            event_type: elem.event_type,
            time: elem.time,
            user_role: roleName,
        }
        return newElem
    }))

    return newData
}

export default async function UserLogTable() {
    const data = await getUserLogData()

    return (
        <UserLogDataTable columns={UserLogTableColumns} data={data} />
    )
}
