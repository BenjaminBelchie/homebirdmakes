import { SignInButton, SignOutButton } from "@clerk/nextjs";
import type { Metadata } from "next";
import { absoluteUrl } from "../../../lib/site";

export const metadata: Metadata = {
  title: "Sign Out",
  description: "Manage sign out for your Homebird Makes account.",
  alternates: {
    canonical: "/auth/signout",
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Sign Out | Homebird Makes",
    description: "Manage sign out for your Homebird Makes account.",
    url: absoluteUrl("/auth/signout"),
  },
};

export default function SignOutPage() {
  return (
    <div className="min-h-screen bg-[length:100%]">
      <div className="flex h-screen items-center justify-center">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-md sm:p-8">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-4xl">Signout</h1>
            <p className="text-2xl">Manage your session using the actions below.</p>
            <SignOutButton redirectUrl="/">
              <button className="rounded border border-brand-info bg-white px-4 py-2 text-brand-info transition-colors hover:bg-slate-50" type="button">
                Sign out
              </button>
            </SignOutButton>
            <SignInButton mode="redirect" forceRedirectUrl="/">
              <button className="rounded border border-brand-info bg-white px-4 py-2 text-brand-info transition-colors hover:bg-slate-50" type="button">
                Sign in
              </button>
            </SignInButton>
          </div>
        </div>
      </div>
    </div>
  );
}
