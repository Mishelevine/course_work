import React from 'react'
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
const ModalSoftwareForm = ({
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
      <AlertDialogContent className="bg-light-3 border-2 border-black shadow max-h-full overflow-y-auto">
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

export default ModalSoftwareForm
