import type { ContentItem } from "../../constants";
import { ICONS } from "../../constants";
import { examplesFolder } from "./examples";
import { userScriptsFolder } from "./user-scripts";

export const scriptLibraryFolder: ContentItem = {
  name: "Script Library",
  template: "jsScriptLibrary",
  icon: ICONS.jsScriptLibrary,
  fields: {},
  children: [examplesFolder, userScriptsFolder],
};
