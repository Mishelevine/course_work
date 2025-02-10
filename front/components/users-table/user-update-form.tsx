"use client"

import React from 'react'
import * as z from "zod"
import axios from "axios";
import { API_URL } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"
import { useEffect, useState } from "react";
import {
  UserJobSchema,
  UserOfficeSchema,
  UserRoleSchema,
  UpdateUserFormSchema
} from "@/schemas";

import { useToast } from "@/hooks/use-toast";
import { textFieldsForUpdate, comboboxFields, DataArray } from './fields';
import CRUDFormForTables from '../crud-form-for-tables';

const UserUpdateForm = ({
    id
} : {
    id: number
}) => {
  const [error, setError] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(true)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const { toast } = useToast()

   useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const jobs = (await axios.get(API_URL + `/job/all`)).data as z.infer<typeof UserJobSchema>[]
        const jobs_for_combobox = await Promise.all(jobs.map(async job => {
          return {
            value: job.job_name,
            id: job.id
          } as DataArray
        })) as DataArray[]
        comboboxFields[0].data = jobs_for_combobox

        const offices = (await axios.get(API_URL + `/office/all`)).data as z.infer<typeof UserOfficeSchema>[]
        const offices_for_combobox = await Promise.all(offices.map(async office => {
          return {
            value: office.office_name,
            id: office.id
          } as DataArray
        })) as DataArray[]
        comboboxFields[1].data = offices_for_combobox

        const roles = (await axios.get(API_URL + `/role/all`)).data as z.infer<typeof UserRoleSchema>[]
        const roles_for_combobox = await Promise.all(roles.map(async role => {
          return {
            value: role.role_name,
            id: role.id
          } as DataArray
        })) as DataArray[]
        comboboxFields[2].data = roles_for_combobox

        const user = (await axios.get(API_URL + `/user/${id}`)).data as z.infer<typeof UpdateUserFormSchema>
        form.reset(user)
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

  const form = useForm<z.infer<typeof UpdateUserFormSchema>>({
    resolver: zodResolver(UpdateUserFormSchema),
    defaultValues: {
      username: "",
      first_name: "",
      last_name: "",
      paternity: "",
      job_id: 0,
      office_id: 0,
      system_role_id: 0,
      id: id
    }
  });

  function UpdateRowUserTable(data: z.infer<typeof UpdateUserFormSchema>) {
    setError("")
    setIsProcessing(true)
    console.log(data)
    axios.put(API_URL + `/user/${id}`, data)
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
      setIsProcessing(false)
    })
  }

  return (
    <CRUDFormForTables
      buttonText="Изменить"
      form={form}
      id="updateUserForm"
      onSubmit={UpdateRowUserTable}
      error={error}
      isProcessing={isProcessing}
      loading={loading}
      textFields={textFieldsForUpdate}
      comboboxFields={comboboxFields}
    />
  )
}

export default UserUpdateForm
