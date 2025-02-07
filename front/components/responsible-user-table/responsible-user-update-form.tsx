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

const ResponsibleUserUpdateForm = ({
    id
} : {
    id: number
}) => {
  const [error, setError] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(true)

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

        const current_resp_user = (await axios.get(API_URL + `/responsible_users/${id}`)).data
        form.reset(current_resp_user)
      }
      catch(e) {
        console.log("Ошибка при получении данных, необходимых для создания пользователя")
        console.log(e)
      } finally {
        setLoading(false)
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

  function UpdateRowResponsibleUserTable(data: z.infer<typeof SingleResponsibleUserFormSchema>) {
    setError("")
    axios.put(API_URL + `/responsible_users/${id}/update`, data)
    .then(() => {
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
      id="updateResponsibleUserForm"
      onSubmit={UpdateRowResponsibleUserTable}
      error={error}
      loading={loading}
      textFields={textFields}
      comboboxFields={comboboxFields}
    />
  )
}

export default ResponsibleUserUpdateForm
