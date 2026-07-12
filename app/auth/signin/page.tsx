import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { absoluteUrl, HIDE_AUTH_UI } from "../../../lib/site";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Homebird Makes account.",
  alternates: {
    canonical: "/auth/signin",
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Sign In | Homebird Makes",
    description: "Sign in to your Homebird Makes account.",
    url: absoluteUrl("/auth/signin"),
  },
};

export default function SignInPage() {
  if (HIDE_AUTH_UI) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-2">
      <SignIn path="/auth/signin" routing="path" signUpUrl="/auth/signup" forceRedirectUrl="/" />
    </div>
  );
}
