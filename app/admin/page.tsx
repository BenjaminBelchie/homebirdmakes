"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function AdminPage() {
  const collections = useQuery(api.collections.list);
  const links = useQuery(api.links.list);

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-6 md:py-12">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Admin</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-foreground text-2xl font-bold tracking-tight">Admin</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage your Homebird Makes content</p>
        </div>

        {/* Collections */}
        <section className="mb-10">
          <h2 className="text-foreground mb-4 text-lg font-semibold">Collections</h2>
          {collections === undefined ? (
            <div className="flex flex-col gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-md" />
              ))}
            </div>
          ) : collections.length === 0 ? (
            <p className="text-muted-foreground text-sm">No collections yet.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {collections.map((col) => (
                <div
                  key={col.id}
                  className="border-border flex items-center justify-between rounded-md border px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={col.image}
                      alt={col.category}
                      className="h-10 w-10 rounded object-cover"
                    />
                    <span className="text-foreground text-sm font-medium">{col.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={col.etsy_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground text-xs transition-colors"
                    >
                      Etsy ↗
                    </a>
                    <Link href={`/collections/${col.category}`}>
                      <Badge variant="secondary">View</Badge>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <Separator className="mb-10" />

        {/* Links */}
        <section>
          <h2 className="text-foreground mb-4 text-lg font-semibold">Links</h2>
          {links === undefined ? (
            <div className="flex flex-col gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-md" />
              ))}
            </div>
          ) : links.length === 0 ? (
            <p className="text-muted-foreground text-sm">No links yet.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <div
                  key={link.id}
                  className="border-border flex items-center justify-between rounded-md border px-4 py-3"
                >
                  <span className="text-foreground text-sm font-medium">{link.display_text}</span>
                  <a
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground text-xs transition-colors"
                  >
                    {link.link} ↗
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
