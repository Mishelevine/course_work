"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
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
import { SoftwareAddForm } from "./software-add-form"
import DownloadButton from "../download-button"
import { API_URL } from "@/constants"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import Action from "../action"

interface SoftwareDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  userRole: number
}

export function SoftwareDataTable<TData, TValue>({
  columns,
  data,
  userRole
}: SoftwareDataTableProps<TData, TValue>) {
  const seesContracts = userRole >= 2
  const actionsAllowed = userRole >= 3

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    id: false,
    contracts: seesContracts,
    actions: actionsAllowed
  })
  const [currentPageNumber, setCurrentPageNumber] = React.useState<number>(1)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    }
  })

  const [isFormOpen, setIsFormOpen] = React.useState<boolean>(false)

  return (
    <>
      <Action
        title="Создать ПО"
        description={<>Заполните все поля и нажмите кнопку <b>Создать</b></>}
        form={<SoftwareAddForm />}
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
                  placeholder="Фильтр по наименованию ПО..."
                  value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                  onChange={(event) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)
                  }
                  className="w-[300px]"
                />
                <Input
                  placeholder="Фильтр по типу лицензии..."
                  value={(table.getColumn("license_type")?.getFilterValue() as string) ?? ""}
                  onChange={(event) =>
                    table.getColumn("license_type")?.setFilterValue(event.target.value)
                  }
                  className="w-[300px]"
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="flex gap-2">
            <DownloadButton
              className="bg-blue-2 hover:bg-blue-700"
              apiEndpoint={API_URL + "/software/to_excel_file"}
              buttonText="Выгрузить в Excel"
              tableData={table.getFilteredRowModel().rows.map(row => row.original)}
            />
            {actionsAllowed && <Button
              className="bg-blue-2 hover:bg-blue-700"
              onClick={() => setIsFormOpen(true)}
            >
              Добавить запись
            </Button>}
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
                    Нет записей.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {currentPageNumber} из {table.getPageOptions().length} {" "} {CorrectPagesCase(table.getPageOptions().length)}
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
