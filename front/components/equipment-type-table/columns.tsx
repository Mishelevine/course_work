"use client"

import { EquipmentTypeSchema } from "@/schemas";
import EquipmentTypeUpdateForm from "./equipment-type-update-form";

import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DeleteRowTable } from "../helper-functions";
import { AlertDialogTrigger } from "../ui/alert-dialog";
import ModalForm from "../modal-form";
import { API_URL } from "@/constants";

export const EquipmentTypeTableColumns: ColumnDef<z.infer<typeof EquipmentTypeSchema>>[] = [
    {
        accessorKey: "type_name",
        header: "Тип оборудования"
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <ModalForm
                    title="Изменить тип"
                    description={<>Заполните все поля и нажмите кнопку <b>Изменить</b></>}
                    form={<EquipmentTypeUpdateForm id={row.getValue("id")} />}
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
                            <DropdownMenuItem onClick={() => {
                                DeleteRowTable(API_URL + `/equipment_types/${row.getValue("id")}`)
                            }}>
                                Удалить запись
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </ModalForm>
            )
        },
    },
    {
        accessorKey: "id",
    }
]
