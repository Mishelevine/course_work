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

  const { toast } = useToast()

  const form = useForm<z.infer<typeof EquipmentStatusTypeFormSchema>>({
    resolver: zodResolver(EquipmentStatusTypeFormSchema),
    defaultValues: {
      status_type_name: ""
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
    axios.put(API_URL + `/equipment_status_type/${id}/update`,
    data, {
      params: {
        status_type_id: id
      }
    })
    .then(() => {
      toast({
        title: "Статус обновлен",
        description: "Данные записаны в БД",
        className: "bg-white"
      })
      console.log("Updated!", data)
    })
    .catch((e) => {
      setError("Произошла непредвиденная ошибка при обновлении записи!")
      console.log("Error while updating row!")
      console.log(e)
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
      textFields={textFields}
    />
  )
}

export default EquipmentStatusTypeUpdateForm
