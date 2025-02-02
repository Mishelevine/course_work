"use client"

import React, { useState } from 'react'
import * as z from "zod"
import axios from "axios";
import { API_URL } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { ContractFormSchema } from '@/schemas';
import { DateToDbForm } from '../helper-functions';
import { textFields } from './fields';
import CRUDFormForTables from '../crud-form-for-tables';

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
    <CRUDFormForTables
      buttonText="Создать"
      form={form}
      id="addContractForm"
      onSubmit={AddRowContractTable}
      error={error}
      textFields={textFields}
    />
  )
}

export default ContractAddForm
