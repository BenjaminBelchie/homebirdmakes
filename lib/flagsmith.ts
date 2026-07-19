import { cache } from "react";
import flagsmith from "@flagsmith/flagsmith/isomorphic";

export const initFlagsmith = cache(async () => {
  await flagsmith.init({
    environmentID: process.env.FLAGSMITH_SDK_KEY!,
  });
  return flagsmith;
});
