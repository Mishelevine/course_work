"use client"

import { EquipmentTypeFormSchema } from '@/schemas';

import React, { useState } from 'react'
import * as z from "zod"
import axios from "axios";
import { API_URL } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { textFields } from './fields';
import CRUDFormForTables from '../crud-form-for-tables';

const EquipmentTypeAddForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const { toast } = useToast()

  const form = useForm<z.infer<typeof EquipmentTypeFormSchema>>({
    resolver: zodResolver(EquipmentTypeFormSchema),
    defaultValues: {
      type_name: ""
    }
  });

  function AddRowEquipmentTypeTable(data: z.infer<typeof EquipmentTypeFormSchema>) {
    setError("")
    setIsProcessing(true)
    axios.post(API_URL + '/equipment_types/create', data)
    .then(() => {
      localStorage.setItem("last_tab", "equipment_types")
      window.location.reload()
      toast({
        title: "Тип добавлен",
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
      id="addEquipmentTypeForm"
      onSubmit={AddRowEquipmentTypeTable}
      error={error}
      isProcessing={isProcessing}
      textFields={textFields}
    />
  )
}

export default EquipmentTypeAddForm
