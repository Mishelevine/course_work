"use client"

import { UserJobFormSchema } from '@/schemas';

import React, { useState } from 'react'
import * as z from "zod"
import axios from "axios";
import { API_URL } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { textFields } from './fields';
import CRUDFormForTables from '../crud-form-for-tables';

const UserJobAddForm = () => {
  const [error, setError] = useState<string | undefined>("");

  const { toast } = useToast()

  const form = useForm<z.infer<typeof UserJobFormSchema>>({
    resolver: zodResolver(UserJobFormSchema),
    defaultValues: {
      job_name: ""
    }
  });

  function AddRowUserJobTable(data: z.infer<typeof UserJobFormSchema>) {
    setError("")
    axios.post(API_URL + '/job/create', data)
    .then(() => {
      console.log("Added row", data)
      toast({
        title: "Должность добавлена",
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
      id="addUserJobForm"
      onSubmit={AddRowUserJobTable}
      error={error}
      textFields={textFields}
    />
  )
}

export default UserJobAddForm
