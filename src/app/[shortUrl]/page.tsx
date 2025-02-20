import { PrismaClient } from "@prisma/client"
import { redirect } from "next/navigation"

interface Params {

  shortUrl: string

}

async function ShortURL ({ params }: {params: Params}) {

  const { shortUrl } = params

  const prisma = new PrismaClient

  const data = await prisma.link.findUnique({

    where: { short: shortUrl }

  })

  if(!data){

    return <p>NO encontrado</p>

  }else{

    redirect(data.original)

  }

}

export default ShortURL



















