"use client"

import React from 'react'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from './ui/alert-dialog'

const Action = ({
  form,
  title,
  description,
  isOpen,
  setIsOpen
}: Readonly<{
  form: React.ReactNode,
  title: string,
  description: React.ReactElement,
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void
}>) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="flex-col max-w-2xl bg-light-3 border-2 border-black shadow max-h-full overflow-y-auto">
                <AlertDialogHeader className="flex items-center">
                <AlertDialogTitle>{title}</AlertDialogTitle>
                <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                {form}
                <AlertDialogFooter>
                    <AlertDialogCancel
                        type='button'
                        className="w-full border-2"
                        onClick={() => setIsOpen(false)}
                    >
                        Назад
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default Action
