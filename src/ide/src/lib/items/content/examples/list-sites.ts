import type { ItemDefinition } from "../../constants";
import { TEMPLATE_IDS } from "../../constants";

export const listSitesScript: ItemDefinition = {
  name: "List Sites",
  templateId: TEMPLATE_IDS.jsScript,
  fields: {
    Script: `// List all sites in XM Cloud
const sites = await Sitecore.listSites();
print(JSON.stringify(sites, null, 2));`,
  },
};
