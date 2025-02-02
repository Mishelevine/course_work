"use client"

import React, { useState } from 'react'
import * as z from "zod"
import axios from "axios";
import { API_URL } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { LicenseFormSchema } from '@/schemas';
import { Form } from '../ui/form';
import FormTextField from '../form-text-field';
import { Button } from '../ui/button';
import { FormError } from '../form-error';

export type LicenseTextFieldName = "license_type"

const licenseTextFields = [
  {
    name: "license_type",
    label: "Тип лицензии",
    placeholder: "Тип добавляемой лицензии",
  },
]

const LicenseAddForm = () => {
  const [error, setError] = useState<string | undefined>("");

  const { toast } = useToast()

  const form = useForm<z.infer<typeof LicenseFormSchema>>({
    resolver: zodResolver(LicenseFormSchema),
    defaultValues: {
      license_type: ""
    }
  });

  function AddRowLicenseTable(data: z.infer<typeof LicenseFormSchema>) {
    setError("")
    axios.post(API_URL + '/license/create', data)
    .then(() => {
      console.log("Added row", data)
      toast({
        title: "Лицензия добавлена",
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
      <form id="addLicenseForm"
        onSubmit={form.handleSubmit(AddRowLicenseTable)}
        className="space-y-6"
      >
        <div className="space-y-4">
          {licenseTextFields.map((formItem, index) => {
            return <FormTextField
              key={index}
              control={form.control}
              name={formItem.name as LicenseTextFieldName}
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

export default LicenseAddForm
