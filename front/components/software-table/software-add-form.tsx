"use client"

import * as z from "zod"
import axios from "axios";
import { API_URL } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "../ui/button";
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react";
import { FormError } from "../form-error";
import { LicenseSchema, SoftwareSchema } from "@/schemas";

import SoftwareTextField from "./software-text-field";
import SoftwareComboboxField from "./software-combobox-field";
import { DateToDbForm } from "../helper-functions";
import ContractsTable from "../contracts_table/contracts-table";
import { useToast } from "@/hooks/use-toast";

export type SoftwareTextFieldName = "name" | "short_name" | "program_link" | "version" | "version_date";
export type SoftwareComboboxFieldName = "license_id"

const softwareTextFields = [
  {
    name: "name",
    label: "Наименование ПО",
    placeholder: "Название добавляемого ПО",
  },
  {
    name: "short_name",
    label: "Сокращенное наименование ПО",
    placeholder: "Сокращенное название добавляемого ПО",
  },
  {
    name: "program_link",
    label: "Ссылка на программу",
    placeholder: "Ссылка на сайт добавляемого ПО",
  },
  {
    name: "version",
    label: "Версия ПО",
    placeholder: "Версия добавляемого ПО",
  },
  {
    name: "version_date",
    label: "Дата версии",
    placeholder: "Дата в формате DD.MM.YYYY (Пример: 01.01.2020)",
  }
]

const softwareComboboxFields = [
  {
    name: "license_id",
    label: "Тип лицензии",
    frontText: "Выберите тип лицензии",
    inputPlaceholder: "Введите название...",
    emptyText: "Лицензий не найдено."
  }
]

export const SoftwareAddForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedContractIds, setSelectedContractIds] = useState<number[]>([]);
  const [licensesData, setLicenseData] = useState<z.infer<typeof LicenseSchema>[]>([])

  const { toast } = useToast()

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = (await axios.get(API_URL + `/license/all`)).data as z.infer<typeof LicenseSchema>[]
        setLicenseData(response)
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

  if (loading) {
    return <div>Загрузка...</div>
  }

  return (
    <Form {...form}>
      <form id="addSoftwareForm"
        onSubmit={form.handleSubmit(AddRowSoftwareTable)}
        className="space-y-6"
      >
        <div className="space-y-4">
          {softwareTextFields.map((formItem, index) => {
            return <SoftwareTextField
              key={index}
              control={form.control}
              name={formItem.name as SoftwareTextFieldName}
              label={formItem.label}
              placeholder={formItem.placeholder}
            />
          })}
          {softwareComboboxFields.map((formItem, index) => {
            return <SoftwareComboboxField
              key={index}
              form={form}
              name={formItem.name as SoftwareComboboxFieldName}
              label={formItem.label}
              data={licensesData}
              frontText={formItem.frontText}
              inputPlaceholder={formItem.inputPlaceholder}
              emptyText={formItem.emptyText}
            />
          })}

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
        </div>
        <FormError message={error} />
        <Button type="submit" className="w-full bg-blue-3 hover:bg-blue-700">Создать</Button>
      </form>
    </Form>
  )
}
