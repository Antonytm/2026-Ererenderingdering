import type { ItemDefinition } from "../constants";
import { TEMPLATE_IDS, MODULE_VERSION } from "../constants";
import { scriptLibraryFolder } from "./script-library";

export const javascriptExtensions: ItemDefinition = {
  name: "JavaScript Extensions",
  templateId: TEMPLATE_IDS.jsScriptModule,
  fields: { Version: MODULE_VERSION },
  children: [scriptLibraryFolder],
};
