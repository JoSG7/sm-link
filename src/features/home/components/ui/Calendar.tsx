"use client"

import { useState } from "react"
import { DayPicker } from 'react-day-picker'
import "react-day-picker/style.css";


export function ExpirationCalendar({ onChange }: { onChange: (iso: Date | undefined) => void }) {

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const handleSelected = (newDay: Date) => {
    setSelectedDate(newDay)
    onChange(newDay)
  }

  return (
    <div className="flex justify-center">
      <DayPicker mode="single" disabled={{ before: new Date() }} animate required selected={selectedDate}
      className="scale-90 xs:scale-100 sm:scale-110 md:scale-110"
      onSelect={handleSelected}
      classNames={{
        today: "text-sky-500",
        selected: "bg-sky-500 rounded-full duration-500 text-white",
      }} />
    </div>
  )

}