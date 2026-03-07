"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function RequireSitecoreContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.self === window.top) {
      router.replace("/docs");
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) return null;

  return <>{children}</>;
}
