"use client"

import * as z from "zod"
import axios from "axios";
import { API_URL } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react";
import { ContractSchema, SoftwareSchema } from "@/schemas";
import { useToast } from "@/hooks/use-toast"
import { DateFromDbForm, DateToDbForm } from "../helper-functions";
import ContractsTable from "../contracts-table/contracts-table";
import { textFields, comboboxFields } from './fields';
import CRUDFormForTables from '../crud-form-for-tables';

export const SoftwareUpdateForm = ({ id }: { id: number }) => {
  const [error, setError] = useState<string | undefined>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedContractIds, setSelectedContractIds] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const { toast } = useToast()

  const handleSelectedRowsChange = (selectedIds: number[]) => {
    setSelectedContractIds(selectedIds);
  };

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = (await axios.get(API_URL + `/license/all`)).data
        comboboxFields[0].data = response
        try {
          const response = await axios.get(API_URL + `/software/${id}`)
          const normalDate = DateFromDbForm(response.data.version_date)
          response.data.version_date = normalDate
          form.reset(response.data)
          setSelectedContractIds(response.data.contracts.map((contract: z.infer<typeof ContractSchema>) => contract.id))
          setLoading(false)
        } catch (e) {
          console.log("Ошибка загрузки данных")
          console.log(e)
        }
      }
      catch(e) {
        console.log("Ошибка при получении данных о лицензиях")
        console.log(e)
      }
    }

    fetchData()
  }, [id])

  const form = useForm<z.infer<typeof SoftwareSchema>>({
    resolver: zodResolver(SoftwareSchema),
    defaultValues: {
      name: '',
      short_name: '',
      program_link: '',
      version: '',
      version_date: '',
      license_id: 0,
      contracts: []
    }
  })

  const UpdateRowSoftwareTable = (data: z.infer<typeof SoftwareSchema>) => {
    setError("")
    setIsProcessing(true)
    axios.put(API_URL + `/software/${id}/update`, {
      name: data.name,
      short_name: data.short_name,
      program_link: data.program_link,
      version: data.version,
      version_date: DateToDbForm(data.version_date),
      license_id: data.license_id,
      contract_ids: selectedContractIds
    }, {
      params: {
        software_id: id
      }
    })
    .then(() => {
      localStorage.setItem("last_tab", "software")
      window.location.reload()
      toast({
        title: "Запись обновлена",
        description: "Данные записаны в БД",
        className: "bg-white"
      })
    })
    .catch((e) => {
      setError("Произошла непредвиденная ошибка при обновлении записи!")
      console.log("Error while updating row!")
      console.log(e)
      setIsProcessing(false)
    })
  }

  return (
    <CRUDFormForTables
      buttonText="Изменить"
      form={form}
      id="updateSoftwareForm"
      onSubmit={UpdateRowSoftwareTable}
      error={error}
      isProcessing={isProcessing}
      loading={loading}
      textFields={textFields}
      comboboxFields={comboboxFields}
    >
      <FormField
        control={form.control}
        name="contracts"
        render={() => (
            <FormItem>
                <FormLabel>
                  Договоры
                </FormLabel>
                <FormControl>
                  <section
                      className='flex flex-col gap-5 bg-light-3 p-1
                      rounded-[10px] border border-gray-300'
                  >
                    <ContractsTable
                      checkboxes={true}
                      actions={false}
                      selected_contract_ids={selectedContractIds}
                      onSelectedRowsChange={handleSelectedRowsChange}
                    />
                  </section>
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
      />
    </CRUDFormForTables>


  )
}
