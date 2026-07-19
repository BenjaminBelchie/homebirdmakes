"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IconBrandInstagram, IconBrandFacebook, IconBrandPinterest } from "@tabler/icons-react";

export default function ContactClient() {
  const sendContactEmail = useMutation(api.resend.sendContactEmail);
  const form = useForm({
    defaultValues: { name: "", email: "", phone: "", message: "" },
    onSubmit: async ({ value }) => {
      try {
        await sendContactEmail({ name: value.name, email: value.email, phone: value.phone || undefined, message: value.message });
        toast.success("Message sent!");
        form.reset();
      } catch { toast.error("Failed to send. Please try again."); }
    },
    onSubmitInvalid: () => toast.error("Please complete all required fields"),
  });

  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader />
      <div className="mx-auto grid w-full max-w-5xl flex-1 grid-cols-1 gap-0 px-6 py-16 lg:grid-cols-2 lg:gap-16">
        {/* Left info panel */}
        <div className="flex flex-col justify-center pb-12 lg:pb-0 lg:pr-8">
          <span className="text-xs tracking-[0.25em] text-muted-foreground">GET IN TOUCH</span>
          <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">Say hello.</h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            I'd love to hear from you! Whether you have a question about an order, want to discuss a commission, or just want to say hi, please drop me a message and I'll get back to you as soon as I can.
          </p>
          <div className="mt-8 flex flex-col gap-3 text-sm text-muted-foreground">
            <a href="mailto:alibelcher@aol.com" className="transition-colors hover:text-foreground">alibelcher@aol.com</a>
          </div>
          <div className="mt-6 flex gap-3">
            <a href="https://www.instagram.com/homebird_makes/" target="_blank" rel="noopener noreferrer"
               className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:text-foreground">
              <IconBrandInstagram className="h-4 w-4" />
            </a>
            <a href="https://www.facebook.com/homebirdmakes/" target="_blank" rel="noopener noreferrer"
               className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:text-foreground">
              <IconBrandFacebook className="h-4 w-4" />
            </a>
            <a href="https://www.pinterest.co.uk/homebirdmakes/" target="_blank" rel="noopener noreferrer"
               className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:text-foreground">
              <IconBrandPinterest className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Right form panel */}
        <div className="border-t border-border pt-10 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>
            <FieldGroup>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <form.Field name="name" validators={{ onSubmit: ({ value }) => !value.trim() ? "Name is required" : undefined }}>
                  {(field) => (
                    <Field data-invalid={field.state.meta.errors.length > 0 ? true : undefined}>
                      <FieldLabel htmlFor={field.name}>Name <span aria-hidden="true" className="text-destructive">*</span></FieldLabel>
                      <Input id={field.name} placeholder="Name" value={field.state.value} disabled={form.state.isSubmitting} aria-invalid={field.state.meta.errors.length > 0} onChange={(e) => field.handleChange(e.target.value)} onBlur={field.handleBlur} />
                      <FieldError errors={field.state.meta.errors.map((e) => ({ message: String(e) }))} />
                    </Field>
                  )}
                </form.Field>
                <form.Field name="email" validators={{ onSubmit: ({ value }) => !value.trim() ? "Email is required" : !/\S+@\S+\.\S+/.test(value) ? "Please enter a valid email" : undefined }}>
                  {(field) => (
                    <Field data-invalid={field.state.meta.errors.length > 0 ? true : undefined}>
                      <FieldLabel htmlFor={field.name}>Email <span aria-hidden="true" className="text-destructive">*</span></FieldLabel>
                      <Input id={field.name} type="email" placeholder="Email" value={field.state.value} disabled={form.state.isSubmitting} aria-invalid={field.state.meta.errors.length > 0} onChange={(e) => field.handleChange(e.target.value)} onBlur={field.handleBlur} />
                      <FieldError errors={field.state.meta.errors.map((e) => ({ message: String(e) }))} />
                    </Field>
                  )}
                </form.Field>
              </div>
              <form.Field name="phone">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                    <Input id={field.name} type="tel" placeholder="Phone Number" value={field.state.value} disabled={form.state.isSubmitting} onChange={(e) => field.handleChange(e.target.value)} onBlur={field.handleBlur} />
                  </Field>
                )}
              </form.Field>
              <form.Field name="message" validators={{ onSubmit: ({ value }) => !value.trim() ? "Message is required" : undefined }}>
                {(field) => (
                  <Field data-invalid={field.state.meta.errors.length > 0 ? true : undefined}>
                    <FieldLabel htmlFor={field.name}>Message <span aria-hidden="true" className="text-destructive">*</span></FieldLabel>
                    <Textarea id={field.name} placeholder="Message" className="min-h-36 resize-y" value={field.state.value} disabled={form.state.isSubmitting} aria-invalid={field.state.meta.errors.length > 0} onChange={(e) => field.handleChange(e.target.value)} onBlur={field.handleBlur} />
                    <FieldError errors={field.state.meta.errors.map((e) => ({ message: String(e) }))} />
                  </Field>
                )}
              </form.Field>
            </FieldGroup>
            <form.Subscribe selector={(s) => s.isSubmitting}>
              {(isSubmitting) => <Button type="submit" disabled={isSubmitting} className="w-full">{isSubmitting ? "Sending…" : "Send Message"}</Button>}
            </form.Subscribe>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
