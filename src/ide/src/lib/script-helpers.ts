// Factory that creates print/render helper functions for common Sitecore data types.
// Each printX outputs formatted text to Console; each renderX outputs styled HTML to Results.

const STYLES = {
  bg: "#ffffff",
  text: "#1e293b",
  muted: "#64748b",
  accent: "#0284c7",
  border: "#e2e8f0",
  headerBg: "#f8fafc",
} as const;

function esc(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function card(title: string, subtitle: string, rows: [string, string][], details?: { label: string; content: string }[]): string {
  const rowsHtml = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:${STYLES.muted};white-space:nowrap;vertical-align:top">${esc(k)}</td><td style="padding:4px 0;color:${STYLES.text};word-break:break-all">${esc(v)}</td></tr>`
    )
    .join("");

  const detailsHtml = (details || [])
    .map(
      (d) =>
        `<details style="margin-top:8px"><summary style="cursor:pointer;color:${STYLES.accent};font-size:13px">${esc(d.label)}</summary><div style="margin-top:4px;padding:8px;background:${STYLES.bg};border-radius:4px;font-size:12px;color:${STYLES.text}">${d.content}</div></details>`
    )
    .join("");

  return `<div style="font-family:ui-monospace,monospace;background:${STYLES.headerBg};border:1px solid ${STYLES.border};border-radius:8px;max-width:640px;overflow:hidden">
  <div style="padding:12px 16px;border-bottom:1px solid ${STYLES.border}">
    <div style="font-size:15px;font-weight:600;color:${STYLES.accent}">${esc(title)}</div>
    <div style="font-size:12px;color:${STYLES.muted}">${esc(subtitle)}</div>
  </div>
  <div style="padding:12px 16px">
    <table style="border-collapse:collapse;font-size:13px;width:100%">${rowsHtml}</table>
    ${detailsHtml}
  </div>
</div>`;
}

function fieldTable(fields: any[]): string {
  if (!fields || fields.length === 0) return `<span style="color:${STYLES.muted}">(none)</span>`;
  const rows = fields
    .map(
      (f: any) =>
        `<tr><td style="padding:2px 8px 2px 0;color:${STYLES.accent}">${esc(f.name)}</td><td style="padding:2px 0;color:${STYLES.text}">${esc(truncate(f.value, 120))}</td></tr>`
    )
    .join("");
  return `<table style="border-collapse:collapse;font-size:12px;width:100%">${rows}</table>`;
}

function truncate(s: string, max: number): string {
  if (!s) return "";
  return s.length > max ? s.slice(0, max) + "..." : s;
}

function pad(label: string, width: number): string {
  return label + " ".repeat(Math.max(0, width - label.length));
}

export function createScriptHelpers(
  print: (...args: any[]) => void,
  setHtml: (html: string) => void,
) {
  // ── Item ──────────────────────────────────────────────

  function printItem(item: any) {
    if (!item) { print("(no item data)"); return; }
    const lines = [
      `Item: ${item.name || "(unnamed)"}`,
      `  ${pad("ID:", 12)}${item.itemId || "?"}`,
      `  ${pad("Path:", 12)}${item.path || "?"}`,
    ];
    if (item.template) {
      lines.push(`  ${pad("Template:", 12)}${item.template.name || "?"} (${item.template.templateId || "?"})`);
    }
    if (item.database) lines.push(`  ${pad("Database:", 12)}${item.database}`);
    if (item.version != null) lines.push(`  ${pad("Version:", 12)}${item.version}`);
    if (item.displayName && item.displayName !== item.name) {
      lines.push(`  ${pad("Display:", 12)}${item.displayName}`);
    }
    const fields = item.fields?.nodes;
    if (fields && fields.length > 0) {
      lines.push("  Fields:");
      const maxName = Math.max(...fields.map((f: any) => (f.name || "").length));
      for (const f of fields) {
        lines.push(`    ${pad(f.name, maxName)} = ${JSON.stringify(truncate(f.value, 80))}`);
      }
    }
    const children = item.children?.nodes;
    if (children && children.length > 0) {
      lines.push(`  Children (${children.length}):`);
      for (const c of children) {
        lines.push(`    ${c.name} — ${c.path || c.itemId}`);
      }
    }
    print(lines.join("\n"));
  }

  function renderItem(item: any) {
    if (!item) { setHtml(card("Item", "(no data)", [])); return; }
    const rows: [string, string][] = [
      ["ID", item.itemId || "?"],
      ["Path", item.path || "?"],
    ];
    if (item.template) rows.push(["Template", `${item.template.name || "?"} (${item.template.templateId || "?"})`]);
    if (item.database) rows.push(["Database", item.database]);
    if (item.version != null) rows.push(["Version", String(item.version)]);
    if (item.displayName && item.displayName !== item.name) rows.push(["Display Name", item.displayName]);

    const details: { label: string; content: string }[] = [];
    const fields = item.fields?.nodes;
    if (fields && fields.length > 0) {
      details.push({ label: `Fields (${fields.length})`, content: fieldTable(fields) });
    }
    const children = item.children?.nodes;
    if (children && children.length > 0) {
      const childRows = children
        .map((c: any) => `<tr><td style="padding:2px 8px 2px 0;color:${STYLES.accent}">${esc(c.name)}</td><td style="padding:2px 0;color:${STYLES.text}">${esc(c.path || c.itemId)}</td></tr>`)
        .join("");
      details.push({
        label: `Children (${children.length})`,
        content: `<table style="border-collapse:collapse;font-size:12px;width:100%">${childRows}</table>`,
      });
    }

    setHtml(card("Item", item.name || "(unnamed)", rows, details));
  }

  // ── User ──────────────────────────────────────────────

  function printUser(user: any) {
    if (!user) { print("(no user data)"); return; }
    const lines = [
      `User: ${user.name || user.userName || "(unnamed)"}`,
      `  ${pad("Display:", 12)}${user.displayName || user.fullName || "?"}`,
      `  ${pad("Domain:", 12)}${user.domain || "?"}`,
      `  ${pad("Admin:", 12)}${user.isAdministrator ? "Yes" : "No"}`,
    ];
    if (user.email) lines.push(`  ${pad("Email:", 12)}${user.email}`);
    if (user.profile) {
      const prof = user.profile;
      if (prof.fullName) lines.push(`  ${pad("Full Name:", 12)}${prof.fullName}`);
      if (prof.email) lines.push(`  ${pad("Prof Email:", 12)}${prof.email}`);
    }
    const roles = user.roles;
    if (roles && roles.length > 0) {
      lines.push(`  Roles (${roles.length}):`);
      for (const r of roles) {
        lines.push(`    ${typeof r === "string" ? r : r.name || JSON.stringify(r)}`);
      }
    }
    print(lines.join("\n"));
  }

  function renderUser(user: any) {
    if (!user) { setHtml(card("User", "(no data)", [])); return; }
    const rows: [string, string][] = [
      ["Name", user.name || user.userName || "?"],
      ["Display Name", user.displayName || user.fullName || "?"],
      ["Domain", user.domain || "?"],
      ["Administrator", user.isAdministrator ? "Yes" : "No"],
    ];
    if (user.email) rows.push(["Email", user.email]);
    if (user.profile?.fullName) rows.push(["Full Name", user.profile.fullName]);
    if (user.profile?.email) rows.push(["Profile Email", user.profile.email]);

    const details: { label: string; content: string }[] = [];
    const roles = user.roles;
    if (roles && roles.length > 0) {
      const items = roles.map((r: any) => {
        const name = typeof r === "string" ? r : r.name || JSON.stringify(r);
        return `<div style="padding:2px 0;color:${STYLES.text}">${esc(name)}</div>`;
      }).join("");
      details.push({ label: `Roles (${roles.length})`, content: items });
    }
    setHtml(card("User", user.name || user.userName || "(unnamed)", rows, details));
  }

  // ── Role ──────────────────────────────────────────────

  function printRole(role: any) {
    if (!role) { print("(no role data)"); return; }
    const lines = [
      `Role: ${role.name || "(unnamed)"}`,
    ];
    if (role.displayName) lines.push(`  ${pad("Display:", 12)}${role.displayName}`);
    const members = role.members;
    if (members && members.length > 0) {
      lines.push(`  Members (${members.length}):`);
      for (const m of members) {
        lines.push(`    ${typeof m === "string" ? m : m.name || JSON.stringify(m)}`);
      }
    }
    const memberOf = role.memberOf;
    if (memberOf && memberOf.length > 0) {
      lines.push(`  Member Of (${memberOf.length}):`);
      for (const m of memberOf) {
        lines.push(`    ${typeof m === "string" ? m : m.name || JSON.stringify(m)}`);
      }
    }
    print(lines.join("\n"));
  }

  function renderRole(role: any) {
    if (!role) { setHtml(card("Role", "(no data)", [])); return; }
    const rows: [string, string][] = [
      ["Name", role.name || "?"],
    ];
    if (role.displayName) rows.push(["Display Name", role.displayName]);

    const details: { label: string; content: string }[] = [];
    const members = role.members;
    if (members && members.length > 0) {
      const items = members.map((m: any) => {
        const name = typeof m === "string" ? m : m.name || JSON.stringify(m);
        return `<div style="padding:2px 0;color:${STYLES.text}">${esc(name)}</div>`;
      }).join("");
      details.push({ label: `Members (${members.length})`, content: items });
    }
    const memberOf = role.memberOf;
    if (memberOf && memberOf.length > 0) {
      const items = memberOf.map((m: any) => {
        const name = typeof m === "string" ? m : m.name || JSON.stringify(m);
        return `<div style="padding:2px 0;color:${STYLES.text}">${esc(name)}</div>`;
      }).join("");
      details.push({ label: `Member Of (${memberOf.length})`, content: items });
    }
    setHtml(card("Role", role.name || "(unnamed)", rows, details));
  }

  // ── Template ──────────────────────────────────────────

  function printTemplate(tmpl: any) {
    if (!tmpl) { print("(no template data)"); return; }
    const lines = [
      `Template: ${tmpl.name || "(unnamed)"}`,
      `  ${pad("ID:", 12)}${tmpl.templateId || tmpl.itemId || "?"}`,
    ];
    if (tmpl.path) lines.push(`  ${pad("Path:", 12)}${tmpl.path}`);
    const bases = tmpl.baseTemplates;
    if (bases && bases.length > 0) {
      lines.push(`  Base Templates (${bases.length}):`);
      for (const b of bases) {
        lines.push(`    ${typeof b === "string" ? b : b.name || b.templateId || JSON.stringify(b)}`);
      }
    }
    const fields = tmpl.fields || tmpl.ownFields;
    if (fields && fields.length > 0) {
      lines.push(`  Fields (${fields.length}):`);
      for (const f of fields) {
        const section = f.section ? ` [${f.section}]` : "";
        const type = f.type ? ` (${f.type})` : "";
        lines.push(`    ${f.name}${type}${section}`);
      }
    }
    print(lines.join("\n"));
  }

  function renderTemplate(tmpl: any) {
    if (!tmpl) { setHtml(card("Template", "(no data)", [])); return; }
    const rows: [string, string][] = [
      ["ID", tmpl.templateId || tmpl.itemId || "?"],
    ];
    if (tmpl.path) rows.push(["Path", tmpl.path]);

    const details: { label: string; content: string }[] = [];
    const bases = tmpl.baseTemplates;
    if (bases && bases.length > 0) {
      const items = bases.map((b: any) => {
        const name = typeof b === "string" ? b : b.name || b.templateId || JSON.stringify(b);
        return `<div style="padding:2px 0;color:${STYLES.text}">${esc(name)}</div>`;
      }).join("");
      details.push({ label: `Base Templates (${bases.length})`, content: items });
    }
    const fields = tmpl.fields || tmpl.ownFields;
    if (fields && fields.length > 0) {
      const fieldRows = fields
        .map((f: any) => {
          const type = f.type || "";
          const section = f.section || "";
          return `<tr><td style="padding:2px 8px 2px 0;color:${STYLES.accent}">${esc(f.name)}</td><td style="padding:2px 8px 2px 0;color:${STYLES.muted}">${esc(type)}</td><td style="padding:2px 0;color:${STYLES.muted}">${esc(section)}</td></tr>`;
        })
        .join("");
      details.push({
        label: `Fields (${fields.length})`,
        content: `<table style="border-collapse:collapse;font-size:12px;width:100%">${fieldRows}</table>`,
      });
    }
    setHtml(card("Template", tmpl.name || "(unnamed)", rows, details));
  }

  return {
    printItem, renderItem,
    printUser, renderUser,
    printRole, renderRole,
    printTemplate, renderTemplate,
  };
}
