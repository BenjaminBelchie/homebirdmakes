"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactClient() {
  const sendContactEmail = useMutation(api.resend.sendContactEmail);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await sendContactEmail({
          name: value.name,
          email: value.email,
          phone: value.phone || undefined,
          message: value.message,
        });
        toast.success("Email sent");
        form.reset();
      } catch {
        toast.error("Failed to send email. Please try again.");
      }
    },
    onSubmitInvalid: () => {
      toast.error("Please complete all required fields");
    },
  });

  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader />
      <div className="flex flex-1 flex-col items-center">
      <div className="mt-[55px] flex w-full max-w-[930px] flex-col items-center justify-center p-4 sm:p-8">
        <h1 className="mb-[55px] text-2xl">Contact</h1>
        <p>
          {"If you would like to get in touch please do email me at alibelcher@aol.com, and I'll get back to you as soon as I can."}
        </p>

        <form
          className="mt-[35px] flex w-full flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
              <form.Field
                name="name"
                validators={{
                  onSubmit: ({ value }) =>
                    !value.trim() ? "Name is required" : undefined,
                }}
              >
                {(field) => (
                  <Field data-invalid={field.state.meta.errors.length > 0 ? true : undefined}>
                    <FieldLabel htmlFor={field.name}>Name <span aria-hidden="true" className="text-destructive">*</span></FieldLabel>
                    <Input
                      id={field.name}
                      placeholder="Name"
                      required
                      value={field.state.value}
                      disabled={form.state.isSubmitting}
                      aria-invalid={field.state.meta.errors.length > 0}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    <FieldError errors={field.state.meta.errors.map((e) => ({ message: String(e) }))} />
                  </Field>
                )}
              </form.Field>

              <form.Field
                name="email"
                validators={{
                  onSubmit: ({ value }) => {
                    if (!value.trim()) return "Email is required";
                    if (!/\S+@\S+\.\S+/.test(value)) return "Please enter a valid email";
                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <Field data-invalid={field.state.meta.errors.length > 0 ? true : undefined}>
                    <FieldLabel htmlFor={field.name}>Email <span aria-hidden="true" className="text-destructive">*</span></FieldLabel>
                    <Input
                      id={field.name}
                      type="email"
                      placeholder="Email"
                      required
                      value={field.state.value}
                      disabled={form.state.isSubmitting}
                      aria-invalid={field.state.meta.errors.length > 0}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    <FieldError errors={field.state.meta.errors.map((e) => ({ message: String(e) }))} />
                  </Field>
                )}
              </form.Field>
            </div>

            <form.Field name="phone">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                  <Input
                    id={field.name}
                    type="tel"
                    placeholder="Phone Number"
                    value={field.state.value}
                    disabled={form.state.isSubmitting}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                </Field>
              )}
            </form.Field>

            <form.Field
              name="message"
              validators={{
                onSubmit: ({ value }) =>
                  !value.trim() ? "Message is required" : undefined,
              }}
            >
              {(field) => (
                <Field data-invalid={field.state.meta.errors.length > 0 ? true : undefined}>
                    <FieldLabel htmlFor={field.name}>Message <span aria-hidden="true" className="text-destructive">*</span></FieldLabel>
                  <Textarea
                    id={field.name}
                    placeholder="Message"
                    className="min-h-40 resize-y"
                    required
                    value={field.state.value}
                    disabled={form.state.isSubmitting}
                    aria-invalid={field.state.meta.errors.length > 0}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  <FieldError errors={field.state.meta.errors.map((e) => ({ message: String(e) }))} />
                </Field>
              )}
            </form.Field>
          </FieldGroup>

          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button type="submit" disabled={isSubmitting} className="self-end w-full">
                {isSubmitting ? "Sending…" : "Send"}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </div>
      </div>
      <Footer />
    </div>
  );
}