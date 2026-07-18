import Link from "next/link";

export default function PageHeader() {
  return (
    <header className="flex flex-col items-center py-10">
      <Link href="/">
        <img src="/images/homebirdmakes_logo.png" className="h-36 w-auto sm:h-44" alt="Homebird Makes" />
      </Link>
      <nav className="mt-5 flex items-center gap-6 text-sm text-muted-foreground">
        <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
        <a
          href="https://www.etsy.com/uk/shop/homebirdmakes"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-foreground"
        >
          Shop
        </a>
        <Link href="/about" className="transition-colors hover:text-foreground">About</Link>
        <Link href="/contact" className="transition-colors hover:text-foreground">Contact</Link>
      </nav>
      <div className="mt-5 h-px w-full bg-border" />
    </header>
  );
}
