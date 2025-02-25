import { NextRequest, NextResponse } from "next/server"

export async function POST(request: Request | NextRequest){

  // const shortLink = Math.random().toString(36).substring(2, 9)

  // const { guessID, originalLink }: {guessID: string, originalLink: string} = await request.json()

  // try {

  //   const alredyExist = await prisma.link.findFirst({
  //     where: {
  //       AND: [
  //         { guess_id: guessID },
  //         { original: originalLink }
  //       ]
  //     }
  //   })

  //   if(alredyExist){

  //     return NextResponse.json({ error: "Ya tienes una version corta de este link!" })

  //   }else{

  //     await prisma.link.create({

  //       data: {
  
  //         original: originalLink,
  //         short: shortLink,
  //         guess_id: guessID
  
  //       }
  
  //     })

  //     return NextResponse.json(shortLink)

  //   }

  // } catch (error) {

  //   return NextResponse.json(error)
    
  // }

}