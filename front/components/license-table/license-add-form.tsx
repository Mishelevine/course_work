"use client"

import React, { useState } from 'react'
import * as z from "zod"
import axios from "axios";
import { API_URL } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { LicenseFormSchema } from '@/schemas';
import { textFields } from './fields';
import CRUDFormForTables from '../crud-form-for-tables';

const LicenseAddForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const { toast } = useToast()

  const form = useForm<z.infer<typeof LicenseFormSchema>>({
    resolver: zodResolver(LicenseFormSchema),
    defaultValues: {
      license_type: ""
    }
  });

  function AddRowLicenseTable(data: z.infer<typeof LicenseFormSchema>) {
    setError("")
    setIsProcessing(true)
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
      if (e.response.data.detail == "License already exists") {
        setError("Такая лицензия уже существует")
      } else {
        setError("Во время добавления записи произошла непредвиденная ошибка!")
        console.log("Unexpected error occured while adding row.")
        console.log(data)
        console.log(e)
      }
      setIsProcessing(false)
    })
  }

  return (
    <CRUDFormForTables
      buttonText="Создать"
      form={form}
      id="addLicenseForm"
      onSubmit={AddRowLicenseTable}
      error={error}
      isProcessing={isProcessing}
      textFields={textFields}
    />
  )
}

export default LicenseAddForm
