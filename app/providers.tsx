"use client";

import { Analytics } from "@vercel/analytics/react";

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <>
      {children}
      <Analytics />
    </>
  );
}
