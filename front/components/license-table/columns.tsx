"use client"

import { LicenseSchema } from "@/schemas";
import LicenseUpdateForm from "./license-update-form";

import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { API_URL } from "@/constants";
import DeleteRowForm from "../delete-row-form";
import ActionsButton from "../actions-button";

export const LicensesTableColumns: ColumnDef<z.infer<typeof LicenseSchema>>[] = [
    {
        accessorKey: "license_type",
        header: "Тип лицензии"
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const actionsData = [
                {
                    title: "Изменить лицензию",
                    description: <>Заполните все поля и нажмите кнопку <b>Изменить</b></>,
                    form: <LicenseUpdateForm id={row.getValue("id")} />,
                    dropdownButtonText: "Изменить"
                },
                {
                    title: "Удалить лицензию",
                    description: <>Вы уверены что хотите удалить лицензию <b>{row.getValue("license_type")}</b>?</>,
                    form:   <DeleteRowForm
                                apiEndpoint={API_URL + `/license/${row.getValue("id")}/delete`}
                                toastText="Лицензия успешно удалена"
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
