import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import { absoluteUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Homebird Makes for handmade home accessories, commissions, and enquiries.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Homebird Makes",
    description: "Contact Homebird Makes for handmade home accessories, commissions, and enquiries.",
    url: absoluteUrl("/contact"),
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
