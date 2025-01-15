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
        // это потом, когда надо будет получать фио и роль из айдишника
        // const licenseType = (await axios.get(API_URL + `/license/${elem.license_id}`)).data.license_type
        // const contract = (await axios.get(API_URL + `/contract/${elem.contract_id}`)).data

        const newElem = {
            event_type: elem.event_type,
            time: elem.time,
            user_id: elem.user_id,
            user_role: elem.user_role,
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