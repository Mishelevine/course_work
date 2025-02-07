import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import CRUDFormForTables from './crud-form-for-tables';

const DeleteRowForm = ({
  apiEndpoint,
  toastText
} : {
  apiEndpoint: string
  toastText: string
}) => {
  const [error, setError] = useState<string | undefined>("");

  const { toast } = useToast()

  const form = useForm();

  function DeleteRowTable() {
    axios.delete(apiEndpoint)
    .then(() => {
      toast({
        title: toastText,
        description: "Данные удалены из БД",
        className: "bg-white"
      })
    })
    .catch((e) => {
      setError("Произошла непредвиденная ошибка при удалении записи")
      console.log("Error while deleting row")
      console.log(e)
    })
  }

  return (
    <CRUDFormForTables
      buttonText="Удалить"
      form={form}
      id="addUserForm"
      onSubmit={DeleteRowTable}
      error={error}
    />
  )
}

export default DeleteRowForm
