import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "../../../components/PageHeader";
import Footer from "../../../components/Footer";
import CartClearer from "./_components/CartClearer";
import { IconCircleCheckFilled } from "@tabler/icons-react";

export const metadata: Metadata = { title: "Order confirmed" };

export default function StoreSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PageHeader />
      <CartClearer />

      <section className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <IconCircleCheckFilled size={48} className="text-primary" />
        <h1 className="mt-4 text-2xl font-medium">Order confirmed!</h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Thank you for your order. You'll receive a confirmation email shortly.
        </p>
        <Link
          href="/store"
          className="mt-8 inline-block rounded-[var(--radius)] bg-primary px-8 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90"
        >
          Continue shopping
        </Link>
      </section>

      <Footer />
    </div>
  );
}
