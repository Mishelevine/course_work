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
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

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
    setIsProcessing(true)
    axios.post(API_URL + '/contract/create', {
      contract_number: data.contract_number,
      contract_date: DateToDbForm(data.contract_date)
    })
    .then(() => {
      console.log("Added row", data)
      // TODO: придумать как сделать так чтобы оставаться на той же вкладке на которой был до релоада
      window.location.reload()
      toast({
        title: "Договор добавлен",
        description: "Данные записаны в БД",
        className: "bg-white"
      })
    })
    .catch((e) => {
      if (e.response.data.detail == "Contract number already exists"){
        setError("Договор с таким номером уже существует")
      } else {
        setError("Во время добавления записи произошла непредвиденная ошибка")
        console.log("Unexpected error occured while adding row.")
        console.log({
          contract_number: data.contract_number,
          contract_date: DateToDbForm(data.contract_date)
        })
        console.log(e)
      }
      setIsProcessing(false)
    })
  }

  return (
    <CRUDFormForTables
      buttonText="Создать"
      form={form}
      id="addContractForm"
      onSubmit={AddRowContractTable}
      error={error}
      isProcessing={isProcessing}
      textFields={textFields}
    />
  )
}

export default ContractAddForm
