"use client"

import * as z from "zod"
import axios from "axios";
import { API_URL } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod"

import { Form } from "@/components/ui/form"
import { Button } from "../ui/button";
import { useForm } from "react-hook-form"
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { FormError } from "../form-error";
import { SoftwareSchema } from "@/schemas";

import SoftwareTextField from "./software-text-field";
import SoftwareComboboxField from "./software-combobox-field";

export type SoftwareTextFieldName = "name" | "short_name" | "program_link" | "version" | "version_date";
export type SoftwareComboboxFieldName = "license_id" | "contract_id"

const tempLicenseData = [
  { label: "Freeware", value: 1 },
  { label: "Shareware", value: 2 }
]

const tempContractData = [
  { label: "6027-914 от 11.10.2020", value: 2 },
  { label: "string от 13.01.2025", value: 3 },
]

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
    data: tempLicenseData,
    frontText: "Выберите тип лицензии",
    inputPlaceholder: "Введите название...",
    emptyText: "Лицензий не найдено."
  },
  {
    name: "contract_id",
    label: "Номер договора",
    data: tempContractData,
    frontText: "Выберите договор",
    inputPlaceholder: "Введите название или дату...",
    emptyText: "Договоров не найдено."
  }
]

export const SoftwareAddForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const router = useRouter();

  const form = useForm<z.infer<typeof SoftwareSchema>>({
    resolver: zodResolver(SoftwareSchema),
    defaultValues: {
      name: "",
      short_name: "",
      program_link: "",
      version: "",
      version_date: "",
      license_id: 0,
      contract_id: 0
    }
  })

  function AddRowSoftwareTable(data: z.infer<typeof SoftwareSchema>) {
    setError("")
    const dateParts = data.version_date.split('.')
    axios.post(API_URL + '/software/create', null, {
      params: {
        name: data.name,
        short_name: data.short_name,
        program_link: data.program_link,
        version: data.version,
        version_date: new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`),
        license_id: data.license_id,
        contract_id: data.contract_id
      }
    })
    .then(() => {
      console.log("Added row", data)
    })
    .catch((e) => {
      setError("Во время добавления записи произошла непредвиденная ошибка.")
      console.log("Unexpected error occured while adding row.")
      console.log(e)
    })
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
              data={formItem.data}
              frontText={formItem.frontText}
              inputPlaceholder={formItem.inputPlaceholder}
              emptyText={formItem.emptyText}
            />
          })}
        </div>
        <FormError message={error}/>
        <Button type="submit" className="w-full bg-blue-3 hover:bg-blue-700">Создать</Button>
      </form>
    </Form>
  )
}
