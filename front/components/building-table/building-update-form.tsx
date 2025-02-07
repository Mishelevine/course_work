"use client"

import { BuildingFormSchema } from '@/schemas'

import { useToast } from '@/hooks/use-toast'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import axios from 'axios'
import { API_URL } from '@/constants'
import { textFields } from './fields';
import CRUDFormForTables from '../crud-form-for-tables';

const BuildingUpdateForm = ({
    id
} : {
    id: number
}) => {
  const [error, setError] = useState<string | undefined>("")
  const [loading, setLoading] = useState<boolean>(true)

  const { toast } = useToast()

  const form = useForm<z.infer<typeof BuildingFormSchema>>({
    resolver: zodResolver(BuildingFormSchema),
    defaultValues: {
      building_address: ""
    }
  });

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL + `/buildings/${id}`)
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

  const UpdateRowBuildingTable = (data: z.infer<typeof BuildingFormSchema>) => {
    setError("")
    axios.put(API_URL + `/buildings/${id}/update`,
    data, {
      params: {
        building_id: id
      }
    })
    .then(() => {
      toast({
        title: "Адрес корпуса обновлен",
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
      id="updateBuildingForm"
      onSubmit={UpdateRowBuildingTable}
      error={error}
      loading={loading}
      textFields={textFields}
    />
  )
}

export default BuildingUpdateForm
