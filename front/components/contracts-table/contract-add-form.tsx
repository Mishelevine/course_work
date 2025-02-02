"use client"

import React, { useState } from 'react'
import * as z from "zod"
import axios from "axios";
import { API_URL } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { ContractFormSchema } from '@/schemas';
import { Form } from '../ui/form';
import FormTextField from '../form-text-field';
import { Button } from '../ui/button';
import { DateToDbForm } from '../helper-functions';
import { FormError } from '../form-error';

export type ContractTextFieldName = "contract_number" | "contract_date"

const contractTextFields = [
  {
    name: "contract_number",
    label: "Номер договора",
    placeholder: "Номер добавляемого договора",
  },
  {
    name: "contract_date",
    label: "Дата договора",
    placeholder: "Дата в формате DD.MM.YYYY (Пример: 01.01.2020)",
  },
]

const ContractAddForm = () => {
  const [error, setError] = useState<string | undefined>("");

  const { toast } = useToast()

  const form = useForm<z.infer<typeof ContractFormSchema>>({
    resolver: zodResolver(ContractFormSchema),
    defaultValues: {
      contract_number: "",
      contract_date: ""
    }
  });

  function AddRowContractTable(data: z.infer<typeof ContractFormSchema>) {
    setError("")
    axios.post(API_URL + '/contract/create', {
      contract_number: data.contract_number,
      contract_date: DateToDbForm(data.contract_date)
    })
    .then(() => {
      console.log("Added row", data)
      toast({
        title: "Договор добавлен",
        description: "Данные записаны в БД",
        className: "bg-white"
      })
    })
    .catch((e) => {
      setError("Во время добавления записи произошла непредвиденная ошибка!")
      console.log("Unexpected error occured while adding row.")
      console.log(data)
      console.log(e)
    })
  }

  return (
    <Form {...form}>
      <form id="addContractForm"
        onSubmit={form.handleSubmit(AddRowContractTable)}
        className="space-y-6"
      >
        <div className="space-y-4">
          {contractTextFields.map((formItem, index) => {
            return <FormTextField
              key={index}
              control={form.control}
              name={formItem.name as ContractTextFieldName}
              label={formItem.label}
              placeholder={formItem.placeholder}
            />
          })}
        </div>
        <FormError message={error} />
        <Button type="submit" className="w-full bg-blue-3 hover:bg-blue-700">Создать</Button>
      </form>
    </Form>
  )
}

export default ContractAddForm
