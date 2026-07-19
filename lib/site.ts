export const SITE_NAME = "Homebird Makes";
export const SITE_DESCRIPTION = "Handmade home accessories and gifts by Homebird Makes, designed and crafted in Staffordshire.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://homebirdmakes.vercel.app";

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}
