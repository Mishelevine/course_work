"use client"

import * as z from "zod"
import axios from "axios";
import { API_URL } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"
import { useEffect, useState } from "react";
import {
  ResponsibleUserJobSchema,
  ResponsibleUserOfficeSchema,
  SingleResponsibleUserFormSchema
} from "@/schemas";

import { useToast } from "@/hooks/use-toast";
import { textFields, comboboxFields, DataArray } from './fields';
import CRUDFormForTables from '../crud-form-for-tables';

const ResponsibleUserAddForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(true)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const { toast } = useToast()

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const jobs = (await axios.get(API_URL + `/responsible_users/job/all`)).data as z.infer<typeof ResponsibleUserJobSchema>[]
        const jobs_for_combobox = await Promise.all(jobs.map(async job => {
          return {
            value: job.job_name,
            id: job.id
          } as DataArray
        })) as DataArray[]
        comboboxFields[0].data = jobs_for_combobox

        const offices = (await axios.get(API_URL + `/responsible_users/office/all`)).data as z.infer<typeof ResponsibleUserOfficeSchema>[]
        const offices_for_combobox = await Promise.all(offices.map(async office => {
          return {
            value: office.office_name,
            id: office.id
          } as DataArray
        })) as DataArray[]
        comboboxFields[1].data = offices_for_combobox
        setLoading(false)
      }
      catch(e) {
        console.log("Ошибка при получении данных, необходимых для создания пользователя")
        console.log(e)
      }
    }

    fetchData()
  }, [])

  const form = useForm<z.infer<typeof SingleResponsibleUserFormSchema>>({
    resolver: zodResolver(SingleResponsibleUserFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      paternity: "",
      job_id: 0,
      office_id: 0
    }
  });

  function AddRowResponsibleUserTable(data: z.infer<typeof SingleResponsibleUserFormSchema>) {
    setError("")
    setIsProcessing(true)
    axios.post(API_URL + '/responsible_users/create', data)
    .then(() => {
      localStorage.setItem("last_tab", "responsible_users")
      window.location.reload()
      toast({
        title: "Ответственное лицо добавлено",
        description: "Данные записаны в БД",
        className: "bg-white"
      })
    })
    .catch((e) => {
      setError("Во время добавления записи произошла непредвиденная ошибка!")
      console.log("Unexpected error occured while adding row.")
      console.log(e)
      setIsProcessing(false)
    })
  }

  return (
    <CRUDFormForTables
      buttonText="Создать"
      form={form}
      id="addResponsibleUserForm"
      onSubmit={AddRowResponsibleUserTable}
      error={error}
      isProcessing={isProcessing}
      loading={loading}
      textFields={textFields}
      comboboxFields={comboboxFields}
    />
  )
}

export default ResponsibleUserAddForm
