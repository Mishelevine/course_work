"use client"

import { useToast } from '@/hooks/use-toast'
import { ContractFormSchema } from '@/schemas'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import axios from 'axios'
import { API_URL } from '@/constants'
import { DateFromDbForm, DateToDbForm } from '../helper-functions'
import { textFields } from './fields';
import CRUDFormForTables from '../crud-form-for-tables'

const ContractUpdateForm = ({
    id
}: {
    id: number
}) => {
  const [error, setError] = useState<string | undefined>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const { toast } = useToast()

  const form = useForm<z.infer<typeof ContractFormSchema>>({
    resolver: zodResolver(ContractFormSchema),
    defaultValues: {
      contract_number: "",
      contract_date: ""
    }
  });

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL + `/contract/${id}`)
        const normalDate = DateFromDbForm(response.data.contract_date)
        response.data.contract_date = normalDate
        form.reset(response.data)
        setLoading(false)
      } catch (e) {
        console.log("Ошибка загрузки данных")
        console.log(e)
      }
    }
    fetchData()
  }, [id])

  const UpdateRowContractTable = (data: z.infer<typeof ContractFormSchema>) => {
    setError("")
    setIsProcessing(true)
    axios.put(API_URL + `/contract/${id}/update`, {
      contract_number: data.contract_number,
      contract_date: DateToDbForm(data.contract_date)
    }, {
      params: {
        contract_id: id
      }
    })
    .then(() => {
      localStorage.setItem("last_tab", "contracts")
      window.location.reload()
      toast({
        title: "Запись обновлена",
        description: "Данные записаны в БД",
        className: "bg-white"
      })
    })
    .catch((e) => {
      if (e.response.data.detail == "Contract number already exists"){
        setError("Договор с таким номером уже существует")
      } else {
        setError("Произошла непредвиденная ошибка при обновлении записи!")
        console.log("Error while updating row!")
        console.log(e)
      }
      setIsProcessing(false)
    })
  }

  return (
    <CRUDFormForTables
      buttonText="Изменить"
      form={form}
      id="updateContractForm"
      onSubmit={UpdateRowContractTable}
      error={error}
      isProcessing={isProcessing}
      loading={loading}
      textFields={textFields}
    />
  )
}

export default ContractUpdateForm
