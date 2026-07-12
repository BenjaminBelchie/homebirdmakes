import { SignUp } from "@clerk/nextjs";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { absoluteUrl, HIDE_AUTH_UI } from "../../../lib/site";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your Homebird Makes account.",
  alternates: {
    canonical: "/auth/signup",
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Sign Up | Homebird Makes",
    description: "Create your Homebird Makes account.",
    url: absoluteUrl("/auth/signup"),
  },
};

export default function SignUpPage() {
  if (HIDE_AUTH_UI) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-2">
      <SignUp path="/auth/signup" routing="path" signInUrl="/auth/signin" forceRedirectUrl="/" />
    </div>
  );
}
