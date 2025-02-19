"use client"

import { EquipmentStatusTypeSchema } from "@/schemas";
import EquipmentStatusTypeUpdateForm from "./equipment-status-type-update-form";

import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { API_URL } from "@/constants";
import DeleteRowForm from "../delete-row-form";
import ActionsButton from "../actions-button";

export const EquipmentStatusTypeTableColumns: ColumnDef<z.infer<typeof EquipmentStatusTypeSchema>>[] = [
    {
        accessorKey: "status_type_name",
        header: "Наименование статуса",
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
        id: "actions",
        cell: ({ row }) => {
            const actionsData = [
                {
                    title: "Изменить наименование статуса",
                    description: <>Заполните все поля и нажмите кнопку <b>Изменить</b></>,
                    form: <EquipmentStatusTypeUpdateForm id={row.getValue("id")} />,
                    dropdownButtonText: "Изменить"
                },
                {
                    title: "Удалить наименование статуса",
                    description: <>Вы уверены что хотите удалить статус <b>{row.getValue("status_type_name")}</b>?</>,
                    form:   <DeleteRowForm
                                apiEndpoint={API_URL + `/equipment_status_type/${row.getValue("id")}/delete`}
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
        accessorKey: "status_type_color",
    },
    {
        accessorKey: "id",
    }
]
