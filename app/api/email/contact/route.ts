import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: "homebirdmakes.website@gmail.com",
      pass: process.env.GMAIL_SMTP_PASSWORD,
    },
    secure: true,
  });

  const mailData = {
    from: "homebirdmakes.websote@gmail.com",
    to: "alibelcher@aol.com",
    subject: `Message From ${body.name}`,
    text: `${body.message} | Sent from: ${body.email}`,
    html: `<div>${body.message}</div><p>Sent from: ${body.email}</p>`,
  };

  try {
    await transporter.sendMail(mailData);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
