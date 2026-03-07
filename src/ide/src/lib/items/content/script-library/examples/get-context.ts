import type { ContentItem } from "../../../constants";

export const getContextScript: ContentItem = {
  name: "Get Context",
  template: "jsScript",
  fields: {
    Script: `// Get the current application context
const ctx = await Sitecore.getContext();
print(JSON.stringify(ctx, null, 2));`,
  },
};
