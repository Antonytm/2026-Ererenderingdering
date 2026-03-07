import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Sitecore Marketplace Extensions</h1>
      <p>Select an extension to preview:</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ marginBottom: "0.5rem" }}>
          <Link href="/standalone-extension">Standalone Extension</Link>
        </li>
        <li style={{ marginBottom: "0.5rem" }}>
          <Link href="/fullscreen-extension">Fullscreen Extension</Link>
        </li>
        <li style={{ marginBottom: "0.5rem" }}>
          <Link href="/dashboard-widget-extension">Dashboard Widget Extension</Link>
        </li>
        <li style={{ marginBottom: "0.5rem" }}>
          <Link href="/custom-field-extension">Custom Field Extension</Link>
        </li>
        <li style={{ marginBottom: "0.5rem" }}>
          <Link href="/pages-contextpanel-extension">Pages Context Panel Extension</Link>
        </li>
      </ul>
    </main>
  );
}
