"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Sortable,
  SortableContent,
  SortableItem,
  SortableItemHandle,
  SortableOverlay,
} from "@/components/ui/sortable";
import { IconGripVertical, IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { CollectionFormDialog } from "./_components/CollectionFormDialog";
import { LinkFormDialog } from "./_components/LinkFormDialog";
import type { Collection, LinkItem } from "./_components/types";

export default function AdminPage() {
  const collections = useQuery(api.collections.list);
  const links = useQuery(api.links.list);

  const removeCollection = useMutation(api.collections.remove);
  const removeLink = useMutation(api.links.remove);
  const reorderLinks = useMutation(api.links.reorder);

  const [localLinks, setLocalLinks] = useState<LinkItem[]>([]);
  useEffect(() => {
    if (links !== undefined) setLocalLinks(links);
  }, [links]);

  function handleLinksReorder(newOrder: LinkItem[]) {
    setLocalLinks(newOrder);
    void reorderLinks({ ids: newOrder.map((l) => l.id) });
  }

  const [collectionDialog, setCollectionDialog] = useState<{ open: boolean; item?: Collection }>({
    open: false,
  });
  const [deletingCollection, setDeletingCollection] = useState<Collection | null>(null);

  const [linkDialog, setLinkDialog] = useState<{ open: boolean; item?: LinkItem }>({
    open: false,
  });
  const [deletingLink, setDeletingLink] = useState<LinkItem | null>(null);

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
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-foreground text-lg font-semibold">Collections</h2>
            <Button size="sm" onClick={() => setCollectionDialog({ open: true })}>
              <IconPlus className="size-4" />
              Add Collection
            </Button>
          </div>
          {collections === undefined ? (
            <div className="flex flex-col gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full rounded-md" />
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
                  <div className="flex items-center gap-1">
                    {col.isFeatured && <Badge>Featured</Badge>}
                    <a
                      href={col.etsy_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground mr-2 text-xs transition-colors"
                    >
                      Etsy ↗
                    </a>
                    <Link href={`/collections/${col.category}`}>
                      <Badge variant="secondary">View</Badge>
                    </Link>
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      onClick={() => setCollectionDialog({ open: true, item: col })}
                    >
                      <IconPencil className="size-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => setDeletingCollection(col)}
                    >
                      <IconTrash className="size-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <Separator className="mb-10" />

        {/* Links */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-foreground text-lg font-semibold">Links</h2>
            <Button size="sm" onClick={() => setLinkDialog({ open: true })}>
              <IconPlus className="size-4" />
              Add Link
            </Button>
          </div>
          {links === undefined ? (
            <div className="flex flex-col gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-md" />
              ))}
            </div>
          ) : localLinks.length === 0 ? (
            <p className="text-muted-foreground text-sm">No links yet.</p>
          ) : (
            <Sortable
              value={localLinks}
              onValueChange={handleLinksReorder}
              getItemValue={(item) => item.id}
            >
              <SortableContent className="flex flex-col gap-2">
                {localLinks.map((link) => (
                  <SortableItem
                    key={link.id}
                    value={link.id}
                    className="border-border bg-background flex items-center justify-between rounded-md border px-4 py-3"
                  >
                    <div className="flex items-center gap-1">
                      <SortableItemHandle className="text-muted-foreground hover:text-foreground inline-flex size-8 items-center justify-center rounded-md">
                        <IconGripVertical className="size-4" />
                      </SortableItemHandle>
                      <span className="text-foreground text-sm font-medium">{link.display_text}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <a
                        href={link.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground mr-2 text-xs transition-colors"
                      >
                        {link.link} ↗
                      </a>
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        onClick={() => setLinkDialog({ open: true, item: link })}
                      >
                        <IconPencil className="size-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setDeletingLink(link)}
                      >
                        <IconTrash className="size-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </SortableItem>
                ))}
              </SortableContent>
              <SortableOverlay>
                {({ value: activeId }) => {
                  const link = localLinks.find((l) => l.id === (activeId as typeof l.id));
                  if (!link) return null;
                  return (
                    <div className="border-border bg-background flex items-center justify-between rounded-md border px-4 py-3 shadow-lg">
                      <div className="flex items-center gap-1">
                        <div className="text-muted-foreground inline-flex size-8 items-center justify-center rounded-md">
                          <IconGripVertical className="size-4" />
                        </div>
                        <span className="text-foreground text-sm font-medium">{link.display_text}</span>
                      </div>
                      <a
                        href={link.link}
                        className="text-muted-foreground mr-2 text-xs"
                      >
                        {link.link} ↗
                      </a>
                    </div>
                  );
                }}
              </SortableOverlay>
            </Sortable>
          )}
        </section>
      </div>

      {/* Collection form dialog — keyed so state resets when switching items */}
      <CollectionFormDialog
        key={collectionDialog.item?.id ?? "new-collection"}
        open={collectionDialog.open}
        onOpenChange={(open) => setCollectionDialog((prev) => ({ ...prev, open }))}
        initial={collectionDialog.item}
      />

      {/* Delete collection confirmation */}
      <AlertDialog
        open={deletingCollection !== null}
        onOpenChange={(open) => {
          if (!open) setDeletingCollection(null);
        }}
      >
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete collection?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete &quot;{deletingCollection?.category}&quot;. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={async () => {
                if (deletingCollection) {
                  await removeCollection({ id: deletingCollection.id });
                  setDeletingCollection(null);
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Link form dialog — keyed so state resets when switching items */}
      <LinkFormDialog
        key={linkDialog.item?.id ?? "new-link"}
        open={linkDialog.open}
        onOpenChange={(open) => setLinkDialog((prev) => ({ ...prev, open }))}
        initial={linkDialog.item}
      />

      {/* Delete link confirmation */}
      <AlertDialog
        open={deletingLink !== null}
        onOpenChange={(open) => {
          if (!open) setDeletingLink(null);
        }}
      >
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete link?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete &quot;{deletingLink?.display_text}&quot;. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={async () => {
                if (deletingLink) {
                  await removeLink({ id: deletingLink.id });
                  setDeletingLink(null);
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
