import { z } from "zod"
import { UserLogTableColumns } from "./columns"
import { UserLogSchema } from "@/schemas"
import axios from "axios"
import { API_URL } from "@/constants"
import { UserLogDataTable } from "./data-table"
import { DatetimeFromDbForm } from "../helper-functions"

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
            time: DatetimeFromDbForm(elem.time),
            user_role: roleName,
        }
        return newElem
    }))

    return newData
}

export default async function UserLogTable() {
    const data = await getUserLogData()

    return (
        <section
            className='flex flex-col gap-5 bg-light-3 p-6
            rounded-[14px] border border-gray-300 shadow'
        >
            <UserLogDataTable columns={UserLogTableColumns} data={data} />
        </section>
    )
}