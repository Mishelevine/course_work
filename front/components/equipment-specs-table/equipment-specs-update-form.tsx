"use client"

import React from 'react'
import * as z from "zod"
import axios from "axios";
import { API_URL } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"
import { useEffect, useState } from "react";
import { EquipmentSpecsFormSchema, TypeSchema } from "@/schemas";

import { useToast } from "@/hooks/use-toast";
import { textFields } from './fields';
import CRUDFormForTables from '../crud-form-for-tables';

const EquipmentSpecsUpdateForm = ({
    id
} : {
    id: number
}) => {
  const [error, setError] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(true)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const { toast } = useToast()

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = (await axios.get(API_URL + `/equipment_specs/${id}`)).data
        form.reset(response)
        setLoading(false)
      }
      catch(e) {
        console.log("Ошибка при получении данных о типах оборудования")
        console.log(e)
      }
    }

    fetchData()
  }, [])

  function UpdateRowEquipmentSpecsTable(data: z.infer<typeof EquipmentSpecsFormSchema>) {
    setError("")
    setIsProcessing(true)
    axios.put(API_URL + `/equipment_specs/${id}`, data)
    .then(() => {
      console.log("Updated row ID =", data)
      toast({
        title: "Характеристики обновлены",
        description: "Данные записаны в БД",
        className: "bg-white"
      })
    })
    .catch((e) => {
      setError("Произошла непредвиденная ошибка при обновлении характеристик")
      console.log("Error while updating row!")
      console.log(e)
      setIsProcessing(false)
    })
  }

  const form = useForm<z.infer<typeof EquipmentSpecsFormSchema>>({
    resolver: zodResolver(EquipmentSpecsFormSchema),
    defaultValues: {
      screen_resolution: "",
      processor_type: "",
      ram_size: "",
      gpu_info: "",
      storage: "",
      equipment_id: 0
    }
  });

  return (
    <CRUDFormForTables
      buttonText="Изменить"
      form={form}
      id="updateEquipmentSpecsForm"
      onSubmit={UpdateRowEquipmentSpecsTable}
      error={error}
      isProcessing={isProcessing}
      loading={loading}
      textFields={textFields}
    />
  )
}

export default EquipmentSpecsUpdateForm
