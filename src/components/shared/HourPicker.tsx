"use client"

export function ExpirationHour({ onChange }: { onChange: (hour: string) => void }) {

  return (

    <div className="rounded-lg border border-[#1c1d1d] p-3 ">
      <input type="time" className="text-white text-sm bg-transparent " onChange={(e) => {
        onChange(e.currentTarget.value)
      }} />
    </div>

  )

}