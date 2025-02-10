"use client"

import { z } from "zod"
import { ContractsTableColumns } from "./columns"
import { ContractSchema, ContractSchemaFromBack } from "@/schemas"
import axios from "axios"
import { API_URL } from "@/constants"
import { ContractsDataTable } from "./data-table"
import { useEffect, useState } from "react"

// export default function ContractsTable({
//     checkboxes,
//     actions,
//     data,
//     selected_contract_ids,
//     onSelectedRowsChange
// }: {
//     checkboxes: boolean,
//     actions: boolean,
//     data?: z.infer<typeof ContractSchema>[] | undefined
//     selected_contract_ids?: number[] | undefined
//     onSelectedRowsChange?: (selectedIds: number[]) => void
// }) {
//     const [isLoading, setIsLoading] = useState<boolean>(!data)
//     const [tableData, setTableData] = useState<z.infer<typeof ContractSchema>[]>(data || [])
//     const [error, setError] = useState<string | null>(null)

//     const fetchData = async (ids?: number[]) => {
//         try {
//             setIsLoading(true)
//             setError(null)

//             const response = await axios.get<z.infer<typeof ContractSchemaFromBack>[]>(`${API_URL}/contract/all`)
//             const processedData = response.data.map(elem => ({
//                 id: elem.id,
//                 contract_number: elem.contract_number,
//                 contract_date: elem.contract_date,
//                 selected: ids?.includes(elem.id) || false
//             }))

//             setTableData(processedData)
//         } catch (err) {
//             console.error("Error fetching contracts:", err)
//             setError("Failed to load contracts data")
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     useEffect(() => {
//         if (!data) {
//             fetchData(selected_contract_ids)
//         }
//     }, [selected_contract_ids])

//     if (isLoading) {
//         return <div className="p-4">Loading contracts...</div>
//     }

//     return (
//         <ContractsDataTable
//             columns={ContractsTableColumns}
//             data={tableData}
//             checkboxes={checkboxes}
//             actions={actions}
//             onSelectedRowsChange={onSelectedRowsChange}
//         />
//     )
// }

////////////////////////////////

async function getContractsData(selected_contract_ids?: number[] | undefined): Promise<z.infer<typeof ContractSchema>[]> {
    const contractsDataFull = (await axios.get(API_URL + `/contract/all`)).data;
    if (selected_contract_ids === undefined) {
        selected_contract_ids = []
    }

    const newData = await Promise.all(contractsDataFull.map(async (elem: z.infer<typeof ContractSchemaFromBack>) => {
        const newElem = {
            id: elem.id,
            contract_number: elem.contract_number,
            contract_date: elem.contract_date,
            selected: selected_contract_ids?.includes(elem.id)
        }
        return newElem
    }))
    return newData
}

export default function ContractsTable({
    checkboxes,
    actions,
    data,
    selected_contract_ids,
    onSelectedRowsChange
} : {
    checkboxes: boolean
    actions: boolean
    data?: z.infer<typeof ContractSchema>[] | undefined
    selected_contract_ids?: number[] | undefined
    onSelectedRowsChange?: (selectedIds: number[]) => void
}) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tableData, setTableData] = useState<z.infer<typeof ContractSchema>[] | undefined>(data)

    useEffect(() => {
        if (tableData === undefined) {
            setIsLoading(true);
            try {
                (async () => {
                    data = await getContractsData(selected_contract_ids)
                    setTableData(data)
                })()
                console.log(tableData)
                setIsLoading(false);
            }
            catch(e) {
                console.log(e)
                setIsLoading(false)
            }
        }
    }, [selected_contract_ids])

    if (isLoading || tableData === undefined){
        console.log("waiting")
        return <div>Loading...</div>
    }
    return (
        <ContractsDataTable
            columns={ContractsTableColumns}
            data={tableData} checkboxes={checkboxes}
            actions={actions}
            onSelectedRowsChange={onSelectedRowsChange}
        />
    )
}
