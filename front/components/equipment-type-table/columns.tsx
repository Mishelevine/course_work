"use client"

import { EquipmentTypeSchema } from "@/schemas";
import EquipmentTypeUpdateForm from "./equipment-type-update-form";

import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { API_URL } from "@/constants";
import DeleteRowForm from "../delete-row-form";
import ActionsButton from "../actions-button";

export const EquipmentTypeTableColumns: ColumnDef<z.infer<typeof EquipmentTypeSchema>>[] = [
    {
        accessorKey: "type_name",
        header: "Тип оборудования"
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const actionsData = [
                {
                    title: "Изменить тип оборудования",
                    description: <>Заполните все поля и нажмите кнопку <b>Изменить</b></>,
                    form: <EquipmentTypeUpdateForm id={row.getValue("id")} />,
                    dropdownButtonText: "Изменить"
                },
                {
                    title: "Удалить тип оборудования",
                    description: <>Вы уверены что хотите удалить тип оборудования <b>{row.getValue("type_name")}</b>?</>,
                    form:   <DeleteRowForm
                                apiEndpoint={API_URL + `/equipment_types/${row.getValue("id")}`}
                                toastText="Тип оборудования успешно удален"
                                calledFrom="equipment_types"
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
