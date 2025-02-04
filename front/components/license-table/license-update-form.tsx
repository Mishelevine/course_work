"use client"

import { useToast } from '@/hooks/use-toast'
import { LicenseFormSchema } from '@/schemas'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import axios from 'axios'
import { API_URL } from '@/constants'
import { textFields } from './fields';
import CRUDFormForTables from '../crud-form-for-tables';

const LicenseUpdateForm = ({
    id
} : {
    id: number
}) => {
  const [error, setError] = useState<string | undefined>("")
  const [loading, setLoading] = useState<boolean>(true)

  const { toast } = useToast()

  const form = useForm<z.infer<typeof LicenseFormSchema>>({
    resolver: zodResolver(LicenseFormSchema),
    defaultValues: {
      license_type: ""
    }
  });

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL + `/license/${id}`)
        console.log(response.data)
        form.reset(response.data)
        setLoading(false)
      } catch (e) {
        console.log("Ошибка загрузки данных")
        console.log(e)
      }
    }
    fetchData()
  }, [id])

  const UpdateRowLicenseTable = (data: z.infer<typeof LicenseFormSchema>) => {
    setError("")
    axios.put(API_URL + `/license/${id}/update`,
    data, {
      params: {
        license_id: id
      }
    })
    .then(() => {
      toast({
        title: "Запись обновлена",
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
      id="updateLicenseForm"
      onSubmit={UpdateRowLicenseTable}
      error={error}
      loading={loading}
      textFields={textFields}
    />
  )
}

export default LicenseUpdateForm
