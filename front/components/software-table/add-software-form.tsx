"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form"
import { SoftwareAddSchema } from "@/schemas";
import { Form } from "@/components/ui/form"
import SoftwareTextField from "./software-text-field";
import { Button } from "../ui/button";
import { AddRowSoftwareTable } from "./crud";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import SoftwareComboboxField from "./software-combobox-field";

export type SoftwareTextFieldName = "name" | "short_name" | "program_link" | "version" | "version_date";
export type SoftwareComboboxFieldName = "license_id" | "contract_id"

const tempLicenseData = [
  { label: "Freeware", value: 1 },
  { label: "Shareware", value: 2 }
]

const tempContractData = [
  { label: "8.2.6.4-1003/12 30.03.2023", value: 1 },
  { label: "6027-914 от 11.10.2020", value: 2 },
  { label: "8.4.6.5-2002/4 от 19.03.2023", value: 3 },
  { label: "3416-316 от 11.11.2011", value: 4 }
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
    placeholder: "Дата выхода версии добавляемого ПО",
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

  const form = useForm<z.infer<typeof SoftwareAddSchema>>({
    resolver: zodResolver(SoftwareAddSchema),
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

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-blue-2 hover:bg-blue-800">Добавить запись</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-light-3 border-2 border-black shadow">
        <AlertDialogHeader className="flex items-center">
          <AlertDialogTitle>Добавить ПО</AlertDialogTitle>
          <AlertDialogDescription>{<>Заполните все поля и нажмите кнопку <b>Создать</b></>}</AlertDialogDescription>
        </AlertDialogHeader>
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
            <AlertDialogFooter>
              <AlertDialogCancel>Отмена</AlertDialogCancel>
              <AlertDialogAction type="submit">Создать</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
