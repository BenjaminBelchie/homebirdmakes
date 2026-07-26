import { cache } from "react";
import flagsmith, { createFlagsmithInstance } from "@flagsmith/flagsmith/isomorphic";

export const initFlagsmith = cache(async () => {
  await flagsmith.init({
    environmentID: process.env.FLAGSMITH_SDK_KEY!,
  });
  return flagsmith;
});

/** Creates a fresh Flagsmith instance scoped to a specific identity so that
 *  per-identity flag overrides apply without mutating the shared singleton. */
export async function initFlagsmithForIdentity(identity: string) {
  const instance = createFlagsmithInstance();
  await instance.init({
    environmentID: process.env.FLAGSMITH_SDK_KEY!,
    identity,
  });
  return instance;
}
