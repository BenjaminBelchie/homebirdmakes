import Link from "next/link";
import type { Metadata } from "next";
import { IconArrowLeft } from "@tabler/icons-react";
import { ProductForm } from "@/app/admin/_components/ProductForm";

export const metadata: Metadata = { title: "Add Product" };

export default function NewProductPage() {
  return (
    <div className="w-full px-6 py-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <Link
            href="/admin?section=products"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <IconArrowLeft className="size-4" />
            Back to products
          </Link>
        </div>
        <h1 className="mb-8 text-lg font-semibold">Add Product</h1>
        <ProductForm />
      </div>
    </div>
  );
}
