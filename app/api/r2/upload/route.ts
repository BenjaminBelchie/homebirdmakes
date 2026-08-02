import { auth } from "@clerk/nextjs/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2, R2_BUCKET, R2_PUBLIC_URL } from "@/lib/r2";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { sessionClaims } = await auth();
  if (sessionClaims?.metadata?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "file is required" }, { status: 400 });
  }

  // Sanitise the filename to prevent path traversal
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const folder = (formData.get("folder") as string | null) ?? "uploads";
  const key = `${folder}/${Date.now()}-${safeName}`;

  const buffer = await file.arrayBuffer();

  await r2.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      Body: Buffer.from(buffer),
      ContentType: file.type,
    })
  );

  return NextResponse.json({ publicUrl: `${R2_PUBLIC_URL}/${key}` });
}
