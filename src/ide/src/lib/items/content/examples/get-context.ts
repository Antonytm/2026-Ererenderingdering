import type { ItemDefinition } from "../../constants";
import { TEMPLATE_IDS } from "../../constants";

export const getContextScript: ItemDefinition = {
  name: "Get Context",
  templateId: TEMPLATE_IDS.jsScript,
  fields: {
    Script: `// Get the current application context
const ctx = await Sitecore.getContext();
print(JSON.stringify(ctx, null, 2));`,
  },
};
