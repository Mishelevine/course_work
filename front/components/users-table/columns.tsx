"use client"

import { UserLogSchema } from "@/schemas";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

export const UserLogTableColumns: ColumnDef<z.infer<typeof UserLogSchema>>[] = [
    {
        accessorKey: "user_name",
        header: "Имя пользователя",
    },
    {
        accessorKey: "event_type",
        header: "Тип события"
    },
    {
        accessorKey: "time",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Дата и время
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "user_role",
        header: "Роль пользователя",
    }
]
