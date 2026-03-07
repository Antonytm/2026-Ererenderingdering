export const MODULE_VERSION = "1.0.0";
export const MODULE_ROOT_PATH = "/sitecore/system/Modules/JavaScript Extensions";
export const TEMPLATES_ROOT_PATH = "/sitecore/templates/Modules/JavaScript Extensions";
export const SCRIPT_LIBRARY_PATH = MODULE_ROOT_PATH + "/Script Library";
export const USER_SCRIPTS_PATH = MODULE_ROOT_PATH + "/User Scripts";
export const EXAMPLES_PATH = SCRIPT_LIBRARY_PATH + "/Examples";

// Template paths (under TEMPLATES_ROOT_PATH)
export const TEMPLATE_PATHS = {
  jsScriptModule: TEMPLATES_ROOT_PATH + "/JS Script Module",
  jsScriptLibrary: TEMPLATES_ROOT_PATH + "/JS Script Library",
  jsScript: TEMPLATES_ROOT_PATH + "/JS Script",
};

// Template definitions for creation via the SDK createTemplate API
export const TEMPLATE_DEFINITIONS = [
  {
    name: "JS Script Module",
    sections: [
      {
        name: "Settings",
        fields: [{ name: "Version", type: "Single-Line Text" }],
      },
    ],
  },
  {
    name: "JS Script Library",
    sections: [],
  },
  {
    name: "JS Script",
    sections: [
      {
        name: "Data",
        fields: [{ name: "Script", type: "Multi-Line Text" }],
      },
    ],
  },
];

// Example script code
export const EXAMPLE_SCRIPTS: Record<string, string> = {
  "Get Context": `// Get the current application context
const ctx = await Sitecore.getContext();
print(JSON.stringify(ctx, null, 2));`,

  "List Sites": `// List all sites in XM Cloud
const sites = await Sitecore.listSites();
print(JSON.stringify(sites, null, 2));`,

  "GraphQL Query": `// Query content tree via GraphQL
const result = await Sitecore.graphql(\`
  query {
    item(where: { database: "master", path: "/sitecore/content" }) {
      itemId
      name
      path
      children {
        nodes {
          itemId
          name
          path
        }
      }
    }
  }
\`);
print(JSON.stringify(result, null, 2));`,

  "Render HTML": `// Render custom HTML in the Results tab
const ctx = await Sitecore.getContext();
render(\`
  <div style="font-family: sans-serif; padding: 1rem;">
    <h2>Application Context</h2>
    <p><strong>App Name:</strong> \${ctx.appName || 'N/A'}</p>
    <p><strong>Tenant ID:</strong> \${ctx.tenantId || 'N/A'}</p>
  </div>
\`);`,

  "Get Item": `// Get a content item by path
const item = await Sitecore.getItem("/sitecore/content");
print(JSON.stringify(item, null, 2));`,
};
