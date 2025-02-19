"use client"

import React from 'react'
import * as z from "zod"
import axios from "axios";
import { API_URL } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"
import { useEffect, useState } from "react";
import { EquipmentFormSchema, TypeSchema } from "@/schemas";

import { useToast } from "@/hooks/use-toast";
import { textFields, comboboxFields } from './fields';
import CRUDFormForTables from '../crud-form-for-tables';

const EquipmentUpdateForm = ({
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
        const response = (await axios.get(API_URL + `/equipment_types/all`)).data
        const editedEquipment = (await axios.get(API_URL + `/equipment/${id}`)).data
        form.reset(editedEquipment)
        comboboxFields[0].data = response
        setLoading(false)
      }
      catch(e) {
        console.log("Ошибка при получении данных о типах оборудования")
        console.log(e)
        setIsProcessing(false)
      }
    }

    fetchData()
  }, [])

  const form = useForm<z.infer<typeof EquipmentFormSchema>>({
    resolver: zodResolver(EquipmentFormSchema),
    defaultValues: {
      model: "",
      serial_number: "",
      inventory_number: "",
      accepted_date: "",
      network_name: "",
      remarks: "",
      type_id: 0,
    }
  });

  function UpdateRowEquipmentTable(data: z.infer<typeof EquipmentFormSchema>) {
    setError("")
    setIsProcessing(true)
    axios.put(API_URL + `/equipment/${id}`, data)
    .then(() => {
      localStorage.setItem("last_tab", "equipment")
      window.location.reload()
      toast({
        title: "Запись обновлена",
        description: "Данные записаны в БД",
        className: "bg-white"
      })
    })
    .catch((e) => {
      setError("Произошла непредвиденная ошибка при обновлении записи")
      console.log("Error while updating row!")
      console.log(e)
    })
  }

  return (
    <CRUDFormForTables
      buttonText="Изменить"
      form={form}
      id="updateEquipmentForm"
      onSubmit={UpdateRowEquipmentTable}
      error={error}
      isProcessing={isProcessing}
      loading={loading}
      textFields={textFields}
      comboboxFields={comboboxFields}
    />
  )
}

export default EquipmentUpdateForm
