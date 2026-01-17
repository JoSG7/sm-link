"use client"

import { useState } from "react"

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/features/shared/components/shadcn/button"
import { Checkbox } from "@/features/shared/components/shadcn/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/features/shared/components/shadcn/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/features/shared/components/shadcn/table"
import { LinkDetails } from "@/global"
import { months } from "@/consts"
import { IconAlertCircleFilled, IconShieldCheckFilled } from "@tabler/icons-react"


export const columns: ColumnDef<LinkDetails>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox className="border-neutral-700 bg-neutral-800"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox className="border-neutral-700 bg-neutral-800"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "original",
    header: "Original URL",
    cell: ({ row }) => (
      <div className="max-w-96 text-nowrap overflow-x-hidden mask-r-from-90">{row.getValue("original")}</div>
    ),
  },
  {
    accessorKey: "short",
    header: "Short Version",
    cell: ({ row }) => (
      <div className="">{row.getValue("short")}</div>
    ),
  },
  {
    accessorKey: "has_password",
    header: () => <div className="">Protection</div>,
    cell: ({ row }) => {

      const hasPassword = row.getValue("has_password") as boolean

      if (!hasPassword) {
        return (
          <div className="w-max py-1 px-2 text-xs text-neutral-300 rounded-full border border-neutral-900">
            No protected
          </div>
        )
      }

      return (
        <div className="w-max py-1 px-2 flex items-center justify-center gap-1 text-xs rounded-full border border-neutral-900">
          <IconShieldCheckFilled className="size-3 text-green-400" />
          Protected
        </div>
      )
    },
  },
  {
    accessorKey: "expires_at",
    header: () => <div className="">Expires at</div>,
    cell: ({ row }) => {

      const expiresAt = row.getValue("expires_at") as string | null

      if (!expiresAt) {
        return (
          <div className="w-max py-1 px-2 text-xs text-neutral-300 rounded-full border border-neutral-900">
            No expires
          </div>
        )
      } else {

        const date = new Date(expiresAt)

        return (
          <div className="w-max py-1 px-2 flex items-center justify-center gap-1 text-xs rounded-full border border-neutral-900">
            <IconAlertCircleFilled className="size-3 text-amber-300" />
            {months[date.getMonth()] + " " + date.getDate() + " - " + date.getFullYear()}
          </div>
        )
      }

      

    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button className="hover:bg-neutral-800 hover:text-white "
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at") as string)
      return (
        <div className="">{months[date.getMonth()] + " " + date.getDate() + " - " + date.getFullYear()}</div>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]


export function UserLinksTable({ data, loading }: { data: LinkDetails[] | [], loading: boolean }) {

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})


  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })


  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-md border-[1.5px] border-neutral-900">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="bg-neutral-900 text-base hover:bg-neutral-900"
                key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="px-4"
                      key={header.id}>
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
            {
              loading ?
                <TableRow>
                  <TableCell className="h-24 text-center"
                    colSpan={columns.length}>
                    Loading
                  </TableCell>
                </TableRow>
                :
                table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell className="px-4"
                          key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )
                  :
                  (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )
            }
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
