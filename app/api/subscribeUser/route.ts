import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const datacenter = process.env.MAILCHIMP_API_SERVER;

  try {
    const response = await axios.post(
      `https://${datacenter}.api.mailchimp.com/3.0/lists/${audienceId}/members`,
      {
        email_address: email,
        status: "subscribed",
      },
      {
        headers: {
          Authorization: `apikey ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return NextResponse.json({ status: 200 });
    }

    return NextResponse.json({ status: 400 });
  } catch (error: any) {
    return NextResponse.json({ status: 400, data: error?.response?.data ?? null });
  }
}
