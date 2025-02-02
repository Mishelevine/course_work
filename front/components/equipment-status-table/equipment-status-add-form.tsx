"use client"

import * as z from "zod"
import axios from "axios";
import { API_URL } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"
import { useEffect, useState } from "react";
import {
  StatusSchema,
  ResponsibleUserSchema,
  BuildingSchema,
  EquipmentStatusFormSchema
} from "@/schemas";

import { useToast } from "@/hooks/use-toast";
import { textFields, comboboxFields, DataArray } from './fields';
import CRUDFormForTables from '../crud-form-for-tables';

const EquipmentStatusAddForm = ({
  equipmentId
} : {
  equipmentId: number
}) => {
  const [error, setError] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(true)

  const { toast } = useToast()

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const statuses = (await axios.get(API_URL + `/equipment_status_type/all`)).data as z.infer<typeof StatusSchema>[]
        const statuses_for_combobox = await Promise.all(statuses.map(async status => {
          return {
            value: status.status_type_name,
            id: status.id
          } as DataArray
        })) as DataArray[]
        comboboxFields[0].data = statuses_for_combobox

        const responsible_users = (await axios.get(API_URL + `/responsible_users/all`)).data as z.infer<typeof ResponsibleUserSchema>[]
        const responsible_users_for_combobox = await Promise.all(responsible_users.map(async user => {
          const user_fio =  user.last_name +
                            " " + user.first_name +
                            (user.paternity ? " " + user.paternity: "");
          const user_job = (await axios.get(API_URL + `/responsible_users/job/${user.job_id}`)).data.job_name
          const user_office = (await axios.get(API_URL + `/responsible_users/office/${user.office_id}`)).data.office_name

          return {
            value:  user_fio +
                    (user_job ? ", " + user_job : "") +
                    (user_office ? ", " + user_office : ""),
            id: user.id
          } as DataArray
        })) as DataArray[]
        comboboxFields[1].data = responsible_users_for_combobox

        const buildings = (await axios.get(API_URL + `/buildings/all`)).data as z.infer<typeof BuildingSchema>[]
        const buildings_for_combobox = await Promise.all(buildings.map(async building => {
          return {
            value: building.building_address,
            id: building.id
          } as DataArray
        })) as DataArray[]
        comboboxFields[2].data = buildings_for_combobox
        console.log(comboboxFields)
        setLoading(false)
      }
      catch(e) {
        console.log("Ошибка при получении данных о статусе")
        console.log(e)
      }
    }

    fetchData()
  }, [])

  const form = useForm<z.infer<typeof EquipmentStatusFormSchema>>({
    resolver: zodResolver(EquipmentStatusFormSchema),
    defaultValues: {
      doc_number: "",
      status_change_date: "",
      audience_id: "",
      status_type_id: 0,
      responsible_user_id: 0,
      building_id: 0,
      equipment_id: equipmentId
    }
  });

  function AddRowEquipmentStatusTable(data: z.infer<typeof EquipmentStatusFormSchema>) {
    setError("")
    axios.post(API_URL + '/equipment_status/create', {
      doc_number: data.doc_number,
      status_change_date: new Date(),
      audience_id: data.audience_id,
      status_type_id: data.status_type_id,
      responsible_user_id: data.responsible_user_id,
      building_id: data.building_id,
      equipment_id: data.equipment_id,
    })
    .then(() => {
      console.log("Added row", data)
      toast({
        title: "Запись добавлена",
        description: "Данные записаны в БД",
        className: "bg-white"
      })
    })
    .catch((e) => {
      setError("Во время добавления записи произошла непредвиденная ошибка!")
      console.log("Unexpected error occured while adding row.")
      console.log({
        doc_number: data.doc_number,
        status_change_date: new Date(),
        audience_id: data.audience_id,
        status_type_id: data.status_type_id,
        responsible_user_id: data.responsible_user_id,
        building_id: data.building_id,
        equipment_id: data.equipment_id,
      })
      console.log(e)
    })
  }

  return (
    <CRUDFormForTables
      buttonText="Создать"
      form={form}
      id="addEquipmentStatusForm"
      onSubmit={AddRowEquipmentStatusTable}
      error={error}
      loading={loading}
      textFields={textFields}
      comboboxFields={comboboxFields}
    />
  )
}

export default EquipmentStatusAddForm
