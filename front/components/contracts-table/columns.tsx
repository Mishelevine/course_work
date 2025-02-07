"use client"

import { ContractSchema } from "@/schemas";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react"
import { z } from "zod";
import { Button } from "@/components/ui/button"
import { DateFromDbForm } from "../helper-functions";
import { Checkbox } from "../ui/checkbox";
import ContractUpdateForm from "./contract-update-form";
import { useEffect } from "react";
import { API_URL } from "@/constants";
import DeleteRowForm from "../delete-row-form";
import ActionsButton from "../actions-button";

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
            const actionsData = [
                {
                    title: "Изменить договор",
                    description: <>Заполните все поля и нажмите кнопку <b>Изменить</b></>,
                    form: <ContractUpdateForm id={row.getValue("id")} />,
                    dropdownButtonText: "Изменить"
                },
                {
                    title: "Удалить договор",
                    description: <>Вы уверены что хотите удалить договор <b>{row.getValue("contract_number")}</b>?</>,
                    form:   <DeleteRowForm
                                apiEndpoint={API_URL + `/contract/${row.getValue("id")}/delete`}
                                toastText="Договор успешно удален"
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
        accessorKey: "id",
    },
    {
        accessorKey: "selected",
    },
]
