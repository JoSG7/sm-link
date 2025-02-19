import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: Request | NextRequest){

  const prisma = new PrismaClient()

  const shortLink = Math.random().toString(36).substring(2, 9)

  const { guessID, originalLink }: {guessID: string, originalLink: string} = await request.json()

  try {
    
    // await prisma.link.create({

    //   data: {

    //     original: originalLink,
    //     short: shortLink,
    //     guess_id: guessID

    //   }

    // })

    const data = await prisma.link.findMany()

    return NextResponse.json(data)

  } catch (error) {

    return NextResponse.json(error)
    
  }

  

}