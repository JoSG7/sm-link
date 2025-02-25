import { PrismaClient } from "@prisma/client"
import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server";

interface Props {

  params: Promise<{ shortUrl: string }>;

}

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: Props) {

  const { shortUrl } = await params

  return NextResponse.json(shortUrl)

}





















