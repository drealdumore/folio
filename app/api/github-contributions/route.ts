import { NextResponse } from "next/server";

export const revalidate = 43200; // 12h

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username") ?? "drealdumore";

  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { next: { revalidate: 43200 } }
    );
    if (!res.ok) return NextResponse.json(null, { status: 502 });
    const data = await res.json();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=43200, stale-while-revalidate=86400" },
    });
  } catch {
    return NextResponse.json(null, { status: 502 });
  }
}
