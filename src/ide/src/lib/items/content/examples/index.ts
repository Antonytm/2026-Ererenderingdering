import type { ItemDefinition } from "../../constants";
import { TEMPLATE_IDS } from "../../constants";
import { getContextScript } from "./get-context";
import { listSitesScript } from "./list-sites";
import { graphqlQueryScript } from "./graphql-query";
import { renderHtmlScript } from "./render-html";
import { getItemScript } from "./get-item";

export const examplesFolder: ItemDefinition = {
  name: "Examples",
  templateId: TEMPLATE_IDS.jsScriptLibrary,
  children: [
    getContextScript,
    listSitesScript,
    graphqlQueryScript,
    renderHtmlScript,
    getItemScript,
  ],
};
