import React, { ReactNode } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from './ui/button'
import { AddRowSoftwareTable } from './software-table/crud'

const ModalSoftware = (
    {
        dialogTitle,
        dialogDescription
    } : {
        dialogTitle: string,
        dialogDescription: ReactNode
    }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="bg-blue-2 hover:bg-blue-800" onClick={() => AddRowSoftwareTable()}>Добавить запись</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-light-3 border-2 border-black shadow">
                <AlertDialogHeader>
                    <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
                    <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction>Создать</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ModalSoftware
