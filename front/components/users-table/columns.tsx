"use client"

import { UserSchemaForTable } from "@/schemas";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import UserUpdateForm from "./user-update-form";
import ActionsButton from "../actions-button";
import DeleteRowForm from "../delete-row-form";
import { API_URL } from "@/constants";
import UserUpdatePasswordForm from "./user-update-password-form";

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
                    form: <UserUpdateForm id={row.getValue("id")} />,
                    dropdownButtonText: "Изменить данные пользователя"
                },
                {
                    title: "Изменить пароль пользователя",
                    description: <>Заполните все поля и нажмите кнопку <b>Изменить</b></>,
                    form: <UserUpdatePasswordForm id={row.getValue("id")} />,
                    dropdownButtonText: "Изменить пароль пользователя"
                },
                {
                    title: "Удалить пользователя",
                    description: <>Вы уверены что хотите удалить пользователя <b>{row.getValue("full_name")}</b>?</>,
                    form:   <DeleteRowForm
                                apiEndpoint={API_URL + `/user/${row.getValue("id")}`}
                                toastText="Пользователь успешно удален"
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
        header: "№",
    },
]
