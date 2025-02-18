"use client"

import React from 'react'
import * as z from "zod"
import axios from "axios";
import { API_URL } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"
import { useState } from "react";
import {
  UpdateUserPasswordSchema
} from "@/schemas";

import { useToast } from "@/hooks/use-toast";
import { textFieldsForUpdatePassword } from './fields';
import CRUDFormForTables from '../crud-form-for-tables';

const UserUpdatePasswordForm = ({
  id
} : {
  id: number
}) => {
  const [error, setError] = useState<string | undefined>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const { toast } = useToast()

  const form = useForm<z.infer<typeof UpdateUserPasswordSchema>>({
    resolver: zodResolver(UpdateUserPasswordSchema),
    defaultValues: {
      user_id: id,
      new_password: ""
    }
  });

  function UpdateUserPassword(data: z.infer<typeof UpdateUserPasswordSchema>) {
    setError("")
    setIsProcessing(true)
    axios.defaults.withCredentials = true
    axios.post(API_URL + '/auth/change-password', null, {
      params: data
    })
    .then(() => {
      // TODO: придумать как сделать так чтобы оставаться на той же вкладке на которой был до релоада
      window.location.reload()
      toast({
        title: "Пароль обновлен",
        description: "Данные записаны в БД",
        className: "bg-white"
      })
    })
    .catch((e) => {
      setError("Во время обновления пароля пользователя произошла непредвиденная ошибка!")
      console.log("Unexpected error occured while adding row.")
      console.log(e)
      setIsProcessing(false)
    })
  }

  return (
    <CRUDFormForTables
      buttonText="Изменить"
      form={form}
      id="UpdatePasswordForm"
      onSubmit={UpdateUserPassword}
      error={error}
      isProcessing={isProcessing}
      textFields={textFieldsForUpdatePassword}
    />
  )
}

export default UserUpdatePasswordForm
