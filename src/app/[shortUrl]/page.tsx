import { PrismaClient } from "@prisma/client"
import { redirect } from "next/navigation"

interface Props {

  params: Promise<{ shortUrl: string }>;

}


async function ShortURL ({ params }: Props) {

  const { shortUrl } = await params

  console.log(shortUrl)
  



  // const prisma = new PrismaClient

  // const data = await prisma.link.findUnique({

  //   where: { short: shortUrl }

  // })

  // if(!data){

  //   return <p>NO encontrado</p>

  // }else{

  //   redirect(data.original)

  // }

}

export default ShortURL



















