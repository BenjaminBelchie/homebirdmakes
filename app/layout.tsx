import {ClerkProvider} from "@clerk/nextjs";
import type { Metadata } from "next";
import Script from "next/script";
import Providers from "./providers";
import ConvexClientProvider from "../components/ConvexClientProvider";
import "../styles/globals.css";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from "../lib/site";
import { Montserrat, Merriweather } from "next/font/google";
import { cn } from "@/lib/utils";

const merriweatherHeading = Merriweather({subsets:['latin'],variable:'--font-heading'});

const montserrat = Montserrat({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  keywords: ["handmade home accessories", "home decor gifts", "Etsy handmade", "Homebird Makes"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_GB",
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} handmade home accessories`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [absoluteUrl("/twitter-image")],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
      },
      {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: absoluteUrl("/images/homebirdmakes_logo.png"),
        sameAs: [
          "https://www.facebook.com/homebirdmakes/",
          "https://www.instagram.com/homebird_makes/",
          "https://www.pinterest.co.uk/homebirdmakes/",
        ],
      },
    ],
  };

  return (
    <html lang="en" className={cn("font-sans", montserrat.variable, merriweatherHeading.variable)}>
      <body>
        <ClerkProvider>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
          <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <Script id="google-analytics" strategy="lazyOnload">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
          page_path: window.location.pathname,
          });
          `}
          </Script>
          <ConvexClientProvider>
            <Providers>{children}</Providers>
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}