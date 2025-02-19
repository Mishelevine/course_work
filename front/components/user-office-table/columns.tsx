"use client"

import { UserOfficeSchema } from "@/schemas";
import UserOfficeUpdateForm from "./user-office-update-form";

import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { API_URL } from "@/constants";
import DeleteRowForm from "../delete-row-form";
import ActionsButton from "../actions-button";

export const UserOfficeTableColumns: ColumnDef<z.infer<typeof UserOfficeSchema>>[] = [
    {
        accessorKey: "office_name",
        header: "Наименование подразделения"
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const actionsData = [
                {
                    title: "Изменить подразделение",
                    description: <>Заполните все поля и нажмите кнопку <b>Изменить</b></>,
                    form: <UserOfficeUpdateForm id={row.getValue("id")} />,
                    dropdownButtonText: "Изменить"
                },
                {
                    title: "Удалить подразделение",
                    description: <>Вы уверены что хотите удалить подразделение <b>{row.getValue("office_name")}</b>?</>,
                    form:   <DeleteRowForm
                                apiEndpoint={API_URL + `/office/${row.getValue("id")}/delete`}
                                toastText="Подразделение успешно удалено"
                                calledFrom="user_offices"
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
