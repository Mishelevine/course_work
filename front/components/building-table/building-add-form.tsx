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

  const { toast } = useToast()

  const form = useForm<z.infer<typeof BuildingFormSchema>>({
    resolver: zodResolver(BuildingFormSchema),
    defaultValues: {
      building_address: ""
    }
  });

  function AddRowBuildingTable(data: z.infer<typeof BuildingFormSchema>) {
    setError("")
    axios.post(API_URL + '/buildings/create', data)
    .then(() => {
      console.log("Added row", data)
      toast({
        title: "Адрес корпуса добавлен",
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
      id="addBuildingForm"
      onSubmit={AddRowBuildingTable}
      error={error}
      textFields={textFields}
    />
  )
}

export default BuildingAddForm
