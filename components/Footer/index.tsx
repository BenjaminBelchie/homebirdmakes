import Link from "next/link";
import { IconBrandInstagram, IconBrandFacebook, IconBrandPinterest } from "@tabler/icons-react";

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <img src="/images/homebirdmakes_logo.png" className="h-12 w-auto" alt="Homebird Makes" />
        <div className="flex gap-5 text-sm text-muted-foreground">
          <Link href="/about" className="transition-colors hover:text-foreground">About</Link>
          <Link href="/contact" className="transition-colors hover:text-foreground">Contact</Link>
          <a href="https://www.etsy.com/uk/shop/homebirdmakes" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">Etsy</a>
        </div>
        <div className="flex gap-3">
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
      <p className="mt-6 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Homebird Makes</p>
    </footer>
  );
}