"use client"

import * as z from "zod"
import axios from "axios";
import { API_URL } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from "../ui/button";
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { FormError } from "../form-error";
import { SoftwareSchema } from "@/schemas";
import SoftwareTextField from "./software-text-field";
import SoftwareComboboxField from "./software-combobox-field";
import { SoftwareComboboxFieldName, SoftwareTextFieldName } from "./add-software-form";
import { DatetimeToDbForm } from "../helper-functions";

const tempLicenseData = [
  {
    label: "Freeware",
    value: 1
  },
  {
    label: "Shareware",
    value: 2
  }
]

const tempContractData = [
  {
    label: "6027-914 от 11.10.2020",
    value: 2
  },
  {
    label: "string от 13.01.2025",
    value: 3
  },
]

const softwareTextFields = [
  {
    name: "name",
    label: "Наименование ПО",
    placeholder: "Название добавляемого ПО"
  },
  {
    name: "short_name",
    label: "Сокращенное наименование ПО",
    placeholder: "Сокращенное название добавляемого ПО"
  },
  {
    name: "program_link",
    label: "Ссылка на программу",
    placeholder: "Ссылка на сайт добавляемого ПО"
  },
  {
    name: "version",
    label: "Версия ПО",
    placeholder: "Версия добавляемого ПО"
  },
  {
    name: "version_date",
    label: "Дата версии",
    placeholder: "Дата в формате DD.MM.YYYY (Пример: 01.01.2020)"
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

export const SoftwareUpdateForm = ({ id }: { id: number }) => {
  const [error, setError] = useState<string | undefined>("")
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL + `/software/${id}`)
        const tempDate = response.data.version_date.substr(0, 10).split('-')
        const normalDate = tempDate[2] + '.' + tempDate[1] + '.' + tempDate[0]
        response.data.version_date = normalDate
        form.reset(response.data)
        setLoading(false)
      } catch (err) {
        setError("Ошибка загрузки данных")
        setLoading(false)
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
      contract_id: 0
    }
  })

  const UpdateRowSoftwareTable = (data: z.infer<typeof SoftwareSchema>) => {
    axios.put(API_URL + `/software/${id}/update`, {
      name: data.name,
      short_name: data.short_name,
      program_link: data.program_link,
      version: data.version,
      version_date: DatetimeToDbForm(data.version_date),
      license_id: data.license_id,
      contract_id: data.contract_id
    }, {
      params: {
        software_id: id
      }
    })
      .then(() => {
        console.log("Updated!", data)
      })
      .catch((e) => {
        console.log("Error while updating row!")
        console.log(e)
      })
  }

  if (loading) {
    return <div>Загрузка...</div>
  }

  return (
    <Form {...form}>
      <form id="updateSoftwareForm" onSubmit={form.handleSubmit(UpdateRowSoftwareTable)} className="space-y-6">
        <div className="space-y-4">
          {softwareTextFields.map((formItem, index) => (
            <SoftwareTextField
              key={index}
              control={form.control}
              name={formItem.name as SoftwareTextFieldName}
              label={formItem.label}
              placeholder={formItem.placeholder}
            />
          ))}
          {softwareComboboxFields.map((formItem, index) => (
            <SoftwareComboboxField
              key={index}
              form={form}
              name={formItem.name as SoftwareComboboxFieldName}
              label={formItem.label}
              data={formItem.data}
              frontText={formItem.frontText}
              inputPlaceholder={formItem.inputPlaceholder}
              emptyText={formItem.emptyText}
            />
          ))}
        </div>
        <FormError message={error} />
        <Button type="submit" className="w-full bg-blue-3 hover:bg-blue-700">Изменить</Button>
      </form>
    </Form>
  )
}
