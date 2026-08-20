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
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight, IconCopy, IconPlus, IconSearch, IconSortDescending } from "@tabler/icons-react"
import { MoreHorizontal } from "lucide-react"
import { toast } from "sonner"
import { format, formatDistanceToNow } from "date-fns"
import { Checkbox } from "@/components/shadcn/checkbox"
import { Input } from "@/components/shadcn/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/table"
import { LinkDetails } from "@/types/global"

interface AdminLinksTableProps {
  links: LinkDetails[]
}

export function AdminLinksTable({ links }: AdminLinksTableProps) {
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
        <div className="max-w-96 overflow-x-hidden text-nowrap font-medium mask-r-from-90">
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
          <p className="text-sm text-neutral-300" title={format(date, "PPP 'at' HH:mm")}>
            {formatDistanceToNow(date, { addSuffix: true })}
          </p>
        )
      },
    },
    {
      accessorKey: "expires_at",
      header: "Expires at",
      cell: ({ row }) => {
        const expiresAt = row.getValue("expires_at") as string | null

        if (!expiresAt) {
          return <div className="w-max rounded-md border border-neutral-800 px-2 py-1 text-xs text-neutral-300">No expires</div>
        }

        return (
          <p className="flex w-max items-center justify-center gap-1 rounded-md border border-yellow-500/30 bg-yellow-500/20 px-2 py-1 text-xs text-yellow-300">
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

        return (
          <div className="flex gap-2 text-xs font-medium">
            <p className={hasPassword
              ? "rounded-md border border-blue-500/30 bg-blue-500/20 px-2 py-1 text-blue-400"
              : "rounded-md border border-green-500/30 bg-green-500/20 px-2 py-1 text-green-400"}
            >
              {hasPassword ? "Locked" : "Public"}
            </p>
            {isExpired && <p className="rounded-md border border-red-500/30 bg-red-500/20 px-2 py-1 text-red-400">Expired</p>}
          </div>
        )
      },
    },
    {
      id: "actions",
      header: "",
      enableHiding: false,
      cell: () => (
        <button type="button" className="rounded-md p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white" aria-label="Link actions">
          <MoreHorizontal className="size-5" />
        </button>
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
        <div className="flex flex-wrap items-center gap-2">
          {(["all", "protected", "expired"] as const).map(option => (
            <button
              key={option}
              type="button"
              className={option === filter
                ? "rounded-lg bg-neutral-100 px-3 py-2 text-sm font-medium text-neutral-950 transition"
                : "rounded-lg px-3 py-2 text-sm font-medium text-neutral-400 transition hover:bg-neutral-800 hover:text-neutral-100"}
              onClick={() => setFilter(option)}
            >
              {option === "all" ? "All" : option === "protected" ? "Protected" : "Expired"}
            </button>
          ))}

          <div className="relative min-w-52 sm:ml-2 sm:w-64">
            <IconSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
            <Input
              value={search}
              onChange={event => setSearch(event.target.value)}
              placeholder="Search original URL"
              aria-label="Search by original URL"
              className="h-10 border-neutral-800 bg-neutral-900/70 pl-9 text-sm text-neutral-100 placeholder:text-neutral-500"
            />
          </div>
        </div>

        <button
          type="button"
          className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-linear-to-r from-green-500 to-sky-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-sky-950/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-sky-900/30"
        >
          <IconPlus className="size-4" />
          Create Link
        </button>
      </section>

      <div className="overflow-hidden rounded-xl border-1.5 border-neutral-800/80 bg-neutral-950">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow className="bg-neutral-900 hover:bg-neutral-900" key={headerGroup.id}>
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
              <TableRow className="h-16" key={row.id} data-state={row.getIsSelected() && "selected"}>
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
