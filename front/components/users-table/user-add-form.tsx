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
  CreateUserFormSchema
} from "@/schemas";

import { useToast } from "@/hooks/use-toast";
import { textFields, comboboxFields, DataArray } from './fields';
import CRUDFormForTables from '../crud-form-for-tables';

const UserAddForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(true)

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

  const form = useForm<z.infer<typeof CreateUserFormSchema>>({
    resolver: zodResolver(CreateUserFormSchema),
    defaultValues: {
      username: "",
      hashed_password: "",
      first_name: "",
      last_name: "",
      paternity: "",
      job_id: 0,
      office_id: 0,
      system_role_id: 0
    }
  });

  function AddRowUserTable(data: z.infer<typeof CreateUserFormSchema>) {
    setError("")
    axios.post(API_URL + '/auth/signup', data)
    .then(() => {
      toast({
        title: "Пользователь добавлен",
        description: "Данные записаны в БД",
        className: "bg-white"
      })
    })
    .catch((e) => {
      setError("Во время добавления пользователя произошла непредвиденная ошибка!")
      console.log("Unexpected error occured while adding row.")
      console.log(data)
      console.log(e)
    })
  }

  return (
    <CRUDFormForTables
      buttonText="Создать"
      form={form}
      id="addUserForm"
      onSubmit={AddRowUserTable}
      error={error}
      loading={loading}
      textFields={textFields}
      comboboxFields={comboboxFields}
    />
  )
}

export default UserAddForm
