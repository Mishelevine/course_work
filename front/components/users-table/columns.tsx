"use client"

import { UserSchemaForTable } from "@/schemas";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { DeleteRowTable } from "../helper-functions";
import ModalForm from "../modal-form";
import UserUpdateForm from "./user-update-form";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { API_URL } from "@/constants";

export const UserTableColumns: ColumnDef<z.infer<typeof UserSchemaForTable>>[] = [
    {
        accessorKey: "full_name",
        header: "ФИО пользователя",
    },
    {
        accessorKey: "username",
        header: "Логин"
    },
    {
        accessorKey: "job_name",
        header: "Должность"
    },
    {
        accessorKey: "office_name",
        header: "Подразделение"
    },
    {
        accessorKey: "role_name",
        header: "Роль"
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <ModalForm
                    title="Изменить данные о пользователе"
                    description={<>Заполните все поля и нажмите кнопку <b>Изменить</b></>}
                    form={<UserUpdateForm id={row.getValue("id")} />}
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
                                // DeleteRowTable(API_URL + `/software/${row.getValue("id")}/delete`)
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
        header: "№",
    },
]
