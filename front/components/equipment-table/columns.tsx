"use client"

import { EquipmentSchema } from "@/schemas";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import ModalForm from "../modal-form";
import EquipmentUpdateForm from "./equipment-update-form";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { AlertDialogTrigger } from "../ui/alert-dialog";
import { DeleteRowTable } from "../helper-functions";
import Link from "next/link";
import { API_URL } from "@/constants";

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
        header: "Инвентарный номер",
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
        id: "status",
        header: "Статус оборудования",
        cell: ({ row }) => {
            return (
                <Link href={`equipment/status/${row.getValue("id")}`}>
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
            return (
                <ModalForm
                    title="Изменить ПО"
                    description={<>Заполните все поля и нажмите кнопку <b>Изменить</b></>}
                    form={<EquipmentUpdateForm id={row.getValue("id")} />}
                >
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Раскрыть меню</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Действия</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation() }}>Изменить запись</DropdownMenuItem>
                            </AlertDialogTrigger>
                            <DropdownMenuItem onClick={() => { DeleteRowTable(API_URL + `/equipment/${row.getValue("id")}`) }}>Удалить запись</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </ModalForm>
            )
        },
    },
    {
        accessorKey: "id"
    },
]
