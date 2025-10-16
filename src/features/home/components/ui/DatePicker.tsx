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
        <Button className="w-full py-3 px-4 justify-start text-sm-movil rounded-lg border border-neutral-800 bg-neutral-950"
        size="custom">
          <CalendarIcon className="mr-2 size-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
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


// "use client"

// import { useState } from "react"
// import { DayPicker } from 'react-day-picker'
// import "react-day-picker/style.css";


// export function ExpirationCalendar({ onChange }: { onChange: (iso: Date | undefined) => void }) {

//   const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

//   const handleSelected = (newDay: Date) => {
//     setSelectedDate(newDay)
//     onChange(newDay)
//   }

//   return (
//     <div className="flex justify-center">
//       <DayPicker mode="single" disabled={{ before: new Date() }} animate required selected={selectedDate}
//       className="scale-90 xs:scale-100 sm:scale-110 md:scale-110"
//       onSelect={handleSelected}
//       classNames={{
//         today: "text-sky-500",
//         selected: "bg-sky-500 rounded-full duration-500 text-white",
//       }} />
//     </div>
//   )

// }