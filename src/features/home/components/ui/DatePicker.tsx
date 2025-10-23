"use client"

import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn-components/popover";
import { Button } from "@/shadcn-components/button";
import { Calendar } from "@/shadcn-components/calendar";
import { useState } from "react";


export function DatePicker({ value, onChange }: { value?: Date; onChange?: (date: Date) => void }) {
  const [date, setDate] = useState<Date | undefined>(value)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-full py-3 px-4 justify-start text-sm-movil rounded-lg border border-neutral-800 bg-neutral-950
        xs:gap-3
        sm:py-4 sm:px-5 sm:gap-4 sm:text-xl-tablet
        md:gap-5
        lg:p-3 lg:px-4 lg:gap-2 lg:text-lg-desktop
        2xl:p-4 2xl:px-5 2xl:gap-3
        3xl:p-5 3xl:px-6 3xl:gap-4
        4xl:p-7 4xl:px-7 4xl:gap-6"
          size="custom">

          <CalendarIcon className="size-4 xs:size-5 sm:size-6 md:size-7 
          lg:size-5 2xl:size-6 3xl:size-7 4xl:size-9" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}

        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 
      sm:scale-110 md:scale-125 lg:scale-95 
      2xl:scale-[115%] 3xl:scale-125 
      4xl:scale-[170%] ">

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

