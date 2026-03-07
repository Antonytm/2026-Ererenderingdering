import type { ContentItem } from "../../../constants";

export const getItemScript: ContentItem = {
  name: "Get Item",
  template: "jsScript",
  fields: {
    Script: `// Get a content item by path
const item = await Sitecore.getItem("/sitecore/content");
print(JSON.stringify(item, null, 2));`,
  },
};
