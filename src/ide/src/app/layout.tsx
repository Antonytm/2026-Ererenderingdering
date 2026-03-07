import type { Metadata } from 'next'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import './globals.css';

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'Sitecore Marketplace Extensions',
  description: 'Sitecore Marketplace extension starter application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="min-h-screen antialiased">
        {children}
        {process.env.NODE_ENV === "development" && (
          <div className="fixed bottom-2 right-2 rounded bg-black/70 px-2 py-1 font-mono text-xs text-white">
            {process.env.NEXT_PUBLIC_GIT_BRANCH}
          </div>
        )}
      </body>
    </html>
  )
}
