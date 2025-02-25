import { NextResponse } from "next/server";

interface Props {

  params: Promise<{ shortUrl: string }>;

}

async function ShortURL( { params }: Props) {

  const { shortUrl } = await params

  return NextResponse.json(shortUrl)

}

export default ShortURL

















