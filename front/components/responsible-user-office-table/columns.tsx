"use client"

import { ResponsibleUserOfficeSchema } from "@/schemas";
import ResponsibleUserOfficeUpdateForm from "./responsible-user-office-update-form";

import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { API_URL } from "@/constants";
import DeleteRowForm from "../delete-row-form";
import ActionsButton from "../actions-button";

export const ResponsibleUserOfficeTableColumns: ColumnDef<z.infer<typeof ResponsibleUserOfficeSchema>>[] = [
    {
        accessorKey: "office_name",
        header: "Наименование должности"
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const actionsData = [
                {
                    title: "Изменить подразделение",
                    description: <>Заполните все поля и нажмите кнопку <b>Изменить</b></>,
                    form: <ResponsibleUserOfficeUpdateForm id={row.getValue("id")} />,
                    dropdownButtonText: "Изменить"
                },
                {
                    title: "Удалить подразделение",
                    description: <>Вы уверены что хотите удалить подразделение <b>{row.getValue("office_name")}</b>?</>,
                    form:   <DeleteRowForm
                                apiEndpoint={API_URL + `/responsible_users/office/${row.getValue("id")}`}
                                toastText="Подразделение успешно удалено"
                                calledFrom="responsible_users_offices"
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
