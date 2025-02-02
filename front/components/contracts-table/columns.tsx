"use client"

import { ContractSchema } from "@/schemas";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react"
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
import { DateFromDbForm, DeleteRowTable } from "../helper-functions";
import { AlertDialogTrigger } from "../ui/alert-dialog";
import { Checkbox } from "../ui/checkbox";
import ModalForm from "../modal-form";
import ContractUpdateForm from "./contract-update-form";
import { useEffect } from "react";
import { API_URL } from "@/constants";

export const ContractsTableColumns: ColumnDef<z.infer<typeof ContractSchema>>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Выбрать все"
            />
        ),
        cell: ({ row }) => {
            useEffect(() => {
                if (row.original.selected !== row.getIsSelected()) {
                    row.toggleSelected(row.original.selected);
                }
            }, [row.original.selected]);

            return (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => {
                        row.original.selected = !!value;
                        row.toggleSelected(!!value)
                    }}
                    aria-label="Выбрать запись"
                />
            );
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "contract_number",
        header: "Номер договора"
    },
    {
        accessorKey: "contract_date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    type="button"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Дата договора
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({row}) => {
            return DateFromDbForm(row.getValue("contract_date"))
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <ModalForm
                    title="Изменить ПО"
                    description={<>Заполните все поля и нажмите кнопку <b>Изменить</b></>}
                    form={<ContractUpdateForm id={row.getValue("id")} />}
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
                            <DropdownMenuItem onClick={() => { DeleteRowTable(API_URL + `/contract/${row.getValue("id")}/delete`) }}>Удалить запись</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </ModalForm>
            )
        },
    },
    {
        accessorKey: "id",
    },
    {
        accessorKey: "selected",
    },
]
