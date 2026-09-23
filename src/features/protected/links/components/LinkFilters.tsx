"use client"

import { IconSearch } from "@tabler/icons-react"
import { Input } from "@/components/shadcn/input"

type LinkFilter = "all" | "protected" | "expired"

interface LinkFiltersProps {
  filter: LinkFilter
  search: string
  isAuthenticated: boolean
  onFilterChange: (filter: LinkFilter) => void
  onSearchChange: (search: string) => void
}

export function LinkFilters({
  filter,
  search,
  onFilterChange,
  onSearchChange,
}: LinkFiltersProps) {
  return (

    <div className="flex flex-wrap items-center gap-2">
      {(["all", "protected", "expired"] as const).map(option => (
        <button
          key={option}
          type="button"
          className={option === filter
            ? option === "all"
              ? "rounded-lg bg-neutral-800 px-3 py-2 text-sm font-medium text-neutral-100 ring-1 ring-neutral-500/20 transition"
              : option === "protected"
                ? "rounded-lg bg-blue-500/15 px-3 py-2 text-sm font-medium text-blue-200 ring-1 ring-blue-500/20 transition"
                : "rounded-lg bg-red-500/15 px-3 py-2 text-sm font-medium text-red-200 ring-1 ring-red-500/20 transition"
            : "rounded-lg px-3 py-2 text-sm font-medium text-neutral-400 transition hover:bg-neutral-800 hover:text-neutral-100"}
          onClick={() => onFilterChange(option)}
        >
          {option === "all" ? "All" : option === "protected" ? "Protected" : "Expired"}
        </button>
      ))}

      <div className="relative min-w-52 sm:ml-2 sm:w-64">
        <IconSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
        <Input
          value={search}
          onChange={event => onSearchChange(event.target.value)}
          placeholder="Search original URL"
          aria-label="Search by original URL"
          className="h-10 border-neutral-800 bg-neutral-900/70 pl-9 text-sm text-neutral-100 placeholder:text-neutral-500"
        />
      </div>
    </div>

  )
}
