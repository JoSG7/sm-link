"use client"

import { useState } from "react"

import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type ColumnFiltersState, type SortingState, type VisibilityState } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/shadcn/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/table"
import { Button } from "@/components/shadcn/button"
import { Checkbox } from "@/components/shadcn/checkbox"
import { LinkDetails } from "@/types/global"
import { useDispatch } from "react-redux"
import { toast } from "sonner"
import { format, formatDistanceToNow } from "date-fns"
import { toggleCreateUserLinkExpiration, toggleCreateUserLinkPassword, toggleDeleteUserLink, toggleUpdateUserLinkExpiration, toggleUpdateUserLinkPassword } from "@/store/user-modals-slice"
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight, IconCopy, IconSortDescending } from "@tabler/icons-react"
import { MoreHorizontal } from "lucide-react"


export function UserLinksTable({ data, loading }: { data: LinkDetails[], loading: boolean }) {

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    has_password: false,
    is_expired: false
  })
  const [rowSelection, setRowSelection] = useState({})
  const dispatch = useDispatch()

  const columns: ColumnDef<LinkDetails>[] = [
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
        <div className="max-w-96 font-medium text-nowrap overflow-x-hidden mask-r-from-90">{row.getValue("original")}</div>
      ),
    },
    {
      accessorKey: "short",
      header: "Short URL",
      cell: ({ row }) => (
        <div className="flex gap-2 items-center">
          <IconCopy className="size-4 text-neutral-400 hover:text-neutral-100 cursor-pointer"
            onClick={() =>
              navigator.clipboard.writeText(`sm-link.vercel.app/${row.getValue("short")}`).then(() => { toast.success("Copied!") })
            } />
          {row.getValue("short")}
        </div>
      ),
    },
    {
      accessorKey: "has_password",
      enableHiding: true
    },
    {
      accessorKey: "is_expired",
      enableHiding: true
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => {
        return (
          <button className="flex gap-2 items-center cursor-pointer hover:text-white duration-300"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Created At
            <IconSortDescending className="size-4" />
          </button>
        )
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue("created_at") as string)
        return (
          <p className="text-sm text-neutral-300"
            title={format(date, "PPP 'at' HH:mm")}>
            {formatDistanceToNow(date, { addSuffix: true })}
          </p>
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
            <div className="w-max py-1 px-2 text-xs text-neutral-300 rounded-md border border-neutral-800">
              No expires
            </div>
          )
        } else {

          const date = new Date(expiresAt)

          return (
            <p className="w-max py-1 px-2 flex items-center justify-center gap-1 text-xs rounded-md text-yellow-300
            border border-yellow-500/30 bg-yellow-500/20">
              {format(date, "MMM d, yyyy")}
            </p>
          )
        }
      },
    },
    {
      accessorKey: "status",
      header: () => <div>Status</div>,
      cell: ({ row }) => {

        const hasPassword = row.getValue<boolean>("has_password")
        const isExpired = row.getValue<boolean>("is_expired")

        return (

          <div className="flex gap-2 text-xs font-medium">
            {
              hasPassword ?
                <p className="py-1 px-2 flex gap-1 items-center rounded-md border border-blue-500/30 bg-blue-500/20 text-blue-400">
                  Locked
                </p>
                :
                <p className="py-1 px-2 flex gap-1 items-center rounded-md border border-green-500/30 bg-green-500/20 text-green-400">
                  Public
                </p>
            }
            {
              isExpired &&
              <p className="py-1 px-2 flex gap-1 items-center rounded-md border border-red-500/30 bg-red-500/20 
              text-red-400">
                Expired
              </p>
            }
          </div>

        )

      }
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {

        const hasPassword = row.getValue("has_password") as boolean
        const hasExpiration = row.getValue("expires_at") as string | null
        const expirationDate = row.getValue("expires_at") as string
        const short = row.getValue("short") as string

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-8 w-8 bg-transparent hover:bg-neutral-700">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-neutral-800 text-white border border-neutral-700">
              <DropdownMenuItem className="hover:bg-neutral-700">
                Edit
              </DropdownMenuItem>
              {
                hasPassword ?
                  <DropdownMenuItem className="hover:bg-neutral-700"
                    onClick={() => dispatch(toggleUpdateUserLinkPassword(short))}>
                    Edit Password
                  </DropdownMenuItem>
                  :
                  <DropdownMenuItem className="hover:bg-neutral-700"
                    onClick={() => dispatch(toggleCreateUserLinkPassword(short))}>
                    Add Password
                  </DropdownMenuItem>
              }
              {
                hasExpiration ?
                  <DropdownMenuItem className="hover:bg-neutral-700"
                    onClick={() => dispatch(toggleUpdateUserLinkExpiration({ short, expirationDate }))}>
                    Edit Expiration
                  </DropdownMenuItem>
                  :
                  <DropdownMenuItem className="hover:bg-neutral-700"
                    onClick={() => dispatch(toggleCreateUserLinkExpiration(short))}>
                    Add Expiration
                  </DropdownMenuItem>
              }
              <DropdownMenuItem className="hover:bg-neutral-700">
                View Analytics
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-neutral-700" />

              <DropdownMenuItem className="text-red-400 hover:bg-red-400/50"
                onClick={() => {
                  dispatch(toggleDeleteUserLink(row.getValue("short")))
                }}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    },
  ]


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
      <div className="overflow-hidden rounded-md border-1.5 border-neutral-900 bg-neutral-950">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="bg-neutral-900 hover:bg-neutral-900"
                key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="px-4 text-sm text-neutral-300 h-14"
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
                  <TableCell className="text-center hover:bg-neutral-950 h-20"
                    colSpan={columns.length}>
                    Loading
                  </TableCell>
                </TableRow>
                :
                table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (

                    <TableRow className="h-16"
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}>
                      {
                        row.getVisibleCells().map((cell) => (
                          <TableCell className="px-4"
                            key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))
                      }
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

      <div className="flex items-center justify-end space-x-2 pt-6">

        <div className="text-neutral-400 flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        <div className="space-x-2">
          <button className="p-2 rounded-lg border-1.5 border-neutral-800 bg-neutral-950 cursor-pointer 
          disabled:opacity-50 disabled:cursor-auto"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}>
            <IconChevronsLeft className="size-5" />
          </button>

          <button className="p-2 rounded-lg border-1.5 border-neutral-800 bg-neutral-950 cursor-pointer 
          disabled:opacity-50 disabled:cursor-auto"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            <IconChevronLeft className="size-5" />
          </button>

          <button className="p-2 rounded-lg border-1.5 border-neutral-800 bg-neutral-950 cursor-pointer 
          disabled:opacity-50 disabled:cursor-auto"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            <IconChevronRight className="size-5" />
          </button>

          <button className="p-2 rounded-lg border-1.5 border-neutral-800 bg-neutral-950 cursor-pointer 
          disabled:opacity-50 disabled:cursor-auto"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}>
            <IconChevronsRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
