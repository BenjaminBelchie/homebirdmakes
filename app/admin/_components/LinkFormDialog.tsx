"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { LinkItem } from "./types";

function fieldErrors(errors: unknown[]) {
  return errors.map((e) => ({ message: String(e) }));
}

export function LinkFormDialog({
  open,
  onOpenChange,
  initial,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: LinkItem;
}) {
  const createLink = useMutation(api.links.create);
  const updateLink = useMutation(api.links.update);

  const form = useForm({
    defaultValues: {
      displayText: initial?.display_text ?? "",
      url: initial?.link ?? "",
    },
    onSubmit: async ({ value }) => {
      if (initial) {
        await updateLink({ id: initial.id, display_text: value.displayText, link: value.url });
      } else {
        await createLink({ display_text: value.displayText, link: value.url });
      }
      onOpenChange(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initial ? "Edit Link" : "Add Link"}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-col gap-4"
        >
          <FieldGroup className="gap-4">
            <form.Field
              name="displayText"
              validators={{
                onChange: ({ value }) => (!value.trim() ? "Display text is required" : undefined),
                onSubmit: ({ value }) => (!value.trim() ? "Display text is required" : undefined),
              }}
            >
              {(field) => (
                <Field data-invalid={field.state.meta.errors.length > 0}>
                  <FieldLabel htmlFor={field.name}>Display Text</FieldLabel>
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
              name="url"
              validators={{
                onChange: ({ value }) => {
                  if (!value.trim()) return "URL is required";
                  if (!value.startsWith("https://")) return "Must start with https://";
                  return undefined;
                },
                onSubmit: ({ value }) => {
                  if (!value.trim()) return "URL is required";
                  if (!value.startsWith("https://")) return "Must start with https://";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <Field data-invalid={field.state.meta.errors.length > 0}>
                  <FieldLabel htmlFor={field.name}>URL</FieldLabel>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="https://..."
                    aria-invalid={field.state.meta.errors.length > 0}
                  />
                  <FieldError errors={fieldErrors(field.state.meta.errors)} />
                </Field>
              )}
            </form.Field>
          </FieldGroup>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!form.state.canSubmit}>
              {form.state.isSubmitting
                ? "Saving…"
                : initial
                  ? "Save Changes"
                  : "Add Link"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


