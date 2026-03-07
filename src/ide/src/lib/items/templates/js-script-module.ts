import type { ItemDefinition } from "../constants";
import {
  SITECORE_TEMPLATE_ID,
  SITECORE_TEMPLATE_SECTION_ID,
  SITECORE_TEMPLATE_FIELD_ID,
} from "../constants";

export const jsScriptModuleTemplate: ItemDefinition = {
  name: "JS Script Module",
  templateId: SITECORE_TEMPLATE_ID,
  children: [
    {
      name: "Settings",
      templateId: SITECORE_TEMPLATE_SECTION_ID,
      children: [
        {
          name: "Version",
          templateId: SITECORE_TEMPLATE_FIELD_ID,
          fields: { Type: "Single-Line Text" },
        },
      ],
    },
  ],
};
