"use client"

import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/popover";
import { Button } from "@/components/shadcn/button";
import { Calendar } from "@/components/shadcn/calendar";


export function DatePicker({ value, onChange }: { value?: Date; onChange?: (date: Date) => void }) {
  const [date, setDate] = useState<Date | undefined>(value)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-full py-3 px-4 justify-start text-sm rounded-lg border border-neutral-800 bg-neutral-950"
          size="custom">

          <CalendarIcon className="size-4 " />
          {date ? format(date, "PPP") : <span>Pick a date</span>}

        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 ">

        <Calendar className=""
          mode="single"
          selected={date}
          onSelect={(d) => {
            setDate(d)
            onChange?.(d!)
          }}
          disabled={{ before: new Date() }}
        />
        
      </PopoverContent>
    </Popover>
  )
}

