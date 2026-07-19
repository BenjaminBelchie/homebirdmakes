"use client";

import { useConvexAuth } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/sign-in");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-slate-300 border-t-brand-info" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-2">
      <div className="w-full max-w-[480px] border border-slate-200 bg-white p-4 shadow-md sm:p-8">
        <div className="flex flex-col items-center gap-2">
          <img
            src={user.imageUrl}
            alt={user.fullName ?? "Profile picture"}
            className="h-20 w-20 rounded-full object-cover"
          />
          <h1 className="text-3xl">{user.fullName}</h1>
          <p className="text-sm text-slate-500">
            {user.primaryEmailAddress?.emailAddress}
          </p>
          <hr className="w-full border-slate-200" />
          <div className="w-full">
            <p className="mb-1 text-sm text-slate-500">
              User ID
            </p>
            <p className="break-all text-sm">
              {user.id}
            </p>
          </div>
          <div className="w-full">
            <p className="mb-1 text-sm text-slate-500">
              Account created
            </p>
            <p className="text-sm">
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
            </p>
          </div>
          <div className="w-full">
            <p className="mb-1 text-sm text-slate-500">
              Convex auth status
            </p>
            <p className="text-sm text-emerald-700">
              Authenticated ✓
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
