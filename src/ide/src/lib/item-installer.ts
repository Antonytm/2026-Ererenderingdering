import type { SitecoreHelpers } from "./sitecore-helpers";
import {
  MODULE_VERSION,
  MODULE_ROOT_PATH,
  SCRIPT_LIBRARY_PATH,
  USER_SCRIPTS_PATH,
  TEMPLATES_ROOT_PATH,
  SITECORE_TEMPLATE_ID,
  SITECORE_TEMPLATE_SECTION_ID,
  SITECORE_TEMPLATE_FIELD_ID,
  TEMPLATE_DEFINITIONS,
  TEMPLATE_IDS,
  MODULE_DEFINITION,
  type ContentItem,
} from "./items";

export interface InstallResult {
  installed: boolean;
  version: string;
  storageMode: "sitecore" | "local";
}

async function createContentRecursive(
  helpers: SitecoreHelpers,
  parentPath: string,
  parentId: string,
  item: ContentItem
): Promise<void> {
  const itemPath = `${parentPath}/${item.name}`;

  const createFields: Record<string, string> = { ...item.fields };
  if (item.icon) createFields.__Icon = item.icon;
  const hasFields = Object.keys(createFields).length > 0;
  const created = await helpers.createItem(
    parentId,
    item.template,
    item.name,
    hasFields ? createFields : undefined
  );
  const itemId = created?.itemId;
  if (!itemId) return;

  if (item.children) {
    for (const child of item.children) {
      await createContentRecursive(helpers, itemPath, itemId, child);
    }
  }
}

async function ensurePathExists(
  helpers: SitecoreHelpers,
  path: string,
  parentPath: string,
  name: string
): Promise<any> {
  let item = await helpers.getItem(path);
  if (!item) {
    const parent = await helpers.getItem(parentPath);
    if (!parent) throw new Error(`Cannot find ${parentPath}`);
    item = await helpers.createItem(
      parent.itemId,
      SITECORE_TEMPLATE_SECTION_ID,
      name
    );
  }
  return item;
}

async function installTemplates(helpers: SitecoreHelpers): Promise<void> {
  // Ensure templates root folder exists: /sitecore/templates/Modules/JavaScript Extensions
  await ensurePathExists(
    helpers,
    "/sitecore/templates/Modules",
    "/sitecore/templates",
    "Modules"
  );
  const templatesRoot = await ensurePathExists(
    helpers,
    TEMPLATES_ROOT_PATH,
    "/sitecore/templates/Modules",
    "JavaScript Extensions"
  );

  if (!templatesRoot?.itemId) throw new Error("Failed to create templates root");

  // Create each template from its definition
  for (const tmpl of TEMPLATE_DEFINITIONS) {
    const tmplPath = `${tmpl.parent}/${tmpl.name}`;
    let tmplItemId: string;

    const existing = await helpers.getItem(tmplPath);
    if (existing) {
      tmplItemId = existing.itemId;
    } else {
      const parentItem = await helpers.getItem(tmpl.parent);
      if (!parentItem) throw new Error(`Parent not found: ${tmpl.parent}`);
      const created = await helpers.createItem(
        parentItem.itemId,
        SITECORE_TEMPLATE_ID,
        tmpl.name
      );
      tmplItemId = created.itemId;
    }

    // Group field definitions by section, then create section + field children
    const sections = new Map<string, { name: string; type: string }[]>();
    for (const field of tmpl.fields) {
      const group = sections.get(field.section) ?? [];
      group.push({ name: field.name, type: field.type });
      sections.set(field.section, group);
    }

    for (const [sectionName, fields] of sections) {
      const sectionPath = `${tmplPath}/${sectionName}`;
      let sectionItem = await helpers.getItem(sectionPath);
      let sectionId: string;

      if (sectionItem) {
        sectionId = sectionItem.itemId;
      } else {
        const created = await helpers.createItem(
          tmplItemId,
          SITECORE_TEMPLATE_SECTION_ID,
          sectionName
        );
        sectionId = created.itemId;
      }

      for (const field of fields) {
        const fieldPath = `${sectionPath}/${field.name}`;
        const fieldItem = await helpers.getItem(fieldPath);
        if (!fieldItem) {
          await helpers.createItem(
            sectionId,
            SITECORE_TEMPLATE_FIELD_ID,
            field.name,
            { Type: field.type }
          );
        }
      }
    }

    // Create or update __Standard Values with icon
    if (tmpl.icon) {
      const stdValuesPath = `${tmplPath}/__Standard Values`;
      const stdValues = await helpers.getItem(stdValuesPath);
      if (stdValues) {
        await helpers.updateItem(stdValues.itemId, { __Icon: tmpl.icon });
      } else {
        await helpers.createItem(tmplItemId, tmpl.id, "__Standard Values", {
          __Icon: tmpl.icon,
        });
      }
    }
  }
}

async function deleteScriptLibrary(helpers: SitecoreHelpers): Promise<void> {
  const scriptLib = await helpers.getItem(SCRIPT_LIBRARY_PATH);
  if (scriptLib?.itemId) {
    await helpers.deleteItem(scriptLib.itemId);
  }
}

async function installModuleRoot(helpers: SitecoreHelpers): Promise<string> {
  const systemModules = await ensurePathExists(
    helpers,
    "/sitecore/system/Modules",
    "/sitecore/system",
    "Modules"
  );
  if (!systemModules?.itemId) throw new Error("Failed to find/create system Modules");

  const createFields: Record<string, string> = { Version: MODULE_VERSION };
  if (MODULE_DEFINITION.icon) createFields.__Icon = MODULE_DEFINITION.icon;
  const moduleRoot = await helpers.createItem(
    systemModules.itemId,
    TEMPLATE_IDS.jsScriptModule,
    "JavaScript Extensions",
    createFields
  );
  if (!moduleRoot?.itemId) throw new Error("Failed to create module root");
  return moduleRoot.itemId;
}

async function installScriptLibrary(helpers: SitecoreHelpers, moduleRootId: string): Promise<void> {
  const scriptLibDef = MODULE_DEFINITION.children?.find((c) => c.name === "Script Library");
  if (!scriptLibDef) return;
  await createContentRecursive(helpers, MODULE_ROOT_PATH, moduleRootId, scriptLibDef);
}

async function ensureUserScripts(helpers: SitecoreHelpers, moduleRootId: string): Promise<void> {
  const existing = await helpers.getItem(USER_SCRIPTS_PATH);
  if (existing) return;

  const userScriptsDef = MODULE_DEFINITION.children?.find((c) => c.name === "Script Library")
    ?.children?.find((c) => c.name === "User Scripts");
  const fields: Record<string, string> = {};
  if (userScriptsDef?.icon) fields.__Icon = userScriptsDef.icon;
  const scriptLib = await helpers.getItem(SCRIPT_LIBRARY_PATH);
  if (!scriptLib?.itemId) return;
  await helpers.createItem(
    scriptLib.itemId,
    TEMPLATE_IDS.jsScriptLibrary,
    "User Scripts",
    Object.keys(fields).length > 0 ? fields : undefined
  );
}

function compareVersions(a: string, b: string): number {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const na = pa[i] ?? 0;
    const nb = pb[i] ?? 0;
    if (na !== nb) return na - nb;
  }
  return 0;
}

export async function installModule(helpers: SitecoreHelpers): Promise<InstallResult> {
  try {
    const existing = await helpers.getItem(MODULE_ROOT_PATH);

    if (!existing) {
      // Fresh install: templates + full content tree
      await installTemplates(helpers);
      const moduleRootId = await installModuleRoot(helpers);
      await installScriptLibrary(helpers, moduleRootId);
      await ensureUserScripts(helpers, moduleRootId);
      return { installed: true, version: MODULE_VERSION, storageMode: "sitecore" };
    }

    // Check version
    const installedVersion =
      existing.fields?.nodes?.find((f: any) => f.name === "Version")?.value ?? "0.0.0";

    if (compareVersions(MODULE_VERSION, installedVersion) > 0) {
      // Upgrade: reinstall templates, delete Script Library and recreate, preserve User Scripts
      await installTemplates(helpers);
      await deleteScriptLibrary(helpers);
      await installScriptLibrary(helpers, existing.itemId);
      await ensureUserScripts(helpers, existing.itemId);
      await helpers.updateItem(existing.itemId, { Version: MODULE_VERSION });
    }

    return { installed: true, version: MODULE_VERSION, storageMode: "sitecore" };
  } catch (err) {
    console.warn("[JSE] Module installation failed, falling back to localStorage:", err);
    return { installed: false, version: MODULE_VERSION, storageMode: "local" };
  }
}
