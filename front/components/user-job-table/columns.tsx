"use client"

import { UserJobSchema } from "@/schemas";
import UserJobUpdateForm from "./user-job-update-form";

import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { API_URL } from "@/constants";
import ActionsButton from "../actions-button";
import DeleteRowForm from "../delete-row-form";

export const UserJobTableColumns: ColumnDef<z.infer<typeof UserJobSchema>>[] = [
    {
        accessorKey: "job_name",
        header: "Наименование должности"
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const actionsData = [
                {
                    title: "Изменить должность",
                    description: <>Заполните все поля и нажмите кнопку <b>Изменить</b></>,
                    form: <UserJobUpdateForm id={row.getValue("id")} />,
                    dropdownButtonText: "Изменить запись"
                },
                {
                    title: "Удалить должность",
                    description: <>Вы уверены что хотите удалить должность <b>{row.getValue("job_name")}</b>?</>,
                    form:   <DeleteRowForm
                                apiEndpoint={API_URL + `/job/${row.getValue("id")}`}
                                toastText="Должность успешно удалена"
                                calledFrom="user_jobs"
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
    }
]
