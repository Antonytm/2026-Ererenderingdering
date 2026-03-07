import type { ItemDefinition } from "../../constants";
import { TEMPLATE_IDS } from "../../constants";

export const getItemScript: ItemDefinition = {
  name: "Get Item",
  templateId: TEMPLATE_IDS.jsScript,
  fields: {
    Script: `// Get a content item by path
const item = await Sitecore.getItem("/sitecore/content");
print(JSON.stringify(item, null, 2));`,
  },
};
