"use client"

import { EquipmentSpecsSchema } from "@/schemas";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import EquipmentSpecsUpdateForm from "./equipment-specs-update-form";
import { API_URL } from "@/constants";
import DeleteRowForm from "../delete-row-form";
import ActionsButton from "../actions-button";

export const EquipmentSpecsTableColumns: ColumnDef<z.infer<typeof EquipmentSpecsSchema>>[] = [
    {
        accessorKey: "screen_resolution",
        header: "Разрешение экрана",
    },
    {
        accessorKey: "processor_type",
        header: "Тип процессора",
    },
    {
        accessorKey: "ram_size",
        header: "Объём оперативной памяти",
    },
    {
        accessorKey: "gpu_info",
        header: "Характеристики ГП",
    },
    {
        accessorKey: "storage",
        header: "Тип и объём диска",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const actionsData = [
                {
                    title: "Изменить характеристики ПО",
                    description: <>Заполните все поля и нажмите кнопку <b>Изменить</b></>,
                    form: <EquipmentSpecsUpdateForm id={row.getValue("id")} />,
                    dropdownButtonText: "Изменить"
                },
                {
                    title: "Удалить характеристики ПО",
                    description: <>Вы уверены что хотите удалить характеристики этого ПО?</>,
                    form:   <DeleteRowForm
                                apiEndpoint={API_URL + `/equipment_specs/${row.getValue("id")}`}
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
]
