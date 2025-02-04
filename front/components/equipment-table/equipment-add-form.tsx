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

const EquipmentAddForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(true)

  const { toast } = useToast()

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = (await axios.get(API_URL + `/equipment_types/all`)).data
        comboboxFields[0].data = response
        setLoading(false)
      }
      catch(e) {
        console.log("Ошибка при получении данных о типах оборудования")
        console.log(e)
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
      network_name: "",
      remarks: "",
      type_id: 0,
    }
  });

  function AddRowEquipmentTable(data: z.infer<typeof EquipmentFormSchema>) {
    setError("")
    axios.post(API_URL + '/equipment/create', data)
    .then(() => {
      console.log("Added row", data)
      toast({
        title: "Запись добавлена",
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
      id="addEquipmentForm"
      onSubmit={AddRowEquipmentTable}
      error={error}
      loading={loading}
      textFields={textFields}
      comboboxFields={comboboxFields}
    />
  )
}

export default EquipmentAddForm
