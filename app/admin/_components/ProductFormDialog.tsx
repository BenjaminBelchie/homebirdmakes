import { useRef, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IconPhoto, IconPlus, IconX } from "@tabler/icons-react";
import { createProduct, updateProduct } from "@/app/admin/productActions";
import type { AdminProduct } from "@/app/admin/productActions";

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

export function ProductFormDialog({
  open,
  onOpenChange,
  initial,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: AdminProduct;
  onSuccess: () => void;
}) {
  // Images managed outside TanStack Form (file/blob values)
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>(
    initial?.images ?? []
  );
  const [pendingFiles, setPendingFiles] = useState<{ file: File; previewUrl: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalImages = existingImageUrls.length + pendingFiles.length;
  const canAddMore = totalImages < 8;

  function handleFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const remaining = 8 - existingImageUrls.length - pendingFiles.length;
    const toAdd = files.slice(0, remaining);
    setPendingFiles((prev) => [
      ...prev,
      ...toAdd.map((file) => ({ file, previewUrl: URL.createObjectURL(file) })),
    ]);
    e.target.value = "";
  }

  function removeExistingImage(url: string) {
    setExistingImageUrls((prev) => prev.filter((u) => u !== url));
  }

  function removePendingFile(index: number) {
    setPendingFiles((prev) => {
      URL.revokeObjectURL(prev[index].previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  }

  const form = useForm({
    defaultValues: {
      name: initial?.name ?? "",
      description: initial?.description ?? "",
      priceGBP: initial?.priceInPence != null ? penceToGBP(initial.priceInPence) : "",
      featured: initial?.featured ?? false,
      displayOrder: initial?.displayOrder ?? 999,
      slug: initial?.slug ?? "",
    },
    onSubmit: async ({ value }) => {
      const priceInPence = gbpToPence(value.priceGBP);
      if (!priceInPence) return;

      const newImageUrls: string[] = [];
      for (const { file } of pendingFiles) {
        const form = new FormData();
        form.append("file", file);
        form.append("folder", "products");
        const res = await fetch("/api/r2/upload", { method: "POST", body: form });
        if (!res.ok) throw new Error("Failed to upload image");
        const { publicUrl } = await res.json() as { publicUrl: string };
        newImageUrls.push(publicUrl);
      }

      const newImageEntries = newImageUrls.map((url) => ({
        type: "new" as const,
        url,
      }));
      const existingEntries = existingImageUrls.map((url) => ({
        type: "existing" as const,
        url,
      }));

      if (initial) {
        await updateProduct({
          stripeProductId: initial.stripeProductId,
          convexId: initial.convexId,
          name: value.name,
          description: value.description,
          priceInPence,
          currentPriceInPence: initial.priceInPence,
          currentPriceId: initial.priceId,
          orderedImages: [...existingEntries, ...newImageEntries],
          featured: value.featured,
          displayOrder: value.displayOrder,
          slug: value.slug || undefined,
        });
      } else {
        await createProduct({
          name: value.name,
          description: value.description,
          priceInPence,
          orderedImages: newImageEntries,
          featured: value.featured,
          displayOrder: value.displayOrder,
          slug: value.slug || undefined,
        });
      }

      onSuccess();
      onOpenChange(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initial ? "Edit Product" : "Add Product"}</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-col gap-4"
        >
          {/* Images — managed outside TanStack Form (file/blob values) */}
          <Field>
            <FieldLabel>Images <span className="text-muted-foreground font-normal">(up to 8)</span></FieldLabel>
            <div className="grid grid-cols-4 gap-2">
              {existingImageUrls.map((url) => (
                <div key={url} className="relative aspect-square">
                  <img
                    src={url}
                    alt=""
                    className="h-full w-full rounded-md border border-border object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(url)}
                    className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-sm transition-opacity hover:opacity-80"
                    aria-label="Remove image"
                  >
                    <IconX className="size-3" />
                  </button>
                </div>
              ))}
              {pendingFiles.map(({ previewUrl }, index) => (
                <div key={previewUrl} className="relative aspect-square">
                  <img
                    src={previewUrl}
                    alt=""
                    className="h-full w-full rounded-md border border-border object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removePendingFile(index)}
                    className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-sm transition-opacity hover:opacity-80"
                    aria-label="Remove image"
                  >
                    <IconX className="size-3" />
                  </button>
                </div>
              ))}
              {canAddMore && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="border-border text-muted-foreground hover:text-foreground aspect-square flex cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-dashed transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {totalImages === 0 ? (
                    <>
                      <IconPhoto className="size-6" />
                      <span className="text-xs">Add images</span>
                    </>
                  ) : (
                    <IconPlus className="size-5" />
                  )}
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFilesChange}
            />
          </Field>

          <FieldGroup className="gap-4">
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
                    onChange={(e) => field.handleChange(e.target.value)}
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
                    rows={3}
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

            <form.Field name="displayOrder">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Display order</FieldLabel>
                  <Input
                    id={field.name}
                    type="number"
                    min={0}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    onBlur={field.handleBlur}
                  />
                </Field>
              )}
            </form.Field>

            <form.Field name="slug">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Slug (optional)</FieldLabel>
                  <Input
                    id={field.name}
                    placeholder="e.g. embroidered-hoop"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                </Field>
              )}
            </form.Field>

            <form.Field name="featured">
              {(field) => (
                <Field className="flex-row items-center gap-2">
                  <Checkbox
                    id={field.name}
                    checked={field.state.value}
                    onCheckedChange={(checked) => field.handleChange(!!checked)}
                  />
                  <FieldLabel htmlFor={field.name} className="mb-0 cursor-pointer">
                    Featured product
                  </FieldLabel>
                </Field>
              )}
            </form.Field>
          </FieldGroup>

          <DialogFooter>
            <Button
              type="submit"
              disabled={!form.state.canSubmit}
            >
              {form.state.isSubmitting
                ? "Saving…"
                : initial
                  ? "Save changes"
                  : "Add product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
