import type { SitecoreHelpers } from "./sitecore-helpers";
import type { ScriptStorageBackend, SavedScript } from "./script-storage";
import {
  EXAMPLES_PATH,
  USER_SCRIPTS_PATH,
} from "./items";

function itemToScript(item: any): SavedScript {
  const scriptField = item.fields?.nodes?.find((f: any) => f.name === "Script");
  return {
    id: item.itemId,
    name: item.name,
    code: scriptField?.value ?? "",
    lastModified: Date.now(),
  };
}

export function createSitecoreScriptStorage(helpers: SitecoreHelpers, jsScriptTemplateId: string): ScriptStorageBackend {
  async function listScripts(): Promise<SavedScript[]> {
    const [examples, userScripts] = await Promise.all([
      helpers.getItemChildren(EXAMPLES_PATH),
      helpers.getItemChildren(USER_SCRIPTS_PATH),
    ]);
    return [...examples, ...userScripts].map(itemToScript);
  }

  return {
    listScripts,

    async saveScript(name: string, code: string) {
      const userScripts = await helpers.getItem(USER_SCRIPTS_PATH);
      if (!userScripts?.itemId) {
        throw new Error("User Scripts folder not found");
      }
      const created = await helpers.createItem(
        userScripts.itemId,
        jsScriptTemplateId,
        name,
        { Script: code }
      );
      return {
        id: created.itemId,
        name: created.name,
        code,
        lastModified: Date.now(),
      };
    },

    async loadScript(id: string) {
      const scripts = await listScripts();
      return scripts.find((s: SavedScript) => s.id === id);
    },

    async updateScript(id: string, updates: Partial<Pick<SavedScript, "name" | "code">>) {
      const fields: Record<string, string> = {};
      if (updates.code !== undefined) fields["Script"] = updates.code;
      if (Object.keys(fields).length > 0) {
        await helpers.updateItem(id, fields);
      }
      const scripts = await listScripts();
      return scripts.find((s: SavedScript) => s.id === id);
    },

    async deleteScript(id: string) {
      return helpers.deleteItem(id);
    },
  };
}
