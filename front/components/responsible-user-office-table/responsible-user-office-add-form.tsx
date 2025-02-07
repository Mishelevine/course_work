"use client"

import { ResponsibleUserOfficeFormSchema } from '@/schemas';

import React, { useState } from 'react'
import * as z from "zod"
import axios from "axios";
import { API_URL } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { textFields } from './fields';
import CRUDFormForTables from '../crud-form-for-tables';

const ResponsibleUserOfficeAddForm = () => {
  const [error, setError] = useState<string | undefined>("");

  const { toast } = useToast()

  const form = useForm<z.infer<typeof ResponsibleUserOfficeFormSchema>>({
    resolver: zodResolver(ResponsibleUserOfficeFormSchema),
    defaultValues: {
      office_name: ""
    }
  });

  function AddRowResponsibleUserOfficeTable(data: z.infer<typeof ResponsibleUserOfficeFormSchema>) {
    setError("")
    axios.post(API_URL + '/responsible_users/office/create', data)
    .then(() => {
      console.log("Added row", data)
      toast({
        title: "Подразделение добавлено",
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
    <CRUDFormForTables
      buttonText="Создать"
      form={form}
      id="addResponsibleUserOfficeForm"
      onSubmit={AddRowResponsibleUserOfficeTable}
      error={error}
      textFields={textFields}
    />
  )
}

export default ResponsibleUserOfficeAddForm
