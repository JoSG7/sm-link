import { NextResponse } from "next/server";

interface Props {

  params: Promise<{ shortUrl: string }>;

}

async function ShortURL( { params }: Props) {

  const { shortUrl } = await params

  return <p>{shortUrl}</p>

}

export default ShortURL

















