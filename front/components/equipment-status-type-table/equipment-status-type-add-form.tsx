"use client"

import { EquipmentStatusTypeFormSchema } from '@/schemas';

import React, { useState } from 'react'
import * as z from "zod"
import axios from "axios";
import { API_URL } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { textFields } from './fields';
import CRUDFormForTables from '../crud-form-for-tables';

const EquipmentStatusTypeAddForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const { toast } = useToast()

  const form = useForm<z.infer<typeof EquipmentStatusTypeFormSchema>>({
    resolver: zodResolver(EquipmentStatusTypeFormSchema),
    defaultValues: {
      status_type_name: "",
      status_type_color: ""
    }
  });

  function AddRowEquipmentStatusTypeTable(data: z.infer<typeof EquipmentStatusTypeFormSchema>) {
    setError("")
    setIsProcessing(true)
    axios.post(API_URL + '/equipment_status_type/create', data)
    .then(() => {
      // TODO: придумать как сделать так чтобы оставаться на той же вкладке на которой был до релоада
      window.location.reload()
      toast({
        title: "Статус добавлен",
        description: "Данные записаны в БД",
        className: "bg-white"
      })
    })
    .catch((e) => {
      setError("Во время добавления записи произошла непредвиденная ошибка!")
      console.log("Unexpected error occured while adding row.")
      console.log(e)
      setIsProcessing(false)
    })
  }

  return (
    <CRUDFormForTables
      buttonText="Создать"
      form={form}
      id="addEquipmentStatusTypeForm"
      onSubmit={AddRowEquipmentStatusTypeTable}
      error={error}
      isProcessing={isProcessing}
      textFields={textFields}
    />
  )
}

export default EquipmentStatusTypeAddForm
