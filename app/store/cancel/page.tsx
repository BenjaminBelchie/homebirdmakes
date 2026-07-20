import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "../../../components/PageHeader";
import Footer from "../../../components/Footer";
import { IconShoppingBag } from "@tabler/icons-react";

export const metadata: Metadata = { title: "Checkout cancelled" };

export default function StoreCancelPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PageHeader />

      <section className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <IconShoppingBag size={48} strokeWidth={1.25} className="text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-medium">Checkout cancelled</h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          No worries — your bag has been saved. Come back whenever you're ready.
        </p>
        <Link
          href="/store"
          className="mt-8 inline-block rounded-[var(--radius)] bg-primary px-8 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90"
        >
          Back to shop
        </Link>
      </section>

      <Footer />
    </div>
  );
}
