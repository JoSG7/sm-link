import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Props {

  params: Promise<{ shortUrl: string }>;

}

async function ShortURL( { params }: Props) {

  const { shortUrl } = await params

  const link = await prisma.link.findFirst({

    where: { short: shortUrl }

  })

  return NextResponse.json(link)

}

export default ShortURL

















