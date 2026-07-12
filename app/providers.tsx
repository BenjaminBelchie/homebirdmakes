"use client";

import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <>
      {children}
      <Analytics />
      <Toaster />
    </>
  );
}
