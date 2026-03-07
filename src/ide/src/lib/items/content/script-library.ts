import type { ItemDefinition } from "../constants";
import { TEMPLATE_IDS } from "../constants";
import { examplesFolder } from "./examples";
import { userScriptsFolder } from "./user-scripts";

export const scriptLibraryFolder: ItemDefinition = {
  name: "Script Library",
  templateId: TEMPLATE_IDS.jsScriptLibrary,
  children: [examplesFolder, userScriptsFolder],
};
