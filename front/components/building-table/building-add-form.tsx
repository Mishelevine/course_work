"use client"

import { BuildingFormSchema } from '@/schemas';

import React, { useState } from 'react'
import * as z from "zod"
import axios from "axios";
import { API_URL } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { textFields } from './fields';
import CRUDFormForTables from '../crud-form-for-tables';

const BuildingAddForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const { toast } = useToast()

  const form = useForm<z.infer<typeof BuildingFormSchema>>({
    resolver: zodResolver(BuildingFormSchema),
    defaultValues: {
      building_address: ""
    }
  });

  function AddRowBuildingTable(data: z.infer<typeof BuildingFormSchema>) {
    setError("")
    setIsProcessing(true)
    axios.post(API_URL + '/buildings/create', data)
    .then(() => {
      localStorage.setItem("last_tab", "buildings")
      window.location.reload()
      toast({
        title: "Адрес корпуса добавлен",
        description: "Данные записаны в БД",
        className: "bg-white"
      })
    })
    .catch((e) => {
      if (e.response.data.detail == "Building already exists"){
        setError("Корпус с таким адресом уже существует")
      } else {
        setError("Во время добавления записи произошла непредвиденная ошибка!")
        console.log("Unexpected error occured while adding row.")
        console.log(e)
      }
      setIsProcessing(false)
    })
  }

  return (
    <CRUDFormForTables
      buttonText="Создать"
      form={form}
      id="addBuildingForm"
      onSubmit={AddRowBuildingTable}
      error={error}
      isProcessing={isProcessing}
      textFields={textFields}
    />
  )
}

export default BuildingAddForm
