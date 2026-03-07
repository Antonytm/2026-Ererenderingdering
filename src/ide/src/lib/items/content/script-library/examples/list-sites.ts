import type { ContentItem } from "../../../constants";

export const listSitesScript: ContentItem = {
  name: "List Sites",
  template: "jsScript",
  fields: {
    Script: `// List all sites in XM Cloud
const sites = await Sitecore.listSites();
print(JSON.stringify(sites, null, 2));`,
  },
};
