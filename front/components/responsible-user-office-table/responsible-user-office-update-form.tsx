"use client"

import { ResponsibleUserOfficeFormSchema } from '@/schemas'

import { useToast } from '@/hooks/use-toast'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import axios from 'axios'
import { API_URL } from '@/constants'
import { textFields } from './fields';
import CRUDFormForTables from '../crud-form-for-tables';

const ResponsibleUserOfficeUpdateForm = ({
    id
} : {
    id: number
}) => {
  const [error, setError] = useState<string | undefined>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const { toast } = useToast()

  const form = useForm<z.infer<typeof ResponsibleUserOfficeFormSchema>>({
    resolver: zodResolver(ResponsibleUserOfficeFormSchema),
    defaultValues: {
      office_name: ""
    }
  });

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL + `/responsible_users/office/${id}`)
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

  const UpdateRowResponsibleUserOfficeTable = (data: z.infer<typeof ResponsibleUserOfficeFormSchema>) => {
    setError("")
    setIsProcessing(true)
    axios.put(API_URL + `/responsible_users/office/${id}`,
    data, {
      params: {
        office_id: id
      }
    })
    .then(() => {
      localStorage.setItem("last_tab", "responsible_users_offices")
      window.location.reload()
      toast({
        title: "Подразделение обновлено",
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
      id="updateResponsibleUserOfficeForm"
      onSubmit={UpdateRowResponsibleUserOfficeTable}
      error={error}
      isProcessing={isProcessing}
      loading={loading}
      textFields={textFields}
    />
  )
}

export default ResponsibleUserOfficeUpdateForm
