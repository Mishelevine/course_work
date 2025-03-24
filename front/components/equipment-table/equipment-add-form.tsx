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
import { DateToDbForm } from '../helper-functions';

const EquipmentAddForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(true)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const { toast } = useToast()

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = (await axios.get(API_URL + `/equipment_types/all`)).data
        comboboxFields[0].data = response
        setLoading(false)
      }
      catch (e) {
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
      accepted_date: "",
      network_name: "",
      remarks: "",
      type_id: 0,
    }
  });

  function AddRowEquipmentTable(data: z.infer<typeof EquipmentFormSchema>) {
    setError("")
    setIsProcessing(true)

    var toApi
    if (data.accepted_date !== ""){
      toApi = {
        ...data,
        accepted_date: DateToDbForm(data.accepted_date)
      }
    } else {
      toApi = {
        type_id: data.type_id,
        model: data.model,
        serial_number: data.serial_number,
        inventory_number: data.inventory_number,
        network_name: data.network_name,
        remarks: data.remarks,
      }
    }
    axios.post(API_URL + '/equipment/create', toApi)
      .then(() => {
        localStorage.setItem("last_tab", "equipment")
        window.location.reload()
        toast({
          title: "Запись добавлена",
          description: "Данные записаны в БД",
          className: "bg-white"
        })
      })
      .catch((e) => {
        if (e.response.status === 400 && e.response.data.detail === "Equipment with this serial number already exists") {
          setError("Оборудование с таким серийным номером уже существует")
        } else {
          setError("Во время добавления записи произошла непредвиденная ошибка!")
        }
        console.log("Unexpected error occured while adding row.")
        console.log(e)
        setIsProcessing(false)
      })
  }

  return (
    <CRUDFormForTables
      buttonText="Создать"
      form={form}
      id="addEquipmentForm"
      onSubmit={AddRowEquipmentTable}
      error={error}
      isProcessing={isProcessing}
      loading={loading}
      textFields={textFields}
      comboboxFields={comboboxFields}
    />
  )
}

export default EquipmentAddForm
