import React from 'react'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
const ModalForm = ({
  form,
  title,
  description,
  children
}: Readonly<{
  form: React.ReactNode,
  title: string,
  description: React.ReactElement,
  children: React.ReactNode
}>) => {
  return (
    <AlertDialog>
      {children}
      <AlertDialogContent className="flex-col max-w-2xl bg-light-3 border-2 border-black shadow max-h-full overflow-y-auto">
        <AlertDialogHeader className="flex items-center">
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {form}
        <AlertDialogFooter>
          <AlertDialogCancel className="w-full border-2">Назад</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ModalForm
