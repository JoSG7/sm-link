import { NextRequest, NextResponse } from "next/server";

interface Props {

  params: Promise<{ shortUrl: string }>;

}

export async function GET(request: NextRequest, { params }: Props) {

  const { shortUrl } = await params

  return NextResponse.json(shortUrl)



}





















