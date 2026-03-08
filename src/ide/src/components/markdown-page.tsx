"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import Link from "next/link";

export function MarkdownPage({
  content,
  backHref = "/docs",
  backLabel = "Back to Docs",
}: {
  content: string;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          &larr; {backLabel}
        </Link>
        <Image src="/logo.png" alt="Sitecore JavaScript Extensions" width={36} height={36} />
      </div>
      <article className="prose prose-neutral max-w-none dark:prose-invert">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            img: ({ src, alt, ...props }) => (
              // Rewrite relative img/ paths to absolute /docs-img/ for Next.js serving
              // Markdown uses relative paths so images also work on GitHub
              <img
                src={typeof src === "string" ? src.replace(/^img\//, "/docs-img/") : src}
                alt={alt || ""}
                {...props}
              />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
