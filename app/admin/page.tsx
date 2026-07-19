"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import {
  Sortable,
  SortableContent,
  SortableItem,
  SortableItemHandle,
  SortableOverlay,
} from "@/components/ui/sortable";
import {
  IconArrowLeft,
  IconGripVertical,
  IconPencil,
  IconPlus,
  IconTrash,
  IconExternalLink,
  IconPhoto,
  IconLink,
} from "@tabler/icons-react";
import { CollectionFormDialog } from "@/app/admin/_components/CollectionFormDialog";
import { LinkFormDialog } from "@/app/admin/_components/LinkFormDialog";
import type { Collection, LinkItem } from "@/app/admin/_components/types";

function PageContent() {
  const searchParams = useSearchParams();
  const activeSection = searchParams.get("section") ?? "collections";

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
    <div className="w-full px-6 py-6">
      <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <IconArrowLeft className="size-4" />
          Back to site
        </Link>
      </div>

      {activeSection === "collections" && (
        <section>
          <div className="mb-7 flex items-center justify-between">
            <h2 className="text-foreground text-lg font-semibold">Collections</h2>
            <Button size="sm" onClick={() => setCollectionDialog({ open: true })}>
              <IconPlus className="size-4" />
              Add Collection
            </Button>
          </div>

          {collections === undefined ? (
            <div className="flex flex-col gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded-xl" />
              ))}
            </div>
          ) : collections.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
              <IconPhoto className="size-10 text-muted-foreground/40" />
              <p className="text-muted-foreground text-sm">No collections yet.</p>
              <Button size="sm" onClick={() => setCollectionDialog({ open: true })}>
                <IconPlus className="size-4" /> Add your first collection
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {collections.map((col) => (
                <div
                  key={col.id}
                  className="border border-border rounded-xl p-4 flex items-center gap-4 bg-card hover:border-ring/50 transition-colors"
                >
                  <img
                    src={col.image}
                    alt={col.category}
                    className="h-14 w-14 rounded-lg object-cover shrink-0 border border-border"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-foreground font-medium text-sm">{col.category}</span>
                      {col.isFeatured && <Badge>Featured</Badge>}
                    </div>
                    <a
                      href={col.etsy_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 mt-0.5 w-fit transition-colors"
                    >
                      <IconExternalLink className="size-3" /> Etsy listing
                    </a>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Link href={`/collections/${col.category}`}>
                      <Badge variant="outline" className="text-xs cursor-pointer">View</Badge>
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
      )}

      {activeSection === "links" && (
        <section>
          <div className="mb-7 flex items-center justify-between">
            <h2 className="text-foreground text-lg font-semibold">Links</h2>
            <Button size="sm" onClick={() => setLinkDialog({ open: true })}>
              <IconPlus className="size-4" />
              Add Link
            </Button>
          </div>

          {links === undefined ? (
            <div className="flex flex-col gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full rounded-xl" />
              ))}
            </div>
          ) : localLinks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
              <IconLink className="size-10 text-muted-foreground/40" />
              <p className="text-muted-foreground text-sm">No links yet.</p>
              <Button size="sm" onClick={() => setLinkDialog({ open: true })}>
                <IconPlus className="size-4" /> Add your first link
              </Button>
            </div>
          ) : (
            <Sortable
              value={localLinks}
              onValueChange={handleLinksReorder}
              getItemValue={(item) => item.id}
            >
              <SortableContent className="flex flex-col gap-3">
                {localLinks.map((link) => (
                  <SortableItem
                    key={link.id}
                    value={link.id}
                    className="border border-border bg-card rounded-xl px-4 py-3 flex items-center gap-3 hover:border-ring/50 transition-colors"
                  >
                    <SortableItemHandle className="text-muted-foreground hover:text-foreground inline-flex size-8 items-center justify-center rounded-md cursor-grab">
                      <IconGripVertical className="size-4" />
                    </SortableItemHandle>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">{link.display_text}</div>
                      <a
                        href={link.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 mt-0.5 overflow-hidden transition-colors"
                      >
                        <IconExternalLink className="size-3 shrink-0" />
                        <span className="truncate">{link.link}</span>
                      </a>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
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
                    <div className="border border-ring bg-card rounded-xl px-4 py-3 flex items-center gap-3 shadow-lg">
                      <div className="text-muted-foreground inline-flex size-8 items-center justify-center">
                        <IconGripVertical className="size-4" />
                      </div>
                      <span className="text-foreground text-sm font-medium">{link.display_text}</span>
                    </div>
                  );
                }}
              </SortableOverlay>
            </Sortable>
          )}
        </section>
      )}

      </div>

      <CollectionFormDialog
        key={collectionDialog.item?.id ?? "new-collection"}
        open={collectionDialog.open}
        onOpenChange={(open) => setCollectionDialog((prev) => ({ ...prev, open }))}
        initial={collectionDialog.item}
      />
      <AlertDialog
        open={deletingCollection !== null}
        onOpenChange={(open) => { if (!open) setDeletingCollection(null); }}
      >
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete collection?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete &quot;{deletingCollection?.category}&quot;. This action cannot be undone.
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

      <LinkFormDialog
        key={linkDialog.item?.id ?? "new-link"}
        open={linkDialog.open}
        onOpenChange={(open) => setLinkDialog((prev) => ({ ...prev, open }))}
        initial={linkDialog.item}
      />
      <AlertDialog
        open={deletingLink !== null}
        onOpenChange={(open) => { if (!open) setDeletingLink(null); }}
      >
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete link?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete &quot;{deletingLink?.display_text}&quot;. This action cannot be undone.
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

export default function AdminPage() {
  return (
    <Suspense>
      <PageContent />
    </Suspense>
  );
}
