"use client"

import { EquipmentStatusTableSchema } from "@/schemas";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import EquipmentStatusUpdateForm from "./equipment-status-update-form";
import { DatetimeFromDbForm } from "../helper-functions";
import { API_URL } from "@/constants";
import DeleteRowForm from "../delete-row-form";
import ActionsButton from "../actions-button";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

export const EquipmentStatusTableColumns: ColumnDef<z.infer<typeof EquipmentStatusTableSchema>>[] = [
    {
        accessorKey: "status_type_name",
        header: "Статус",
        cell: ({ row }) => {
            const color: string = row.getValue("status_type_color");
            return (
                <span style={{ color }}>
                    {row.getValue("status_type_name")}
                </span>
            );
        }
    },
    {
        accessorKey: "doc_number",
        header: "Номер договора",
    },
    {
        accessorKey: "status_change_date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Дата изменения статуса
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({row}) => {
            return DatetimeFromDbForm(row.getValue("status_change_date"))
        }
    },
    {
        accessorKey: "responsible_user_fio",
        header: "ФИО ответственного",
    },
    {
        accessorKey: "responsible_user_job_name",
        header: "Должность ответственного",
    },

    {
        accessorKey: "responsible_user_office_name",
        header: "Подразделение ответственного",
    },
    {
        accessorKey: "building_address",
        header: "Адрес учебного корпуса",
    },
    {
        accessorKey: "audience_id",
        header: "Номер аудитории",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const actionsData = [
                {
                    title: "Изменить статус ПО",
                    description: <>Заполните все поля и нажмите кнопку <b>Изменить</b></>,
                    form: <EquipmentStatusUpdateForm id={row.getValue("id")} />,
                    dropdownButtonText: "Изменить"
                },
                {
                    title: "Удалить статус ПО",
                    description: <>Вы уверены что хотите удалить статус ПО <b>{row.getValue("status_type_name")}</b>?</>,
                    form:   <DeleteRowForm
                                apiEndpoint={API_URL + `/equipment_status/${row.getValue("id")}`}
                                toastText="Статус успешно удален"
                            />,
                    dropdownButtonText: "Удалить"
                }
            ]
            return (
                <ActionsButton actionsData={actionsData}/>
            )
        },
    },
    {
        accessorKey: "id"
    },
    {
        accessorKey: "equipment_id"
    },
    {
        accessorKey: "status_type_color",
    },
]
