"use client"

import { ResponsibleUserSchema } from "@/schemas";
import ResponsibleUserUpdateForm from "./responsible-user-update-form";

import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { API_URL } from "@/constants";
import DeleteRowForm from "../delete-row-form";
import ActionsButton from "../actions-button";

export const ResponsibleUserTableColumns: ColumnDef<z.infer<typeof ResponsibleUserSchema>>[] = [
    {
        accessorKey: "full_name",
        header: "ФИО ответственного лица"
    },
    {
        accessorKey: "job_name",
        header: "Должность"
    },
    {
        accessorKey: "office_name",
        header: "Подразделение"
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const actionsData = [
                {
                    title: "Изменить ответственное лицо",
                    description: <>Заполните все поля и нажмите кнопку <b>Изменить</b></>,
                    form: <ResponsibleUserUpdateForm id={row.getValue("id")} />,
                    dropdownButtonText: "Изменить запись"
                },
                {
                    title: "Удалить ответственное лицо",
                    description: <>Вы уверены что хотите удалить ответственное лицо <b>{row.getValue("full_name")}</b>?</>,
                    form:   <DeleteRowForm
                                apiEndpoint={API_URL + `/responsible_users/${row.getValue("id")}/delete`}
                                toastText="Ответственное лицо успешно удалено"
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
        accessorKey: "id",
    }
]
