import type { ItemDefinition } from "./constants";
import { jsScriptModuleTemplate } from "./templates/js-script-module";
import { jsScriptLibraryTemplate } from "./templates/js-script-library";
import { jsScriptTemplate } from "./templates/js-script";

export const TEMPLATE_DEFINITIONS: ItemDefinition[] = [
  jsScriptModuleTemplate,
  jsScriptLibraryTemplate,
  jsScriptTemplate,
];
