"use client"

import { EquipmentSpecsSchema } from "@/schemas";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import ModalForm from "../modal-form";
import EquipmentSpecsUpdateForm from "./equipment-specs-update-form";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { AlertDialogTrigger } from "../ui/alert-dialog";
import { DeleteRowTable } from "../helper-functions";
import { API_URL } from "@/constants";
import { useToast } from "@/hooks/use-toast";

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
            return (
                <ModalForm
                    title="Изменить ПО"
                    description={<>Измените все необходимые поля и нажмите кнопку <b>Изменить</b></>}
                    form={<EquipmentSpecsUpdateForm id={row.getValue("id")} />}
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
                                DeleteRowTable(API_URL + `/equipment_specs/${row.getValue("id")}`)
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
        accessorKey: "id"
    },
    {
        accessorKey: "equipment_id"
    },
]
