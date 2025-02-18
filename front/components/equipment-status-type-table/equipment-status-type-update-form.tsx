"use client"

import { EquipmentStatusTypeFormSchema } from '@/schemas'

import { useToast } from '@/hooks/use-toast'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import axios from 'axios'
import { API_URL } from '@/constants'
import { textFields } from './fields';
import CRUDFormForTables from '../crud-form-for-tables';

const EquipmentStatusTypeUpdateForm = ({
    id
} : {
    id: number
}) => {
  const [error, setError] = useState<string | undefined>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const { toast } = useToast()

  const form = useForm<z.infer<typeof EquipmentStatusTypeFormSchema>>({
    resolver: zodResolver(EquipmentStatusTypeFormSchema),
    defaultValues: {
      status_type_name: "",
      status_type_color: ""
    }
  });

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL + `/equipment_status_type/${id}`)
        form.reset(response.data)
      } catch (e) {
        console.log("Ошибка загрузки данных")
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  const UpdateRowEquipmentStatusTypeTable = (data: z.infer<typeof EquipmentStatusTypeFormSchema>) => {
    setError("")
    setIsProcessing(true)
    axios.put(API_URL + `/equipment_status_type/${id}/update`,
    data, {
      params: {
        status_type_id: id
      }
    })
    .then(() => {
      // TODO: придумать как сделать так чтобы оставаться на той же вкладке на которой был до релоада
      window.location.reload()
      toast({
        title: "Статус обновлен",
        description: "Данные записаны в БД",
        className: "bg-white"
      })
    })
    .catch((e) => {
      setError("Произошла непредвиденная ошибка при обновлении записи!")
      console.log("Error while updating row!")
      console.log(e)
      setIsProcessing(false)
    })
  }

  return (
    <CRUDFormForTables
      buttonText="Изменить"
      form={form}
      id="updateEquipmentStatusTypeForm"
      onSubmit={UpdateRowEquipmentStatusTypeTable}
      error={error}
      loading={loading}
      isProcessing={isProcessing}
      textFields={textFields}
    />
  )
}

export default EquipmentStatusTypeUpdateForm
