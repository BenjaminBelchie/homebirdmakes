"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Sortable,
  SortableContent,
  SortableItem,
  SortableItemHandle,
  SortableOverlay,
} from "@/components/ui/sortable";
import { IconPhoto, IconPlus, IconX } from "@tabler/icons-react";
import { createProduct, updateProduct } from "@/app/admin/productActions";
import type { AdminProduct } from "@/app/admin/productActions";

type ImageEntry =
  | { type: "existing"; url: string }
  | { type: "pending"; file: File; previewUrl: string };

function getImageUrl(entry: ImageEntry): string {
  return entry.type === "existing" ? entry.url : entry.previewUrl;
}

function fieldErrors(errors: unknown[]) {
  return errors.map((e) => ({ message: String(e) }));
}

function penceToGBP(pence: number): string {
  return (pence / 100).toFixed(2);
}

function gbpToPence(gbp: string): number | null {
  const n = parseFloat(gbp);
  if (isNaN(n) || n <= 0) return null;
  return Math.round(n * 100);
}

function toSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function ProductForm({ initial }: { initial?: AdminProduct }) {
  const router = useRouter();

  // Unified ordered image list — preserves order for drag-to-reorder
  const [images, setImages] = useState<ImageEntry[]>(
    (initial?.images ?? []).map((url) => ({ type: "existing" as const, url }))
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalImages = images.length;
  const canAddMore = totalImages < 8;

  function handleFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const remaining = 8 - totalImages;
    const toAdd = files.slice(0, remaining);
    setImages((prev) => [
      ...prev,
      ...toAdd.map((file) => ({
        type: "pending" as const,
        file,
        previewUrl: URL.createObjectURL(file),
      })),
    ]);
    e.target.value = "";
  }

  function removeByIndex(index: number) {
    setImages((prev) => {
      const entry = prev[index];
      if (entry.type === "pending") URL.revokeObjectURL(entry.previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  }

  const form = useForm({
    defaultValues: {
      name: initial?.name ?? "",
      description: initial?.description ?? "",
      priceGBP: initial?.priceInPence != null ? penceToGBP(initial.priceInPence) : "",
      featured: initial?.featured ?? false,
      slug: initial?.slug ?? "",
    },
    onSubmit: async ({ value }) => {
      const priceInPence = gbpToPence(value.priceGBP);
      if (!priceInPence) return;

      // Upload all pending files to R2 (preserving their position in the ordered list)
      const pendingUploads = new Map<File, string>(); // file → public URL
      for (const img of images) {
        if (img.type === "pending") {
          const form = new FormData();
          form.append("file", img.file);
          form.append("folder", "products");
          const res = await fetch("/api/r2/upload", { method: "POST", body: form });
          if (!res.ok) throw new Error("Failed to upload image");
          const { publicUrl } = await res.json() as { publicUrl: string };
          pendingUploads.set(img.file, publicUrl);
        }
      }

      const orderedImages = images.map((img) =>
        img.type === "existing"
          ? { type: "existing" as const, url: img.url }
          : { type: "new" as const, url: pendingUploads.get(img.file)! }
      );

      if (initial) {
        await updateProduct({
          stripeProductId: initial.stripeProductId,
          convexId: initial.convexId,
          name: value.name,
          description: value.description,
          priceInPence,
          currentPriceInPence: initial.priceInPence,
          currentPriceId: initial.priceId,
          orderedImages,
          featured: value.featured,
          displayOrder: initial?.displayOrder ?? 0,
          slug: value.slug || undefined,
        });
      } else {
        await createProduct({
          name: value.name,
          description: value.description,
          priceInPence,
          orderedImages: orderedImages as Array<{ type: "new"; url: string }>,
          featured: value.featured,
          displayOrder: 0,
          slug: value.slug || undefined,
        });
      }

      router.push("/admin?section=products");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex flex-col gap-6"
    >
      {/* Images — outside Field to avoid *:w-full interfering with thumbnail sizing */}
      <div className="flex flex-col gap-1.5">
        <p className="text-sm leading-none font-medium">
          Images{" "}
          <span className="text-muted-foreground font-normal">(up to 8)</span>
        </p>

        {/* Main preview — fixed height, always the same size */}
        <div className="h-64 w-full shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
          {totalImages === 0 ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-muted-foreground hover:text-foreground flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-border rounded-lg transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <IconPhoto className="size-7" />
              <span className="text-sm">Click to add images</span>
            </button>
          ) : (
            <img
              src={getImageUrl(images[0])}
              alt=""
              className="h-full w-full object-cover"
            />
          )}
        </div>

        {/* Sortable thumbnail strip */}
        {totalImages > 0 && (
          <Sortable<ImageEntry>
            value={images}
            onValueChange={setImages}
            getItemValue={(img: ImageEntry) => getImageUrl(img)}
            orientation="horizontal"
          >
            <SortableContent className="flex flex-row gap-2 overflow-x-auto pt-2 pb-1">
              {images.map((img, index) => {
                const url = getImageUrl(img);
                return (
                  <SortableItem
                    key={url}
                    value={url}
                    className="relative data-[dragging]:opacity-40 transition-opacity"
                    style={{ flexShrink: 0, width: 56, height: 56 }}
                  >
                    <SortableItemHandle asChild>
                      <div className="h-full w-full overflow-hidden rounded-md cursor-grab active:cursor-grabbing">
                        <img src={url} alt="" className="h-full w-full object-cover" />
                        {index === 0 && (
                          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-primary/80 py-0.5 text-center text-[9px] leading-none text-primary-foreground">
                            Primary
                          </div>
                        )}
                      </div>
                    </SortableItemHandle>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); removeByIndex(index); }}
                      className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-sm transition-opacity hover:opacity-80"
                      aria-label="Remove image"
                    >
                      <IconX className="size-2.5" />
                    </button>
                  </SortableItem>
                );
              })}
              {canAddMore && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  style={{ flexShrink: 0, width: 56, height: 56 }}
                  className="border-border text-muted-foreground hover:text-foreground flex cursor-pointer items-center justify-center rounded-md border border-dashed transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Add more images"
                >
                  <IconPlus className="size-5" />
                </button>
              )}
            </SortableContent>
            <SortableOverlay>
              {({ value: activeUrl }) => {
                const img = images.find((img) => getImageUrl(img) === activeUrl);
                if (!img) return null;
                return (
                  <div
                    className="overflow-hidden rounded-md border-2 border-primary shadow-lg"
                    style={{ width: 56, height: 56 }}
                  >
                    <img src={getImageUrl(img)} alt="" className="h-full w-full object-cover" />
                  </div>
                );
              }}
            </SortableOverlay>
          </Sortable>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFilesChange}
        />
      </div>

      <FieldGroup className="gap-5">
        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) => (!value.trim() ? "Name is required" : undefined),
            onSubmit: ({ value }) => (!value.trim() ? "Name is required" : undefined),
          }}
        >
          {(field) => (
            <Field data-invalid={field.state.meta.errors.length > 0}>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>
              <Input
                id={field.name}
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                  form.setFieldValue("slug", toSlug(e.target.value));
                }}
                onBlur={field.handleBlur}
                aria-invalid={field.state.meta.errors.length > 0}
              />
              <FieldError errors={fieldErrors(field.state.meta.errors)} />
            </Field>
          )}
        </form.Field>

        <form.Field name="description">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Description</FieldLabel>
              <Textarea
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                rows={4}
              />
            </Field>
          )}
        </form.Field>

        <form.Field
          name="priceGBP"
          validators={{
            onChange: ({ value }) => {
              if (!value.trim()) return "Price is required";
              const n = parseFloat(value);
              if (isNaN(n) || n <= 0) return "Enter a valid price greater than 0";
              return undefined;
            },
            onSubmit: ({ value }) => {
              if (!value.trim()) return "Price is required";
              const n = parseFloat(value);
              if (isNaN(n) || n <= 0) return "Enter a valid price greater than 0";
              return undefined;
            },
          }}
        >
          {(field) => (
            <Field data-invalid={field.state.meta.errors.length > 0}>
              <FieldLabel htmlFor={field.name}>Price (GBP)</FieldLabel>
              <div className="relative">
                <span className="text-muted-foreground absolute inset-y-0 left-3 flex items-center text-sm select-none">
                  £
                </span>
                <Input
                  id={field.name}
                  className="pl-7"
                  placeholder="0.00"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={field.state.meta.errors.length > 0}
                  inputMode="decimal"
                />
              </div>
              <FieldError errors={fieldErrors(field.state.meta.errors)} />
            </Field>
          )}
        </form.Field>

        <form.Field name="featured">
          {(field) => (
            <div className="flex items-center gap-2">
              <Checkbox
                id={field.name}
                checked={field.state.value}
                onCheckedChange={(checked) => field.handleChange(!!checked)}
              />
              <label htmlFor={field.name} className="text-sm font-medium leading-none cursor-pointer">
                Featured product
              </label>
            </div>
          )}
        </form.Field>
      </FieldGroup>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={!form.state.canSubmit}>
          {form.state.isSubmitting
            ? "Saving…"
            : initial
              ? "Save changes"
              : "Add product"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push("/admin?section=products")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
