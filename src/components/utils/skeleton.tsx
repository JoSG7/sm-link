import { Skeleton } from "@mui/material"

export function LinkSkeleton () {

  return(

    <section className="flex flex-col gap-1">

      <Skeleton variant="text" sx={{bgcolor: 'gray'}} width={150} height={30}/>

      <Skeleton variant="rounded" sx={{bgcolor: 'gray'}} height={50} />

      <div className="flex gap-4">

        <Skeleton variant="text" sx={{bgcolor: 'gray'}} width={100} height={30}/>
        <Skeleton variant="text" sx={{bgcolor: 'gray'}} width={100} height={30}/>
        <Skeleton variant="text" sx={{bgcolor: 'gray'}} width={100} height={30}/>

      </div>

    </section>

  )

}