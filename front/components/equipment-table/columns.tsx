"use client"

import { EquipmentSchema } from "@/schemas";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import EquipmentUpdateForm from "./equipment-update-form";
import { Button } from "../ui/button";
import Link from "next/link";
import { API_URL } from "@/constants";
import DeleteRowForm from "../delete-row-form";
import ActionsButton from "../actions-button";
import { ArrowUpDown } from "lucide-react";
import { DateFromDbForm } from "../helper-functions";

export const EquipmentTableColumns: ColumnDef<z.infer<typeof EquipmentSchema>>[] = [
    {
        accessorKey: "type_name",
        header: "Тип оборудования",
    },
    {
        accessorKey: "model",
        header: "Модель оборудования",
    },
    {
        accessorKey: "serial_number",
        header: "Серийный номер",
    },
    {
        accessorKey: "inventory_number",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Инвентарный номер
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "accepted_date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Дата принятия к учету
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({row}) => {
            return row.getValue("accepted_date") ? DateFromDbForm(row.getValue("accepted_date")) : ""
        }
    },
    {
        accessorKey: "network_name",
        header: "Сетевое имя",
    },
    {
        accessorKey: "remarks",
        header: "Примечание",
    },
    {
        accessorKey: "responsible_user_full_name",
        header: "ФИО ответственного",
    },
    {
        accessorKey: "last_status_type",
        header: "Статус оборудования"
    },
    {
        accessorKey: "building_adress", // FIXME МИША ПЕРЕИМЕНУЙ ПОЛЕ (((
        header: "Адрес корпуса"
    },
    {
        id: "additional_info",
        header: "Подробная информация",
        cell: ({ row }) => {
            return (
                <Link href={`characteristics/${row.getValue("id")}`}>
                    <Button className="h-8 w-fit p-2 bg-gray-100 hover:text-white hover:bg-gray-400
                        border-[1px] border-gray-400 text-black">
                        Показать
                    </Button>
                </Link>
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const actionsData = [
                {
                    title: "Изменить оборудование",
                    description: <>Заполните все поля и нажмите кнопку <b>Изменить</b></>,
                    form: <EquipmentUpdateForm id={row.getValue("id")} />,
                    dropdownButtonText: "Изменить"
                },
                {
                    title: "Удалить оборудование",
                    description: <>Вы уверены что хотите удалить оборудование <b>{row.getValue("model")}</b>?</>,
                    form:   <DeleteRowForm
                                apiEndpoint={API_URL + `/equipment/${row.getValue("id")}`}
                                toastText="Оборудование успешно удалено"
                                calledFrom="equipment"
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
]
