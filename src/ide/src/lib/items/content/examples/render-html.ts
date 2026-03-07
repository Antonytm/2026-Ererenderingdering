import type { ItemDefinition } from "../../constants";
import { TEMPLATE_IDS } from "../../constants";

export const renderHtmlScript: ItemDefinition = {
  name: "Render HTML",
  templateId: TEMPLATE_IDS.jsScript,
  fields: {
    Script: `// Render custom HTML in the Results tab
const ctx = await Sitecore.getContext();
render(\`
  <div style="font-family: sans-serif; padding: 1rem;">
    <h2>Application Context</h2>
    <p><strong>App Name:</strong> \${ctx.appName || 'N/A'}</p>
    <p><strong>Tenant ID:</strong> \${ctx.tenantId || 'N/A'}</p>
  </div>
\`);`,
  },
};
