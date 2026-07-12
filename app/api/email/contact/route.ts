import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!convexUrl) {
    return NextResponse.json({ success: false }, { status: 500 });
  }

  const body = await req.json();
  const client = new ConvexHttpClient(convexUrl);

  try {
    await client.mutation(api.resend.sendContactEmail, {
      name: String(body?.name ?? ""),
      email: String(body?.email ?? ""),
      phone: body?.phone ? String(body.phone) : undefined,
      message: String(body?.message ?? ""),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact email send failed", error);
    const message = error instanceof Error ? error.message : "Failed to send contact email";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
