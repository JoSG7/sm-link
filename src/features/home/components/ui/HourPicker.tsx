"use client"

export function ExpirationHour({ onChange }: { onChange: (hour: string) => void }) {

  return (

    <div className="rounded-lg border border-neutral-800 p-3">
      <input type="time" className="text-white text-sm bg-transparent" onChange={(e) => {
        onChange(e.currentTarget.value)
      }} />
    </div>

  )

}