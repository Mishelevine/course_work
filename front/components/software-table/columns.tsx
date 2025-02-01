"use client"

import { SoftwareTableSchema } from "@/schemas";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react"
import { LinkIcon } from "lucide-react";
import Link from "next/link";
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
import { DeleteRowSoftwareTable } from "../helper-functions";
import ModalForm from "../modal-form";
import { SoftwareUpdateForm } from "./software-update-form";
import { AlertDialogTrigger } from "../ui/alert-dialog";

export const SoftwareTableColumns: ColumnDef<z.infer<typeof SoftwareTableSchema>>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Наименование ПО
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "short_name",
        header: "Сокращенное наименование ПО"
    },
    {
        accessorKey: "program_link",
        header: "Ссылка на программу",
        cell: ({ row }) => {
            return <Link
                href={row.getValue("program_link")}
                className="flex flex-row items-center gap-2
                transition-colors text-blue-900 hover:text-blue-400 w-fit"
            >
                <LinkIcon className="flex justify-self-center" width={28} height={28} />
                <p>Перейти на сайт</p>
            </Link>
        },
    },
    {
        accessorKey: "version",
        header: "Версия"
    },
    {
        accessorKey: "version_date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Дата версии
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "license_type",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Тип лицензии
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: "contracts",
        header: "Договоры",
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-fit">
                            АЛЛО ПОКАЖИСЬ
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Hello</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                    </DropdownMenuContent>
                </DropdownMenu>
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
                    form={<SoftwareUpdateForm id={row.getValue("id")} />}
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
                            <DropdownMenuItem onClick={() => { DeleteRowSoftwareTable(row.getValue("id")) }}>Удалить запись</DropdownMenuItem>
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
