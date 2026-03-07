import type { ContentItem } from "../../constants";
import { TEMPLATE_IDS } from "../../constants";
import { examplesFolder } from "./examples";
import { userScriptsFolder } from "./user-scripts";

export const scriptLibraryFolder: ContentItem = {
  name: "Script Library",
  template: TEMPLATE_IDS.jsScriptLibrary,
  icon: "/~/icon/apps/32x32/Codes.png",
  fields: {},
  children: [examplesFolder, userScriptsFolder],
};
