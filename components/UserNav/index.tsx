"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { IconUser } from "@tabler/icons-react";

export default function UserNav() {
  const { isSignedIn, user } = useUser();

  if (isSignedIn) {
    return (
      <Link
        href="/profile"
        aria-label={`Account: ${user.fullName ?? "Profile"}`}
        className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
      >
        {user.imageUrl ? (
          <img
            src={user.imageUrl}
            alt={user.fullName ?? "Profile"}
            style={{ height: 18, width: 18 }}
            className="rounded-full object-cover shrink-0"
          />
        ) : (
          <IconUser size={18} />
        )}
      </Link>
    );
  }

  return (
    <Link
      href="/sign-in"
      aria-label="Sign in"
      className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
    >
      <IconUser size={18} />
    </Link>
  );
}
