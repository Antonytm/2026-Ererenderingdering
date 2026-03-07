import type { ItemDefinition } from "../constants";
import {
  SITECORE_TEMPLATE_ID,
  SITECORE_TEMPLATE_SECTION_ID,
  SITECORE_TEMPLATE_FIELD_ID,
} from "../constants";

export const jsScriptTemplate: ItemDefinition = {
  name: "JS Script",
  templateId: SITECORE_TEMPLATE_ID,
  children: [
    {
      name: "Data",
      templateId: SITECORE_TEMPLATE_SECTION_ID,
      children: [
        {
          name: "Script",
          templateId: SITECORE_TEMPLATE_FIELD_ID,
          fields: { Type: "Multi-Line Text" },
        },
      ],
    },
  ],
};
