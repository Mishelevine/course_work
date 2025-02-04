"use client"

import React from 'react'
import * as z from "zod"
import axios from "axios";
import { API_URL } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"
import { useState } from "react";
import { EquipmentSpecsFormSchema } from "@/schemas";

import { useToast } from "@/hooks/use-toast";
import { textFields } from './fields';
import CRUDFormForTables from '../crud-form-for-tables';

const EquipmentSpecsAddForm = ({
  equipmentId
} : {
  equipmentId: number
}) => {
  const [error, setError] = useState<string | undefined>("");

  const { toast } = useToast()

  const form = useForm<z.infer<typeof EquipmentSpecsFormSchema>>({
    resolver: zodResolver(EquipmentSpecsFormSchema),
    defaultValues: {
      screen_resolution: "",
      processor_type: "",
      ram_size: "",
      gpu_info: "",
      storage: "",
      equipment_id: equipmentId
    }
  });

  function AddRowEquipmentSpecsTable(data: z.infer<typeof EquipmentSpecsFormSchema>) {
    setError("")
    axios.post(API_URL + '/equipment_specs/create', data)
    .then(() => {
      console.log("Added row", data)
      toast({
        title: "Характеристики добавлены",
        description: "Данные записаны в БД",
        className: "bg-white"
      })
    })
    .catch((e) => {
      setError("Во время добавления характеристик произошла непредвиденная ошибка")
      console.log("Unexpected error occured while adding row.")
      console.log(data)
      console.log(e)
    })
  }

  return (
    <CRUDFormForTables
      buttonText="Создать"
      form={form}
      id="addEquipmentSpecsForm"
      onSubmit={AddRowEquipmentSpecsTable}
      error={error}
      textFields={textFields}
    />
  )
}

export default EquipmentSpecsAddForm
