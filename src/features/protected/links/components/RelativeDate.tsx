import { format, formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";



export function RelativeDate({ date }: { date: Date }) {

  const [relative, setRelative] = useState<string | null>(null)

  useEffect(() => {
    setRelative(formatDistanceToNow(date, { addSuffix: true }))
  }, [date])

  return (

    <p className="text-sm text-neutral-300" title={format(date, "PPP 'at' HH:mm")}>
      {relative}
    </p>

  )

}