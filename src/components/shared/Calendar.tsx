"use client"

import { useState } from "react"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DateCalendar, LocalizationProvider, TimeClock } from '@mui/x-date-pickers'

export function ExpirationCalendar ({ onChange }: { onChange: (iso: string) => void }) {

  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState<Date | null>(null)

  const handleDateChange = (newDate: Date | null) => {
    setDate(newDate)
    if (newDate && time) {
      const combined = new Date(newDate)
      combined.setHours(time.getHours())
      combined.setMinutes(time.getMinutes())
      combined.setSeconds(0)
      onChange(combined.toISOString())
    }
  }

  const handleTimeChange = (newTime: Date | null) => {
    setTime(newTime)
    if (date && newTime) {
      const combined = new Date(date)
      combined.setHours(newTime.getHours())
      combined.setMinutes(newTime.getMinutes())
      combined.setSeconds(0)
      onChange(combined.toISOString())
    }
  }

  return(

    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="flex flex-col gap-4">
        <DateCalendar value={date} onChange={handleDateChange} 
        sx={{
          color: "white"
        }}/>
        <TimeClock value={time} onChange={handleTimeChange} />
      </div>
    </LocalizationProvider>

  )

}