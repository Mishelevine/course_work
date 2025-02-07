"use client"

import ResponsibleUserAddForm from "./responsible-user-add-form"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CorrectPagesCase } from "../helper-functions"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import Action from "../action"

interface ResponsibleUserDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function ResponsibleUserDataTable<TData, TValue>({
  columns,
  data,
}: ResponsibleUserDataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    id: false
  })
  const [currentPageNumber, setCurrentPageNumber] = React.useState<number>(1)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnFilters,
      columnVisibility,
    }
  })

  const [isFormOpen, setIsFormOpen] = React.useState<boolean>(false)

  return (
    <>
      <Action
        title="Создать ответственное лицо"
        description={<>Заполните все поля и нажмите кнопку <b>Создать</b></>}
        form={<ResponsibleUserAddForm />}
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
      />
      <div className="w-full h-full">
        <div className="flex items-start justify-between py-4">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" className="border-0 px-1">
              <AccordionTrigger className="flex h-[40px] min-w-[100px] max-w-[100px] py-0">Фильтры</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2 p-1">
                <Input
                  placeholder="Поиск по ФИО..."
                  value={(table.getColumn("full_name")?.getFilterValue() as string) ?? ""}
                  onChange={(event) =>
                  table.getColumn("full_name")?.setFilterValue(event.target.value)
                  }
                  className="w-[300px]"
                />
                <Input
                  placeholder="Поиск по должности..."
                  value={(table.getColumn("job_name")?.getFilterValue() as string) ?? ""}
                  onChange={(event) =>
                  table.getColumn("job_name")?.setFilterValue(event.target.value)
                  }
                  className="w-[300px]"
                />
                <Input
                  placeholder="Поиск по подразделению..."
                  value={(table.getColumn("office_name")?.getFilterValue() as string) ?? ""}
                  onChange={(event) =>
                  table.getColumn("office_name")?.setFilterValue(event.target.value)
                  }
                  className="w-[300px]"
                />
              </AccordionContent>
              </AccordionItem>
            </Accordion>
          <div className="flex gap-2">
            <Button
              className="bg-blue-2 hover:bg-blue-700"
              onClick={() => setIsFormOpen(true)}
            >
              Добавить запись
            </Button>
          </div>
        </div>
        <div className="rounded-md border overflow-y-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    Нет ответственных лиц
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {currentPageNumber} из {Math.max(table.getPageOptions().length, 1)} {" "} {CorrectPagesCase(table.getPageOptions().length)}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setCurrentPageNumber(currentPageNumber - 1)
              table.previousPage()
            }}
            disabled={!table.getCanPreviousPage()}
          >
            Назад
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setCurrentPageNumber(currentPageNumber + 1)
              table.nextPage()
            }}
            disabled={!table.getCanNextPage()}
          >
            Вперед
          </Button>
        </div>
      </div>
    </>
  )
}
