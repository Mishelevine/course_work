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
import ModalForm from "../modal-form"
import DownloadButton from "../download-button"
import { API_URL } from "@/constants"
import { AlertDialogTrigger } from "../ui/alert-dialog"
import ContractAddForm from "./contract-add-form"
import { useEffect } from "react"

interface ContractsDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  checkboxes: boolean;
  actions: boolean;
  onSelectedRowsChange?: (selectedIds: number[]) => void;
}

export function ContractsDataTable<TData, TValue>({
  columns,
  data,
  checkboxes,
  actions,
  onSelectedRowsChange,
}: ContractsDataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    select: checkboxes,
    id: false,
    actions: actions,
    selected: false
  })
  const [rowSelection, setRowSelection] = React.useState({})
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
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });

  useEffect(() => {
    if (onSelectedRowsChange) {
      const selectedIds = table.getSelectedRowModel().rows.map((row) => row.getValue("id") as number);
      onSelectedRowsChange(selectedIds);
    }
  }, [rowSelection]);

  return (
    <ModalForm
      title="Создать договор"
      description={<>Заполните все поля и нажмите кнопку <b>Создать</b></>}
      form={<ContractAddForm />}
    >
      <div className="w-full h-full px-1">
        <div className="flex items-center justify-between py-4">
          <Input
            placeholder="Поиск по номеру договора..."
            value={(table.getColumn("contract_number")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("contract_number")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          {actions && <div className="flex gap-2">
            {/* <DownloadButton
              className="bg-blue-2 hover:bg-blue-700"
              apiEndpoint={API_URL + "/contract/to_excel_file"}
              buttonText="Выгрузить в Excel"
            /> */}
            <AlertDialogTrigger asChild>
              <Button className="bg-blue-2 hover:bg-blue-700">Добавить запись</Button>
            </AlertDialogTrigger>
          </div>}
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
            {currentPageNumber} из {Math.max(table.getPageOptions().length, 1)} {" "} {CorrectPagesCase(table.getPageOptions().length)}
          </div>
          <Button
            variant="outline"
            type="button"
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
            type="button"
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
    </ModalForm>
  )
}
