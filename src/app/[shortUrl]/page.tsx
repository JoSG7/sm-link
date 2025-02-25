import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

interface Props {

  params: Promise<{ shortUrl: string }>;

}

async function ShortURL( { params }: Props) {

  const { shortUrl } = await params

  const prisma = new PrismaClient()

  const link = await prisma.link.findUnique({

    where: {short: shortUrl}

  })

  if(!link){

    return <p>NO hay</p>

  }else{

    return <p>SISI</p>

  }

}

export default ShortURL

















