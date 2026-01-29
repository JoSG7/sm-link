"use client"

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/features/shared/components/shadcn/select";



export function SearchSelect () {

  return (
    <Select>
      <SelectTrigger className="p-3 w-44 border-2 border-neutral-900 bg-neutral-900/50 ">
        <SelectValue placeholder="Select all by" />
      </SelectTrigger>
      <SelectContent className="bg-neutral-800 border-neutral-800 text-neutral-100 ">
        <SelectGroup>
          <SelectLabel>Select all by</SelectLabel>
          <SelectItem value="apple">Protected</SelectItem>
          <SelectItem value="banana">Expirations</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )

}