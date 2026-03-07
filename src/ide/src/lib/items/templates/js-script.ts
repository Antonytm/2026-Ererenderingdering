import type { TemplateItem } from "../constants";
import { TEMPLATES_ROOT_PATH, TEMPLATE_IDS } from "../constants";

export const jsScriptTemplate: TemplateItem = {
  parent: TEMPLATES_ROOT_PATH,
  name: "JS Script",
  id: TEMPLATE_IDS.jsScript,
  icon: "/~/icon/software/32x32/text_code_javascript.png",
  fields: [
    { section: "Data", name: "Script", type: "Multi-Line Text" },
  ],
};
