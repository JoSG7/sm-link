"use client"

import { IconSearch } from "@tabler/icons-react"
import { Input } from "@/components/shadcn/input"
import { CreateButton } from "./CreateButton"

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
  isAuthenticated,
  onFilterChange,
  onSearchChange,
}: LinkFiltersProps) {
  return (
    <section className="mb-5 flex flex-col gap-3 rounded-2xl border border-neutral-800/80 bg-neutral-950 p-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        {(["all", "protected", "expired"] as const).map(option => (
          <button
            key={option}
            type="button"
            className={option === filter
              ? "rounded-lg bg-neutral-100 px-3 py-2 text-sm font-medium text-neutral-950 transition"
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

      <CreateButton isAuthenticated={isAuthenticated} />
    </section>
  )
}
