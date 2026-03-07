import type { TemplateDef } from "../constants";
import { ICONS } from "../constants";

export const jsScriptModuleTemplate: TemplateDef = {
  name: "JS Script Module",
  icon: ICONS.jsScriptModule,
  sections: [
    {
      name: "Settings",
      fields: [{ name: "Version", type: "Single-Line Text" }],
    },
  ],
};
