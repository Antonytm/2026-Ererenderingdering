import Link from "next/link";

const docs = [
  {
    title: "Getting Started",
    description: "Overview and quick start guide",
    href: "/docs/getting-started",
  },
];

export default function DocsIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="mb-2 text-3xl font-bold">Documentation</h1>
      <p className="mb-8 text-muted-foreground">
        Browse the available documentation pages below.
      </p>
      <ul className="space-y-3">
        {docs.map((doc) => (
          <li key={doc.href}>
            <Link
              href={doc.href}
              className="block rounded-lg border border-border p-4 transition-colors hover:bg-muted"
            >
              <span className="font-medium">{doc.title}</span>
              <span className="mt-1 block text-sm text-muted-foreground">
                {doc.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
