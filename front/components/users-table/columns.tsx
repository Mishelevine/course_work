"use client"

import { UserLogSchema } from "@/schemas";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

export const UserLogTableColumns: ColumnDef<z.infer<typeof UserLogSchema>>[] = [
    {
        accessorKey: "event_type",
        header: "Тип события"
    },
    {
        accessorKey: "time",
        header: "Дата и время",
    },
    {
        accessorKey: "user_id",
        header: "ID пользователя",
    },
    {
        accessorKey: "role_id",
        header: "ID роли пользователя",
    }
]
