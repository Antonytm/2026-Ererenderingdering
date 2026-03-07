import type { ContentItem } from "../constants";
import { MODULE_VERSION, ICONS } from "../constants";
import { scriptLibraryFolder } from "./script-library";

export const MODULE_DEFINITION: ContentItem = {
  parent: "/sitecore/system/Modules",
  name: "JavaScript Extensions",
  template: "jsScriptModule",
  icon: ICONS.jsScriptModule,
  fields: { Version: MODULE_VERSION },
  children: [scriptLibraryFolder],
};
