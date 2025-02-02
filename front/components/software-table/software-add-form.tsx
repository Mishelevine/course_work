"use client"

import * as z from "zod"
import axios from "axios";
import { API_URL } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react";
import { SoftwareSchema } from "@/schemas";

import { DateToDbForm } from "../helper-functions";
import ContractsTable from "../contracts-table/contracts-table";
import { useToast } from "@/hooks/use-toast";
import { textFields, comboboxFields } from './fields';
import CRUDFormForTables from '../crud-form-for-tables';

export const SoftwareAddForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedContractIds, setSelectedContractIds] = useState<number[]>([]);

  const { toast } = useToast()

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = (await axios.get(API_URL + `/license/all`)).data
        comboboxFields[0].data = response
        setLoading(false)
      }
      catch(e) {
        console.log("Ошибка при получении данных о лицензиях")
        console.log(e)
      }
    }

    fetchData()
  }, [])

  const handleSelectedRowsChange = (selectedIds: number[]) => {
    setSelectedContractIds(selectedIds);
  };

  const form = useForm<z.infer<typeof SoftwareSchema>>({
    resolver: zodResolver(SoftwareSchema),
    defaultValues: {
      name: "",
      short_name: "",
      program_link: "",
      version: "",
      version_date: "",
      license_id: 0,
      contracts: []
    }
  });

  function AddRowSoftwareTable(data: z.infer<typeof SoftwareSchema>) {
    setError("")
    if (selectedContractIds.length === 0) {
      setError("Выберите хотя бы один договор")
    }
    else {
      axios.post(API_URL + '/software/create', {
        name: data.name,
        short_name: data.short_name,
        program_link: data.program_link,
        version: data.version,
        version_date: DateToDbForm(data.version_date),
        license_id: data.license_id,
        contract_ids: selectedContractIds,
      })
      .then(() => {
        console.log("Added row", data)
        toast({
          title: "Запись добавлена",
          description: "Данные записаны в БД",
          className: "bg-white"
        })
      })
      .catch((e) => {
        setError("Во время добавления записи произошла непредвиденная ошибка!")
        console.log("Unexpected error occured while adding row.")
        console.log({
            name: data.name,
            short_name: data.short_name,
            program_link: data.program_link,
            version: data.version,
            version_date: DateToDbForm(data.version_date),
            license_id: data.license_id,
            contract_ids: selectedContractIds,
        })
        console.log(e)
      })
    }
  }

  return (
    <CRUDFormForTables
      buttonText="Создать"
      form={form}
      id="addSoftwareForm"
      onSubmit={AddRowSoftwareTable}
      error={error}
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
