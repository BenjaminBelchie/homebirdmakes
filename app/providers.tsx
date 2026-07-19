"use client";

import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";
import { FlagsmithProvider } from "@flagsmith/flagsmith/react";
import { IState } from "@flagsmith/flagsmith/types";
import { createFlagsmithInstance } from "@flagsmith/flagsmith/isomorphic";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  serverState: IState;
};

export default function Providers({ children, serverState }: Props ){
    const flagsmithInstance = useRef(createFlagsmithInstance());

  return (
    <>
      <FlagsmithProvider flagsmith={flagsmithInstance.current} serverState={serverState}>
      <>{children}</>
    </FlagsmithProvider>
      <Analytics />
      <Toaster />
    </>
  );
}
