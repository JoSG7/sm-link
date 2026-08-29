"use client"

import { useMemo, useState } from "react"
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { IconCalendarOff, IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight, IconClockCheck, IconClockExclamation, IconCopy, IconLink, IconShieldLockFilled, IconSortDescending, IconUserFilled } from "@tabler/icons-react"
import { toast } from "sonner"
import { format } from "date-fns"
import { Checkbox } from "@/components/shadcn/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/table"
import { LinkDetails } from "@/types/global"
import { LinkFilters } from "./LinkFilters"
import { LinkActions } from "./LinkActions"
import { RelativeDate } from "./RelativeDate"
import { ClaimButton } from "./ClaimButton"
import { CreateButton } from "./CreateButton"

interface LinksTableProps {
  links: LinkDetails[]
  isAuthenticated: boolean
}

export function LinksTable({ links, isAuthenticated }: LinksTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [filter, setFilter] = useState<"all" | "protected" | "expired">("all")
  const [search, setSearch] = useState("")
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    has_password: false,
    is_expired: false,
  })
  const [rowSelection, setRowSelection] = useState({})

  const filteredLinks = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return links.filter(link => {
      const matchesFilter = filter === "all"
        || (filter === "protected" && link.has_password)
        || (filter === "expired" && link.is_expired)
      const matchesSearch = !normalizedSearch || link.original.toLowerCase().includes(normalizedSearch)

      return matchesFilter && matchesSearch
    })
  }, [filter, links, search])

  const columns: ColumnDef<LinkDetails>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          className="border-neutral-700 bg-neutral-800"
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          className="border-neutral-700 bg-neutral-800"
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
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
        <div className="max-w-96 overflow-x-hidden line-clamp-1 font-medium mask-r-from-90">
          {row.getValue("original")}
        </div>
      ),
    },
    {
      accessorKey: "short",
      header: "Short URL",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <IconCopy
            className="size-4 cursor-pointer text-neutral-400 hover:text-neutral-100"
            onClick={() => navigator.clipboard.writeText(`sm-link.vercel.app/${row.getValue("short")}`).then(() => toast.success("Copied!"))}
          />
          {row.getValue("short")}
        </div>
      ),
    },
    {
      accessorKey: "has_password",
      enableHiding: true,
    },
    {
      accessorKey: "is_expired",
      enableHiding: true,
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <button
          className="flex cursor-pointer items-center gap-2 hover:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <IconSortDescending className="size-4" />
        </button>
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("created_at") as string)
        return (
          <RelativeDate date={date} />
        )
      },
    },
    {
      accessorKey: "expires_at",
      header: "Expires at",
      cell: ({ row }) => {
        const expiresAt = row.getValue("expires_at") as string | null

        if (!expiresAt) {
          return (
            <div className="inline-flex w-max items-center gap-1 rounded-full border border-neutral-800 px-2.5 py-1 text-xs text-neutral-400">
              <IconCalendarOff className="size-3.5 text-neutral-500" />
              No expiration
            </div>
          )
        }

        return (
          <p className={`flex w-max items-center justify-center gap-1 rounded-full border px-2.5 py-1 text-xs ${row.original.is_expired ? "border-red-500/30 bg-red-500/10 text-red-300" : "border-amber-500/30 bg-amber-500/10 text-amber-200"}`}>
            <IconClockCheck className="size-3.5" />
            {row.original.is_expired ? "Expired " : "Expires "}
            {format(new Date(expiresAt), "MMM d, yyyy")}
          </p>
        )
      },
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => {
        const hasPassword = row.getValue<boolean>("has_password")
        const isExpired = row.getValue<boolean>("is_expired")
        const isClaimedGuestLink = !isAuthenticated && row.original.has_user_id

        return (
          <div className="flex flex-wrap gap-2 text-xs font-medium">
            {hasPassword ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-blue-200">
                <IconShieldLockFilled className="size-3.5" />
                Protected
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-1 text-green-200">
                <IconLink className="size-3.5" />
                Public
              </span>
            )}
            {isExpired && (
              <span className="inline-flex items-center gap-1 rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-red-300">
                <IconClockExclamation className="size-3.5" />
                Expired
              </span>
            )}
            {isClaimedGuestLink && (
              <span className="inline-flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 text-purple-200">
                <IconUserFilled className="size-3.5 text-purple-300" />
                Claimed
              </span>
            )}
          </div>
        )
      },
    },
    {
      id: "actions",
      header: "",
      enableHiding: false,
      cell: ({ row }) => (
        <LinkActions
          short={row.original.short}
          hasPassword={row.original.has_password}
          expirationDate={row.original.expires_at}
          hasUserId={row.original.has_user_id}
          isAuthenticated={isAuthenticated}
        />
      ),
    },
  ]

  const table = useReactTable({
    data: filteredLinks,
    columns,
    state: { sorting, columnVisibility, rowSelection },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="w-full">

      <section className="mb-5 flex flex-col gap-3 rounded-2xl border border-neutral-800/80 bg-neutral-950 p-3 sm:flex-row sm:items-center sm:justify-between">
        <LinkFilters
          filter={filter}
          search={search}
          onFilterChange={setFilter}
          onSearchChange={setSearch}
          isAuthenticated={isAuthenticated}
        />

        <div className="flex gap-4 items-center">
          <ClaimButton
            isAuthenticated={isAuthenticated}
            hasGuestLinks={links.some(link => !link.has_user_id)}
          />
          <CreateButton isAuthenticated={isAuthenticated} />
        </div>
      </section>

      <div className="overflow-x-auto rounded-xl border-1.5 border-neutral-800/80 bg-neutral-950">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow className="bg-neutral-900" key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead className="h-14 px-4 text-sm text-neutral-300" key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? table.getRowModel().rows.map(row => (
              <TableRow className="h-16 data-[state=selected]:bg-neutral-900" key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map(cell => (
                  <TableCell className="px-4" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">No results.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 pt-6">
        <div className="flex-1 text-sm text-neutral-400">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <button className="cursor-pointer rounded-lg border-1.5 border-neutral-800 bg-neutral-950 p-2 disabled:cursor-auto disabled:opacity-50" onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()} aria-label="First page">
            <IconChevronsLeft className="size-5" />
          </button>
          <button className="cursor-pointer rounded-lg border-1.5 border-neutral-800 bg-neutral-950 p-2 disabled:cursor-auto disabled:opacity-50" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} aria-label="Previous page">
            <IconChevronLeft className="size-5" />
          </button>
          <button className="cursor-pointer rounded-lg border-1.5 border-neutral-800 bg-neutral-950 p-2 disabled:cursor-auto disabled:opacity-50" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} aria-label="Next page">
            <IconChevronRight className="size-5" />
          </button>
          <button className="cursor-pointer rounded-lg border-1.5 border-neutral-800 bg-neutral-950 p-2 disabled:cursor-auto disabled:opacity-50" onClick={() => table.lastPage()} disabled={!table.getCanNextPage()} aria-label="Last page">
            <IconChevronsRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
