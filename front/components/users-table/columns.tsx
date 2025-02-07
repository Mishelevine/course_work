"use client"

import { UserSchemaForTable } from "@/schemas";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import UserUpdateForm from "./user-update-form";
import ActionsButton from "../actions-button";

export const UserTableColumns: ColumnDef<z.infer<typeof UserSchemaForTable>>[] = [
    {
        accessorKey: "full_name",
        header: "ФИО пользователя",
    },
    {
        accessorKey: "username",
        header: "Логин"
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
        accessorKey: "role_name",
        header: "Роль"
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const actionsData = [
                {
                    title: "Изменить данные о пользователе",
                    description: <>Заполните все поля и нажмите кнопку <b>Изменить</b></>,
                    submitButtonText: "Изменить",
                    form: <UserUpdateForm id={row.getValue("id")} />,
                    dropdownButtonText: "Изменить запись"
                }
            ]
            return (
                <ActionsButton actionsData={actionsData}/>
            )
        },
    },
    {
        accessorKey: "id",
        header: "№",
    },
]
