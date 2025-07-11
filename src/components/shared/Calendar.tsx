"use client"

import { useState } from "react"
import { DayPicker } from 'react-day-picker'
import "react-day-picker/style.css";


export function ExpirationCalendar({ onChange }: { onChange: (iso: Date | undefined) => void }) {

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  // const [time, setTime] = useState<Date | null>(null)

  const handleSelected = (newDay: Date) => {
    setSelectedDate(newDay)
    onChange(selectedDate)
  }

  return (
    <div className="scale-90 flex justify-center lg-2:scale-100">
      <DayPicker mode="single" disabled={{ before: new Date() }} animate required selected={selectedDate}
      onSelect={handleSelected}
      classNames={{
        today: "text-sky-500",
        selected: "bg-sky-500 rounded-full duration-500",
      }} />
    </div>
  )

}