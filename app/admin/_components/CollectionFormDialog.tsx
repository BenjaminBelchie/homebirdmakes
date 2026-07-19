"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { IconPhoto, IconUpload } from "@tabler/icons-react";
import type { Collection } from "./types";

function fieldErrors(errors: unknown[]) {
  return errors.map((e) => ({ message: String(e) }));
}

export function CollectionFormDialog({
  open,
  onOpenChange,
  initial,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: Collection;
}) {
  const generateUploadUrl = useMutation(api.collections.generateUploadUrl);
  const createCollection = useMutation(api.collections.create);
  const updateCollection = useMutation(api.collections.update);

  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPendingFile(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  }

  const displayImage = previewUrl ?? initial?.image ?? null;

  const form = useForm({
    defaultValues: {
      category: initial?.category ?? "",
      etsyLink: initial?.etsy_link ?? "",
      isFeatured: initial?.isFeatured ?? false,
    },
    onSubmit: async ({ value }) => {
      let storageId: string | undefined;

      if (pendingFile) {
        const uploadUrl = await generateUploadUrl();
        const response = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": pendingFile.type },
          body: pendingFile,
        });
        const json = await response.json();
        storageId = json.storageId as string;
      }

      if (initial) {
        await updateCollection({
          id: initial.id,
          category: value.category,
          etsy_link: value.etsyLink,
          isFeatured: value.isFeatured,
          ...(storageId !== undefined && { image: storageId }),
        });
      } else {
        await createCollection({
          category: value.category,
          image: storageId!,
          etsy_link: value.etsyLink,
          isFeatured: value.isFeatured,
        });
      }

      onOpenChange(false);
    },
  });

  const imageReady = initial !== undefined || pendingFile !== null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initial ? "Edit Collection" : "Add Collection"}</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-col gap-4"
        >
          {/* Image upload — managed outside TanStack Form (file/blob, not a text value) */}
          <Field>
            <FieldLabel>Image</FieldLabel>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="border-border relative flex h-40 w-full cursor-pointer items-center justify-center overflow-hidden rounded-md border border-dashed transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {displayImage ? (
                <>
                  <img src={displayImage} alt="Preview" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-black/50 opacity-0 transition-opacity hover:opacity-100">
                    <IconUpload className="size-5 text-white" />
                    <span className="text-xs text-white">Change image</span>
                  </div>
                </>
              ) : (
                <div className="text-muted-foreground flex flex-col items-center gap-2">
                  <IconPhoto className="size-8" />
                  <span className="text-sm">Click to upload image</span>
                </div>
              )}
            </button>
            {pendingFile && (
              <p className="text-muted-foreground truncate text-xs">{pendingFile.name}</p>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </Field>

          <FieldGroup className="gap-4">
            <form.Field
              name="category"
              validators={{
                onChange: ({ value }) => (!value.trim() ? "Category is required" : undefined),
                onSubmit: ({ value }) => (!value.trim() ? "Category is required" : undefined),
              }}
            >
              {(field) => (
                <Field data-invalid={field.state.meta.errors.length > 0}>
                  <FieldLabel htmlFor={field.name}>Category</FieldLabel>
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

            <form.Field
              name="etsyLink"
              validators={{
                onChange: ({ value }) => {
                  if (!value.trim()) return "Etsy link is required";
                  if (!value.startsWith("https://")) return "Must start with https://";
                  return undefined;
                },
                onSubmit: ({ value }) => {
                  if (!value.trim()) return "Etsy link is required";
                  if (!value.startsWith("https://")) return "Must start with https://";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <Field data-invalid={field.state.meta.errors.length > 0}>
                  <FieldLabel htmlFor={field.name}>Etsy Link</FieldLabel>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="https://etsy.com/..."
                    aria-invalid={field.state.meta.errors.length > 0}
                  />
                  <FieldError errors={fieldErrors(field.state.meta.errors)} />
                </Field>
              )}
            </form.Field>

            <form.Field name="isFeatured">
              {(field) => (
                <Field>
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id={field.name}
                      checked={field.state.value}
                      onCheckedChange={(checked) => field.handleChange(checked === true)}
                      className="mt-0.5"
                    />
                    <div className="flex flex-col gap-0.5">
                      <FieldLabel htmlFor={field.name} className="cursor-pointer">
                        Featured collection
                      </FieldLabel>
                      <FieldDescription>
                        Only one collection can be featured at a time.
                      </FieldDescription>
                    </div>
                  </div>
                </Field>
              )}
            </form.Field>
          </FieldGroup>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!form.state.canSubmit || !imageReady}>
              {form.state.isSubmitting
                ? "Saving…"
                : initial
                  ? "Save Changes"
                  : "Add Collection"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


