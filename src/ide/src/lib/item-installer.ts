import type { SitecoreHelpers } from "./sitecore-helpers";
import {
  MODULE_VERSION,
  MODULE_ROOT_PATH,
  SCRIPT_LIBRARY_PATH,
  USER_SCRIPTS_PATH,
  TEMPLATES_ROOT_PATH,
  TEMPLATE_DEFINITIONS,
  TEMPLATE_IDS,
  MODULE_DEFINITION,
  type ItemDefinition,
} from "./items/module-definition";

export interface InstallResult {
  installed: boolean;
  version: string;
  storageMode: "sitecore" | "local";
}

async function createTreeRecursive(
  helpers: SitecoreHelpers,
  parentPath: string,
  parentId: string,
  definition: ItemDefinition
): Promise<void> {
  const itemPath = `${parentPath}/${definition.name}`;

  const created = await helpers.createItem(
    parentId,
    definition.templateId,
    definition.name,
    definition.fields
  );
  const itemId = created?.itemId;
  if (!itemId) return;

  if (definition.children) {
    for (const child of definition.children) {
      await createTreeRecursive(helpers, itemPath, itemId, child);
    }
  }
}

async function installTemplates(helpers: SitecoreHelpers): Promise<void> {
  // Ensure templates root folder exists: /sitecore/templates/Modules/JavaScript Extensions
  let templatesRoot = await helpers.getItem(TEMPLATES_ROOT_PATH);
  if (!templatesRoot) {
    const modulesPath = "/sitecore/templates/Modules";
    let modules = await helpers.getItem(modulesPath);
    if (!modules) {
      const templatesFolder = await helpers.getItem("/sitecore/templates");
      if (!templatesFolder) throw new Error("Cannot find /sitecore/templates");
      const created = await helpers.createItem(
        templatesFolder.itemId,
        "{E269FBB5-3750-427A-9149-7AA950B49301}",
        "Modules"
      );
      modules = created;
    }
    const created = await helpers.createItem(
      modules.itemId,
      "{E269FBB5-3750-427A-9149-7AA950B49301}",
      "JavaScript Extensions"
    );
    templatesRoot = created;
  }

  if (!templatesRoot?.itemId) throw new Error("Failed to create templates root");

  for (const tmpl of TEMPLATE_DEFINITIONS) {
    const tmplPath = `${TEMPLATES_ROOT_PATH}/${tmpl.name}`;
    const existing = await helpers.getItem(tmplPath);
    if (!existing) {
      await createTreeRecursive(helpers, TEMPLATES_ROOT_PATH, templatesRoot.itemId, tmpl);
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
  // Ensure /sitecore/system/Modules exists
  const systemModulesPath = "/sitecore/system/Modules";
  let systemModules = await helpers.getItem(systemModulesPath);
  if (!systemModules) {
    const system = await helpers.getItem("/sitecore/system");
    if (!system) throw new Error("Cannot find /sitecore/system");
    systemModules = await helpers.createItem(
      system.itemId,
      "{E269FBB5-3750-427A-9149-7AA950B49301}",
      "Modules"
    );
  }
  if (!systemModules?.itemId) throw new Error("Failed to find/create system Modules");

  // Create JavaScript Extensions root item
  const moduleRoot = await helpers.createItem(
    systemModules.itemId,
    TEMPLATE_IDS.jsScriptModule,
    "JavaScript Extensions",
    { Version: MODULE_VERSION }
  );
  if (!moduleRoot?.itemId) throw new Error("Failed to create module root");
  return moduleRoot.itemId;
}

async function installScriptLibrary(helpers: SitecoreHelpers, moduleRootId: string): Promise<void> {
  // Find the Script Library definition from MODULE_DEFINITION
  const scriptLibDef = MODULE_DEFINITION.children?.find((c) => c.name === "Script Library");
  if (!scriptLibDef) return;
  await createTreeRecursive(helpers, MODULE_ROOT_PATH, moduleRootId, scriptLibDef);
}

async function ensureUserScripts(helpers: SitecoreHelpers, moduleRootId: string): Promise<void> {
  const existing = await helpers.getItem(USER_SCRIPTS_PATH);
  if (existing) return;
  await helpers.createItem(moduleRootId, TEMPLATE_IDS.jsScriptLibrary, "User Scripts");
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
