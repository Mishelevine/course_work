"use client"

import { BuildingSchema } from "@/schemas";
import BuildingUpdateForm from "./building-update-form";

import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { API_URL } from "@/constants";
import DeleteRowForm from "../delete-row-form";
import ActionsButton from "../actions-button";

export const BuildingTableColumns: ColumnDef<z.infer<typeof BuildingSchema>>[] = [
    {
        accessorKey: "building_address",
        header: "Адрес учебного корпуса"
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const actionsData = [
                {
                    title: "Изменить адрес",
                    description: <>Заполните все поля и нажмите кнопку <b>Изменить</b></>,
                    form: <BuildingUpdateForm id={row.getValue("id")} />,
                    dropdownButtonText: "Изменить"
                },
                {
                    title: "Удалить адрес",
                    description: <>Вы уверены что хотите удалить адрес <b>{row.getValue("building_address")}</b>?</>,
                    form:   <DeleteRowForm
                                apiEndpoint={API_URL + `/buildings/${row.getValue("id")}/delete`}
                                toastText="Адрес успешно удален"
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
