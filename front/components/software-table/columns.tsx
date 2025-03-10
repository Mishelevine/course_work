"use client"

import { SoftwareTableSchema } from "@/schemas";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react"
import { LinkIcon } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DateFromDbForm } from "../helper-functions";
import { SoftwareUpdateForm } from "./software-update-form";
import ContractsTable from "../contracts-table/contracts-table";
import { API_URL } from "@/constants";
import ActionsButton from "../actions-button";
import DeleteRowForm from "../delete-row-form";

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
            const link = row.getValue("program_link")
            if (link === "") { return "Отсутствует" }
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
        header: "Версия",
        cell: ({ row }) => {
            const version = row.getValue("version")
            if (version === "") { return "Отсутствует" }
            return version
        }
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
        cell: ({ row }) => {
            const date = row.getValue("version_date")
            if (date === "") { return "Отсутствует" }
            return DateFromDbForm(row.getValue("version_date"))
        }
    },
    {
        accessorKey: "license_type",
        header: "Тип лицензии"
    },
    {
        id: "contracts",
        header: "Договоры",
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="h-8 w-fit p-2 bg-gray-100 hover:text-white hover:bg-gray-400
                        border-[1px] border-gray-400 text-black">
                            Показать ({row.original.contracts.length})
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="px-4 py-2" align="end">
                        <ContractsTable
                            checkboxes={false}
                            actions={false}
                            data={row.original.contracts}
                        />
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const actionsData = [
                {
                    title: "Изменить ПО",
                    description: <>Заполните все поля и нажмите кнопку <b>Изменить</b></>,
                    form: <SoftwareUpdateForm id={row.getValue("id")} />,
                    dropdownButtonText: "Изменить запись",
                },
                {
                    title: "Удалить ПО",
                    description: <>Вы уверены что хотите удалить ПО <b>{row.getValue("name")}</b>?</>,
                    form: <DeleteRowForm
                        apiEndpoint={API_URL + `/software/${row.getValue("id")}/delete`}
                        toastText="ПО успешно удалено"
                        calledFrom="software"
                    />,
                    dropdownButtonText: "Удалить",
                }
            ]
            return (
                <ActionsButton actionsData={actionsData} />
            )
        },
    },
    {
        accessorKey: "id",
        header: "№",
    },
]
