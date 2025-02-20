import { PrismaClient } from "@prisma/client"
import { redirect } from "next/navigation"

async function ShortURL ({ params }) {

  const { shortUrl } = await params

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



















