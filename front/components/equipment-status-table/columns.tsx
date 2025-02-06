"use client"

import { EquipmentStatusTableSchema } from "@/schemas";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import ModalForm from "../modal-form";
import EquipmentStatusUpdateForm from "./equipment-status-update-form";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { AlertDialogTrigger } from "../ui/alert-dialog";
import { DatetimeFromDbForm, DeleteRowTable } from "../helper-functions";
import { API_URL } from "@/constants";

// TODO: пофиксить, когда миша переделает ручку
export const EquipmentStatusTableColumns: ColumnDef<z.infer<typeof EquipmentStatusTableSchema>>[] = [
    {
        accessorKey: "status_type_name",
        header: "Статус",
    },
    {
        accessorKey: "doc_number",
        header: "Номер договора",
    },
    {
        accessorKey: "status_change_date",
        header: "Дата изменения статуса",
        cell: ({row}) => {
            return DatetimeFromDbForm(row.getValue("status_change_date"))
        }
    },
    {
        accessorKey: "responsible_user_fio",
        header: "ФИО ответственного",
    },
    {
        accessorKey: "responsible_user_job_name",
        header: "Должность ответственного",
    },

    {
        accessorKey: "responsible_user_office_name",
        header: "Подразделение ответственного",
    },
    {
        accessorKey: "building_address",
        header: "Адрес учебного корпуса",
    },
    {
        accessorKey: "audience_id",
        header: "Номер аудитории",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <ModalForm
                    title="Изменить ПО"
                    description={<>Заполните все поля и нажмите кнопку <b>Изменить</b></>}
                    form={<EquipmentStatusUpdateForm id={row.getValue("id")} />}
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
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation() }}>Изменить статус</DropdownMenuItem>
                            </AlertDialogTrigger>
                            <DropdownMenuItem onClick={() => {
                                DeleteRowTable(API_URL + `/equipment_status/${row.getValue("id")}`)
                            }}>
                                Удалить статус
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
