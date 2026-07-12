import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-2 p-3">
      <h1 className="text-4xl">
        Page Not Found
      </h1>
      <p>The page you are looking for does not exist.</p>
      <Link className="rounded bg-brand-secondary px-4 py-2 text-white transition-opacity hover:opacity-90" href="/">
        Back to Home
      </Link>
    </div>
  );
}
