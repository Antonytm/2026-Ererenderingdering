import type { ClientSDK } from "@sitecore-marketplace-sdk/client";

export interface SitecoreHelpers {
  // Core
  getContext: () => Promise<any>;
  graphql: (query: string, variables?: Record<string, any>) => Promise<any>;
  listSites: () => Promise<any>;
  retrievePage: (pageId: string, site: string, language?: string) => Promise<any>;
  reloadCanvas: () => Promise<void>;
  navigateTo: (itemId: string) => Promise<void>;

  // 1. Content & Items
  getItem: (idOrPath: string, opts?: { language?: string; version?: number; database?: string }) => Promise<any>;
  getItemChildren: (path: string) => Promise<any[]>;
  getMediaItem: (idOrPath: string, opts?: { language?: string; version?: number; database?: string }) => Promise<any>;
  search: (query: {
    searchStatement?: any; filterStatement?: any; facetOnFields?: string[];
    facetMetrics?: any[]; index?: string; language?: string; latestVersionOnly?: boolean;
    paging?: { pageIndex?: number; pageSize?: number; skip?: number };
    sort?: { field: string; direction?: string }[];
  }) => Promise<any>;
  createItem: (parent: string, templateId: string, name: string, fields?: Record<string, string>, opts?: { language?: string; database?: string }) => Promise<any>;
  createItemFromBranch: (branchId: string, parent: string, name: string, fields?: Record<string, string>, opts?: { language?: string; database?: string }) => Promise<any>;
  updateItem: (idOrPath: string, fields: Record<string, string>, opts?: { language?: string; version?: number; database?: string }) => Promise<any>;
  deleteItem: (idOrPath: string, permanently?: boolean) => Promise<any>;
  renameItem: (idOrPath: string, newName: string, opts?: { database?: string }) => Promise<any>;
  moveItem: (idOrPath: string, targetParent: string, opts?: { sortOrder?: number; database?: string }) => Promise<any>;
  copyItem: (idOrPath: string, targetParent: string, opts?: { copyItemName?: string; deepCopy?: boolean; database?: string }) => Promise<any>;
  addItemVersion: (idOrPath: string, opts?: { language?: string; version?: number; versionName?: string; database?: string }) => Promise<any>;
  deleteItemVersion: (idOrPath: string, opts?: { language?: string; version?: number; database?: string }) => Promise<any>;
  uploadMedia: (itemPath: string, opts?: { alt?: string; database?: string; language?: string; overwriteExisting?: boolean; versioned?: boolean; includeExtensionInItemName?: boolean }) => Promise<any>;

  // 2. Publishing
  getPublishingStatus: (operationId: string) => Promise<any>;
  getPublishingTargets: () => Promise<any>;
  getPublishingQueue: (query: { sort: { field: string; direction: string }; paging?: { pageIndex: number; pageSize: number }; dateFilter?: { dateFrom: string; dateTo: string }; itemsFilter?: any }) => Promise<any>;
  publishItem: (input: { rootItemId?: string; rootItemPath?: string; rootItemIds?: string[]; rootItemPaths?: string[]; languages: string[]; targetDatabases: string[]; publishItemMode: string; publishSubItems?: boolean; publishRelatedItems?: boolean; sourceDatabase?: string; displayName?: string }) => Promise<any>;
  publishLanguageSpecificItems: (input: { itemsToPublish?: { id?: string; languages: string[] }[]; languages?: string[]; targetDatabases: string[]; publishItemMode: string; publishSubItems?: boolean; publishRelatedItems?: boolean; sourceDatabase?: string; displayName?: string }) => Promise<any>;
  publishSite: (input: { languages: string[]; targetDatabases: string[]; publishSiteMode: string; sourceDatabase?: string; displayName?: string }) => Promise<any>;
  publishWithOptions: (options: any[]) => Promise<any>;
  cancelPublishing: (operationId: string) => Promise<any>;

  // 3. Search Indexes & Database
  getIndex: (name: string) => Promise<any>;
  getIndexes: () => Promise<any>;
  rebuildIndexes: (names: string[]) => Promise<any>;
  populateManagedSchema: (names: string[]) => Promise<any>;
  rebuildLinkDatabase: (dbNames: string[]) => Promise<any>;
  cleanUpDatabases: (dbNames: string[]) => Promise<any>;

  // 4. Workflows & Jobs
  getWorkflow: (idOrItem: string | { itemId?: string; path?: string; database?: string }) => Promise<any>;
  getWorkflows: () => Promise<any>;
  getJob: (nameOrHandle: string) => Promise<any>;
  getJobs: () => Promise<any>;
  isJobQueued: (name: string) => Promise<boolean>;
  isJobRunning: (name: string) => Promise<boolean>;
  startWorkflow: (item: { itemId?: string; path?: string; database?: string; language?: string }) => Promise<any>;
  executeWorkflowCommand: (commandId: string, item: { itemId?: string; path?: string; database?: string; language?: string }, comments?: string) => Promise<any>;

  // 5. Translation
  translatePage: (pageId: string, targetLang: string, opts?: { sourceLanguage?: string; brandKitId?: string; translateIfTargetVersionExists?: boolean; database?: string }) => Promise<any>;
  translateSite: (siteId: string, targetLang: string, opts?: { sourceLanguage?: string; brandKitId?: string; translateIfTargetVersionExists?: boolean; database?: string }) => Promise<any>;

  // 6. Templates
  getTemplate: (idOrPath: string, opts?: { database?: string }) => Promise<any>;
  getTemplates: (opts?: { database?: string; path?: string; templateId?: string }) => Promise<any>;
  getDataSourceTemplates: (opts?: { database?: string }) => Promise<any>;
  getTenantTemplates: (siteName: string, opts?: { database?: string; hasPageDesign?: boolean }) => Promise<any>;
  createTemplate: (parent: string, name: string, opts?: { database?: string; language?: string; icon?: string; baseTemplates?: string[]; sections?: any[]; createStandardValuesItem?: boolean }) => Promise<any>;
  updateTemplate: (templateId: string, opts?: { name?: string; database?: string; language?: string; icon?: string; baseTemplates?: string[]; sections?: any[]; createStandardValuesItem?: boolean; deleteMissingFields?: boolean }) => Promise<any>;
  deleteTemplate: (templateId: string, opts?: { database?: string }) => Promise<any>;
  createTemplateFolder: (parent: string, name: string, opts?: { database?: string; language?: string }) => Promise<any>;

  // 7. Sites & Solutions
  getSite: (name: string) => Promise<any>;
  getSites: (includeSystem?: boolean) => Promise<any>;
  getSiteCollections: (opts?: { database?: string }) => Promise<any>;
  getSolutionSites: (opts?: { database?: string; siteName?: string; siteId?: string; siteCollectionID?: string; rootItemId?: string; includeNonSxaSites?: boolean }) => Promise<any>;
  searchSolutionSites: (filter?: any) => Promise<any>;
  getSolutionTemplates: (opts?: { database?: string }) => Promise<any>;
  scaffoldSolution: (input: { siteName: string; hostName: string; language: string; templateId: string; languages?: string[]; siteCollectionName?: string; siteCollectionDisplayName?: string; siteCollectionDescription?: string; siteDescription?: string; siteDisplayName?: string; posMappings?: any[]; database?: string }) => Promise<any>;
  createSite: (input: { siteName: string; hostName: string; language: string; templateId: string; collectionId: string; languages?: string[]; siteCollectionName?: string; siteCollectionDisplayName?: string; siteCollectionDescription?: string; siteDescription?: string; siteDisplayName?: string; description?: string; displayName?: string; posMappings?: any[]; database?: string }) => Promise<any>;
  createSiteCollection: (input: { name: string; displayName?: string; description?: string; database?: string }) => Promise<any>;
  removeSite: (input: { siteId?: string; siteName?: string; database?: string }) => Promise<any>;
  removeSiteCollection: (input: { id: string; database?: string }) => Promise<any>;
  renameSite: (input: { siteId?: string; siteName?: string; newName?: string; database?: string }) => Promise<any>;
  renameSiteCollection: (input: { id: string; name?: string; database?: string }) => Promise<any>;
  cloneSite: (input: { siteId?: string; siteName?: string; cloneName?: string; displayName?: string; description?: string; cloneSiteDefinitions?: boolean; posMappings?: any[]; database?: string }) => Promise<any>;
  updateSitesPos: (input: { posMappingsInput: { id: string; newValue: any[] }[]; database?: string }) => Promise<any>;

  // 8. Languages & Archiving
  getLanguage: (name: string) => Promise<any>;
  getLanguages: (db?: string) => Promise<any>;
  getSupportedLanguages: () => Promise<any>;
  getFallbackLanguage: (name: string, db?: string) => Promise<any>;
  getArchivedItem: (archivalId: string, archiveName?: string) => Promise<any>;
  getArchivedItems: (opts?: { archiveName?: string; pageIndex?: number; pageSize?: number }) => Promise<any>;
  addLanguage: (input: { languageCode: string; name?: string; database?: string; charset?: string; codePage?: string; customCode?: string; encoding?: string; fallbackCode?: string; regionCode?: string; spellChecker?: string; useSupportedLanguageAsFallback?: boolean }) => Promise<any>;
  deleteLanguage: (name: string, db?: string) => Promise<any>;
  deleteLanguages: (names: string[], db?: string) => Promise<any>;
  archiveItem: (idOrPath: string, archiveName?: string) => Promise<any>;
  archiveVersion: (idOrPath: string, language: string, version?: number, archiveName?: string) => Promise<any>;
  setItemArchiveDate: (idOrPath: string, date?: string) => Promise<any>;
  setVersionArchiveDate: (idOrPath: string, language: string, date?: string, version?: number) => Promise<any>;
  restoreArchivedItem: (archivalId: string, archiveName?: string) => Promise<any>;
  restoreArchivedVersion: (versionId: string, archiveName?: string) => Promise<any>;
  deleteArchivedItem: (archivalId: string, archiveName?: string) => Promise<any>;
  deleteArchivedVersion: (versionId: string, archiveName?: string) => Promise<any>;
  emptyArchive: (archiveName?: string) => Promise<any>;

  // 9. Security
  getCurrentUser: () => Promise<any>;
  getUser: (userName: string) => Promise<any>;
  getUsers: () => Promise<any>;
  getRole: (roleName: string) => Promise<any>;
  getRoles: () => Promise<any>;
  getDomain: (domainName: string) => Promise<any>;
  getDomains: () => Promise<any>;
  getSelectionProfiles: () => Promise<any>;
  createUser: (input: { userName: string; password: string; email?: string; fullName?: string; isAdministrator?: boolean; roleNames?: string[]; comment?: string; clientLanguage?: string; defaultContentLanguage?: string; portrait?: string; regionalIsoCode?: string; startUrl?: string; userProfileId?: string; wallpaper?: string }) => Promise<any>;
  updateUser: (input: { userName: string; email?: string; fullName?: string; isAdministrator?: boolean; roleNames?: string[]; comment?: string; clientLanguage?: string; defaultContentLanguage?: string; portrait?: string; regionalIsoCode?: string; startUrl?: string; userProfileId?: string; wallpaper?: string }) => Promise<any>;
  deleteUser: (userName: string) => Promise<any>;
  unlockUser: (userName: string) => Promise<any>;
  enableUser: (userName: string) => Promise<any>;
  disableUser: (userName: string) => Promise<any>;
  resetUserSettings: (userName: string) => Promise<any>;
  changeUserPassword: (userName: string, oldPw: string, newPw: string) => Promise<any>;
  createDomain: (domainName: string, local?: boolean) => Promise<any>;
  deleteDomain: (domainName: string) => Promise<any>;
  createRole: (roleName: string) => Promise<any>;
  deleteRole: (roleName: string) => Promise<any>;
  addRoleToRoles: (roleName: string, parentRoles: string[]) => Promise<any>;
  deleteRoleFromRoles: (roleName: string, parentRoles: string[]) => Promise<any>;
  addAccountsToRole: (roleName: string, opts?: { users?: string[]; roles?: string[] }) => Promise<any>;
  deleteAccountsFromRole: (roleName: string, opts?: { users?: string[]; roles?: string[] }) => Promise<any>;

  // 10. Presentation & Meta
  getAvailableRenderings: (opts?: { database?: string; renderingId?: string; siteRootItemId?: string }) => Promise<any>;
  getPageDesigns: (siteName: string, opts?: { database?: string }) => Promise<any>;
  getPartialDesigns: (siteName: string, opts?: { database?: string }) => Promise<any>;
  getPageBranchesRoots: (siteName: string, opts?: { database?: string }) => Promise<any>;
  getDatabases: () => Promise<any>;
  getMeta: () => Promise<any>;
  configurePageDesigns: (siteName: string, mapping: { templateId?: string; pageDesignId?: string }[], opts?: { database?: string }) => Promise<any>;
}

function unwrap(res: any): any {
  if (res?.isError || res?.status === "error") {
    const msg = res.error?.message || res.error?.detail || JSON.stringify(res.error) || "Unknown SDK error";
    throw new Error(`SDK error: ${msg}`);
  }
  return res?.data ?? res;
}

function isId(s: string): boolean {
  return /^[{(]?[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}[})]?$/i.test(s);
}

function itemWhere(idOrPath: string, opts?: { language?: string; version?: number; database?: string }): Record<string, any> {
  const where: Record<string, any> = {};
  if (isId(idOrPath)) where.itemId = idOrPath; else where.path = idOrPath;
  if (opts?.language) where.language = opts.language;
  if (opts?.version != null) where.version = opts.version;
  if (opts?.database) where.database = opts.database;
  return where;
}

function fieldsToInput(fields?: Record<string, string>): { name: string; value: string }[] | undefined {
  if (!fields) return undefined;
  const arr = Object.entries(fields).map(([name, value]) => ({ name, value }));
  return arr.length > 0 ? arr : undefined;
}

export function createSitecoreHelpers(client: ClientSDK): SitecoreHelpers {
  let cachedContextId: string | null = null;

  async function getSitecoreContextId(): Promise<string> {
    if (cachedContextId) return cachedContextId;
    const res = await client.query("application.context");
    const ctx = res.data;
    cachedContextId = ctx?.resourceAccess?.[0]?.context?.preview ?? null;
    if (!cachedContextId) {
      throw new Error("No Sitecore context ID available in resource access");
    }
    return cachedContextId;
  }

  async function gql(query: string, variables?: Record<string, any>): Promise<any> {
    const sitecoreContextId = await getSitecoreContextId();
    const res = await client.mutate("xmc.authoring.graphql", {
      params: {
        query: { sitecoreContextId },
        body: { query, variables },
      },
    });
    const data = unwrap(res);
    if (data?.data?.errors) throw new Error(JSON.stringify(data.data.errors));
    return data?.data;
  }

  // Extract first result key from a graphql response
  function first(data: any): any {
    if (!data) return data;
    const keys = Object.keys(data);
    return keys.length === 1 ? data[keys[0]] : data;
  }

  return {
    // ── Core ──────────────────────────────────────────────

    async getContext() {
      const res = await client.query("application.context");
      return res.data;
    },

    async graphql(query: string, variables?: Record<string, any>) {
      return gql(query, variables);
    },

    async listSites() {
      const data = await gql(`query { sites { name hostName language rootPath } }`);
      return data?.sites ?? data;
    },

    async retrievePage(pageId: string, site: string, language?: string) {
      const sitecoreContextId = await getSitecoreContextId();
      const res = await (client as any).query("xmc.pages.retrievePage", {
        params: {
          query: { sitecoreContextId, sc_site: site, sc_lang: language ?? "en" },
          path: { pageId },
        },
      });
      return unwrap(res);
    },

    async reloadCanvas() {
      await (client as any).mutate("pages.reloadCanvas");
    },

    async navigateTo(itemId: string) {
      await (client as any).mutate("pages.context", {
        params: { body: { itemId } },
      });
    },

    // ── 1. Content & Items ───────────────────────────────

    async getItem(idOrPath, opts) {
      const where = itemWhere(idOrPath, opts);
      const data = await gql(`
        query GetItem($where: ItemQueryInput) {
          item(where: $where) {
            itemId name path database displayName version
            template { templateId name }
            fields(ownFields: true, excludeStandardFields: true) { nodes { name value } }
            children { nodes { itemId name path } }
          }
        }
      `, { where });
      return data?.item;
    },

    async getItemChildren(path) {
      const data = await gql(`
        query GetItemChildren($where: ItemQueryInput) {
          item(where: $where) {
            children { nodes { itemId name path fields(ownFields: true, excludeStandardFields: true) { nodes { name value } } } }
          }
        }
      `, { where: { path } });
      return data?.item?.children?.nodes ?? [];
    },

    async getMediaItem(idOrPath, opts) {
      const where: any = {};
      if (isId(idOrPath)) where.mediaItemId = idOrPath; else where.path = idOrPath;
      if (opts?.language) where.language = opts.language;
      if (opts?.version != null) where.version = opts.version;
      if (opts?.database) where.database = opts.database;
      const data = await gql(`
        query GetMediaItem($where: MediaItemQueryInput!) {
          mediaItem(where: $where) {
            alt description extension mediaPath mimeType size title
            url innerItem { itemId name path }
          }
        }
      `, { where });
      return data?.mediaItem;
    },

    async search(query) {
      const data = await gql(`
        query Search($query: SearchQueryInput!) {
          search(query: $query) {
            totalCount
            results { itemId name path displayName templateName templateId language { name } version createdBy createdDate updatedBy updatedDate }
            facets { name facets { name count } }
          }
        }
      `, { query });
      return data?.search;
    },

    async createItem(parent, templateId, name, fields, opts) {
      const input: any = { parent, templateId, name, fields: fieldsToInput(fields) };
      if (opts?.language) input.language = opts.language;
      if (opts?.database) input.database = opts.database;
      const data = await gql(`
        mutation CreateItem($input: CreateItemInput!) {
          createItem(input: $input) { item { itemId name path } }
        }
      `, { input });
      return data?.createItem?.item;
    },

    async createItemFromBranch(branchId, parent, name, fields, opts) {
      const input: any = { branchId, parent, name, fields: fieldsToInput(fields) };
      if (opts?.language) input.language = opts.language;
      if (opts?.database) input.database = opts.database;
      const data = await gql(`
        mutation CreateItemFromBranch($input: CreateItemFromBranchInput!) {
          createItemFromBranch(input: $input) { job { handle name done } }
        }
      `, { input });
      return data?.createItemFromBranch;
    },

    async updateItem(idOrPath, fields, opts) {
      const input: any = { fields: fieldsToInput(fields) };
      if (isId(idOrPath)) input.itemId = idOrPath; else input.path = idOrPath;
      if (opts?.language) input.language = opts.language;
      if (opts?.version != null) input.version = opts.version;
      if (opts?.database) input.database = opts.database;
      const data = await gql(`
        mutation UpdateItem($input: UpdateItemInput!) {
          updateItem(input: $input) { item { itemId name path } }
        }
      `, { input });
      return data?.updateItem?.item;
    },

    async deleteItem(idOrPath, permanently) {
      const input: any = { permanently };
      if (isId(idOrPath)) input.itemId = idOrPath; else input.path = idOrPath;
      const data = await gql(`
        mutation DeleteItem($input: DeleteItemInput!) {
          deleteItem(input: $input) { successful }
        }
      `, { input });
      return data?.deleteItem;
    },

    async renameItem(idOrPath, newName, opts) {
      const input: any = { newName };
      if (isId(idOrPath)) input.itemId = idOrPath; else input.path = idOrPath;
      if (opts?.database) input.database = opts.database;
      const data = await gql(`
        mutation RenameItem($input: RenameItemInput!) {
          renameItem(input: $input) { item { itemId name path } }
        }
      `, { input });
      return data?.renameItem?.item;
    },

    async moveItem(idOrPath, targetParent, opts) {
      const input: any = {};
      if (isId(idOrPath)) input.itemId = idOrPath; else input.path = idOrPath;
      if (isId(targetParent)) input.targetParentId = targetParent; else input.targetParentPath = targetParent;
      if (opts?.sortOrder != null) input.sortOrder = opts.sortOrder;
      if (opts?.database) input.database = opts.database;
      const data = await gql(`
        mutation MoveItem($input: MoveItemInput!) {
          moveItem(input: $input) { item { itemId name path } }
        }
      `, { input });
      return data?.moveItem?.item;
    },

    async copyItem(idOrPath, targetParent, opts) {
      const input: any = {};
      if (isId(idOrPath)) input.itemId = idOrPath; else input.path = idOrPath;
      if (isId(targetParent)) input.targetParentId = targetParent; else input.targetParentPath = targetParent;
      if (opts?.copyItemName) input.copyItemName = opts.copyItemName;
      if (opts?.deepCopy != null) input.deepCopy = opts.deepCopy;
      if (opts?.database) input.database = opts.database;
      const data = await gql(`
        mutation CopyItem($input: CopyItemInput!) {
          copyItem(input: $input) { item { itemId name path } }
        }
      `, { input });
      return data?.copyItem?.item;
    },

    async addItemVersion(idOrPath, opts) {
      const input: any = {};
      if (isId(idOrPath)) input.itemId = idOrPath; else input.path = idOrPath;
      if (opts?.language) input.language = opts.language;
      if (opts?.version != null) input.version = opts.version;
      if (opts?.versionName) input.versionName = opts.versionName;
      if (opts?.database) input.database = opts.database;
      const data = await gql(`
        mutation AddItemVersion($input: AddItemVersionInput!) {
          addItemVersion(input: $input) { item { itemId name path version } }
        }
      `, { input });
      return data?.addItemVersion?.item;
    },

    async deleteItemVersion(idOrPath, opts) {
      const input: any = {};
      if (isId(idOrPath)) input.itemId = idOrPath; else input.path = idOrPath;
      if (opts?.language) input.language = opts.language;
      if (opts?.version != null) input.version = opts.version;
      if (opts?.database) input.database = opts.database;
      const data = await gql(`
        mutation DeleteItemVersion($input: DeleteItemVersionInput!) {
          deleteItemVersion(input: $input) { item { itemId name path version } }
        }
      `, { input });
      return data?.deleteItemVersion?.item;
    },

    async uploadMedia(itemPath, opts) {
      const input: any = { itemPath, ...opts };
      const data = await gql(`
        mutation UploadMedia($input: UploadMediaInput!) {
          uploadMedia(input: $input) { presignedUploadUrl }
        }
      `, { input });
      return data?.uploadMedia;
    },

    // ── 2. Publishing ────────────────────────────────────

    async getPublishingStatus(operationId) {
      const data = await gql(`
        query GetPublishingStatus($id: String!) {
          publishingStatus(publishingOperationId: $id) {
            isDone isFailed processed state
            languages { name } targetDatabase { name }
          }
        }
      `, { id: operationId });
      return data?.publishingStatus;
    },

    async getPublishingTargets() {
      const data = await gql(`query { publishingTargets { name targetDatabase previewPublishingTarget } }`);
      return data?.publishingTargets;
    },

    async getPublishingQueue(query) {
      const data = await gql(`
        query GetPublishingQueue($query: PublishingQueueEntriesQueryInput!) {
          publishingQueueEntries(query: $query) {
            totalCount
            results { id itemId language action date item { name path templateName } }
          }
        }
      `, { query });
      return data?.publishingQueueEntries;
    },

    async publishItem(input) {
      const data = await gql(`
        mutation PublishItem($input: PublishItemInput!) {
          publishItem(input: $input) { operationId }
        }
      `, { input });
      return data?.publishItem;
    },

    async publishLanguageSpecificItems(input) {
      const data = await gql(`
        mutation PublishLanguageSpecificItems($input: PublishLanguageSpecificItemsInput!) {
          publishLanguageSpecificItems(input: $input) { operationId }
        }
      `, { input });
      return data?.publishLanguageSpecificItems;
    },

    async publishSite(input) {
      const data = await gql(`
        mutation PublishSite($input: PublishSiteInput!) {
          publishSite(input: $input) { operationId }
        }
      `, { input });
      return data?.publishSite;
    },

    async publishWithOptions(options) {
      const data = await gql(`
        mutation PublishWithOptions($input: PublishWithOptionsInput!) {
          publishWithOptions(input: $input) { operationId }
        }
      `, { input: { options } });
      return data?.publishWithOptions;
    },

    async cancelPublishing(operationId) {
      const data = await gql(`
        mutation CancelPublishing($id: String!) {
          cancelPublishing(publishingOperationId: $id) { success message publishingOperationId }
        }
      `, { id: operationId });
      return data?.cancelPublishing;
    },

    // ── 3. Search Indexes & Database ─────────────────────

    async getIndex(name) {
      const data = await gql(`
        query GetIndex($name: String!) {
          index(indexName: $name) { name documentsCount hasDeletions lastRebuildDuration lastUpdated numberOfFields numberOfTerms outOfDate }
        }
      `, { name });
      return data?.index;
    },

    async getIndexes() {
      const data = await gql(`query { indexes { nodes { name documentsCount hasDeletions lastRebuildDuration lastUpdated numberOfFields numberOfTerms outOfDate } } }`);
      return data?.indexes?.nodes;
    },

    async rebuildIndexes(names) {
      const data = await gql(`
        mutation RebuildIndexes($input: RebuildIndexesInput) {
          rebuildIndexes(input: $input) { jobs { handle name done status { jobState processed total } } }
        }
      `, { input: { indexNames: names } });
      return data?.rebuildIndexes;
    },

    async populateManagedSchema(names) {
      const data = await gql(`
        mutation PopulateManagedSchema($input: PopulateManagedSchemaInput) {
          populateManagedSchema(input: $input) { jobs { handle name done } }
        }
      `, { input: { indexNames: names } });
      return data?.populateManagedSchema;
    },

    async rebuildLinkDatabase(dbNames) {
      const data = await gql(`
        mutation RebuildLinkDatabase($input: RebuildLinkDatabaseInput!) {
          rebuildLinkDatabase(input: $input) { job { handle name done } }
        }
      `, { input: { databaseNames: dbNames } });
      return data?.rebuildLinkDatabase;
    },

    async cleanUpDatabases(dbNames) {
      const data = await gql(`
        mutation CleanUpDatabases($input: CleanUpDatabasesInput!) {
          cleanUpDatabases(input: $input) { job { handle name done } }
        }
      `, { input: { databaseNames: dbNames } });
      return data?.cleanUpDatabases;
    },

    // ── 4. Workflows & Jobs ──────────────────────────────

    async getWorkflow(idOrItem) {
      const where: any = {};
      if (typeof idOrItem === "string") {
        if (isId(idOrItem)) where.workflowId = idOrItem;
        else where.item = { path: idOrItem };
      } else {
        where.item = idOrItem;
      }
      const data = await gql(`
        query GetWorkflow($where: WorkflowIdOrItemQueryInput!) {
          workflow(where: $where) {
            workflowId displayName
            initialState { stateId displayName final }
            states { nodes { stateId displayName final icon } }
          }
        }
      `, { where });
      return data?.workflow;
    },

    async getWorkflows() {
      const data = await gql(`query { workflows { nodes { workflowId displayName initialState { stateId displayName } } } }`);
      return data?.workflows?.nodes;
    },

    async getJob(nameOrHandle) {
      const input: any = {};
      if (nameOrHandle.includes("|")) input.handle = nameOrHandle; else input.jobName = nameOrHandle;
      const data = await gql(`
        query GetJob($input: JobQueryInput!) {
          job(input: $input) { handle name displayName done queueTime status { jobState processed total messages exceptions } options { jobName category siteName abortable } }
        }
      `, { input });
      return data?.job;
    },

    async getJobs() {
      const data = await gql(`query { jobs { nodes { handle name displayName done queueTime status { jobState processed total } } } }`);
      return data?.jobs?.nodes;
    },

    async isJobQueued(name) {
      const data = await gql(`query IsJobQueued($name: String!) { isJobQueued(jobName: $name) }`, { name });
      return data?.isJobQueued;
    },

    async isJobRunning(name) {
      const data = await gql(`query IsJobRunning($name: String!) { isJobRunning(jobName: $name) }`, { name });
      return data?.isJobRunning;
    },

    async startWorkflow(item) {
      const data = await gql(`
        mutation StartWorkflow($input: StartWorkflowInput!) {
          startWorkflow(input: $input) { successful }
        }
      `, { input: { item } });
      return data?.startWorkflow;
    },

    async executeWorkflowCommand(commandId, item, comments) {
      const data = await gql(`
        mutation ExecuteWorkflowCommand($input: ExecuteWorkflowCommandInput!) {
          executeWorkflowCommand(input: $input) { successful completed error message nextStateId }
        }
      `, { input: { commandId, item, comments } });
      return data?.executeWorkflowCommand;
    },

    // ── 5. Translation ───────────────────────────────────

    async translatePage(pageId, targetLang, opts) {
      const input: any = { pageId, targetLanguage: targetLang, translateIfTargetVersionExists: opts?.translateIfTargetVersionExists ?? false };
      if (opts?.sourceLanguage) input.sourceLanguage = opts.sourceLanguage;
      if (opts?.brandKitId) input.brandKitId = opts.brandKitId;
      if (opts?.database) input.database = opts.database;
      const data = await gql(`
        mutation TranslatePage($input: TranslatePageInput!) {
          translatePage(input: $input) { job { handle name done } }
        }
      `, { input });
      return data?.translatePage;
    },

    async translateSite(siteId, targetLang, opts) {
      const input: any = { siteId, targetLanguage: targetLang, translateIfTargetVersionExists: opts?.translateIfTargetVersionExists ?? false };
      if (opts?.sourceLanguage) input.sourceLanguage = opts.sourceLanguage;
      if (opts?.brandKitId) input.brandKitId = opts.brandKitId;
      if (opts?.database) input.database = opts.database;
      const data = await gql(`
        mutation TranslateSite($input: TranslateSiteInput!) {
          translateSite(input: $input) { job { handle name done } }
        }
      `, { input });
      return data?.translateSite;
    },

    // ── 6. Templates ─────────────────────────────────────

    async getTemplate(idOrPath, opts) {
      const where: any = {};
      if (isId(idOrPath)) where.templateId = idOrPath; else where.path = idOrPath;
      if (opts?.database) where.database = opts.database;
      const data = await gql(`
        query GetTemplate($where: ItemTemplateQueryInput) {
          itemTemplate(where: $where) {
            templateId name fullName icon
            ownFields { nodes { templateFieldId name type key defaultValue source sortOrder section { name } } }
            sections { nodes { itemTemplateSectionId name key sortOrder } }
            baseTemplates(directOnly: true) { nodes { templateId name } }
          }
        }
      `, { where });
      return data?.itemTemplate;
    },

    async getTemplates(opts) {
      const where: any = {};
      if (opts?.database) where.database = opts.database;
      if (opts?.path) where.path = opts.path;
      if (opts?.templateId) where.templateId = opts.templateId;
      const data = await gql(`
        query GetTemplates($where: ItemTemplateQueryInput) {
          itemTemplates(where: $where) { nodes { templateId name fullName icon } }
        }
      `, { where });
      return data?.itemTemplates?.nodes;
    },

    async getDataSourceTemplates(opts) {
      const data = await gql(`
        query GetDataSourceTemplates($input: DefaultInput) {
          dataSourceTemplates(input: $input) { templates { templateId name fullName } }
        }
      `, { input: opts ?? {} });
      return data?.dataSourceTemplates?.templates;
    },

    async getTenantTemplates(siteName, opts) {
      const where: any = { siteName };
      if (opts?.database) where.database = opts.database;
      if (opts?.hasPageDesign != null) where.hasPageDesign = opts.hasPageDesign;
      const data = await gql(`
        query GetTenantTemplates($where: TenantTemplatesInput) {
          tenantTemplates(where: $where) { template { templateId name fullName } pageDesign { itemId name } }
        }
      `, { where });
      return data?.tenantTemplates;
    },

    async createTemplate(parent, name, opts) {
      const input: any = { parent, name };
      if (opts?.database) input.database = opts.database;
      if (opts?.language) input.language = opts.language;
      if (opts?.icon) input.icon = opts.icon;
      if (opts?.baseTemplates) input.baseTemplates = opts.baseTemplates;
      if (opts?.sections) input.sections = opts.sections;
      if (opts?.createStandardValuesItem != null) input.createStandardValuesItem = opts.createStandardValuesItem;
      const data = await gql(`
        mutation CreateItemTemplate($input: CreateItemTemplateInput!) {
          createItemTemplate(input: $input) { itemTemplate { templateId name fullName } }
        }
      `, { input });
      return data?.createItemTemplate?.itemTemplate;
    },

    async updateTemplate(templateId, opts) {
      const input: any = { templateId, ...opts };
      const data = await gql(`
        mutation UpdateItemTemplate($input: UpdateItemTemplateInput!) {
          updateItemTemplate(input: $input) { itemTemplate { templateId name fullName } }
        }
      `, { input });
      return data?.updateItemTemplate?.itemTemplate;
    },

    async deleteTemplate(templateId, opts) {
      const input: any = { templateId };
      if (opts?.database) input.database = opts.database;
      const data = await gql(`
        mutation DeleteItemTemplate($input: DeleteItemTemplateInput!) {
          deleteItemTemplate(input: $input) { successful }
        }
      `, { input });
      return data?.deleteItemTemplate;
    },

    async createTemplateFolder(parent, name, opts) {
      const input: any = { parent, name };
      if (opts?.database) input.database = opts.database;
      if (opts?.language) input.language = opts.language;
      const data = await gql(`
        mutation CreateItemTemplateFolder($input: CreateItemTemplateFolderInput!) {
          createItemTemplateFolder(input: $input) { item { itemId name path } }
        }
      `, { input });
      return data?.createItemTemplateFolder?.item;
    },

    // ── 7. Sites & Solutions ─────────────────────────────

    async getSite(name) {
      const data = await gql(`
        query GetSite($name: String!) {
          site(siteName: $name) {
            name hostName language rootPath startPath contentStartPath
            database { name } contentDatabase { name } contentLanguage { name }
            rootItem { itemId name path } startItem { itemId name path }
            properties { key value }
          }
        }
      `, { name });
      return data?.site;
    },

    async getSites(includeSystem) {
      const data = await gql(`
        query GetSites($include: Boolean) {
          sites(includeSystemSites: $include) { name hostName language rootPath }
        }
      `, { include: includeSystem ?? false });
      return data?.sites;
    },

    async getSiteCollections(opts) {
      const data = await gql(`
        query GetSiteCollections($input: DefaultSolutionInput) {
          siteCollections(input: $input) { id name displayName description collectionName collectionDescription created createdBy itemPath sortOrder sharedSites }
        }
      `, { input: opts ?? {} });
      return data?.siteCollections;
    },

    async getSolutionSites(opts) {
      const data = await gql(`
        query GetSolutionSites($input: SolutionSitesInput) {
          solutionSites(input: $input) {
            id name displayName description hostname language created sortOrder linkableSite
            rootItem { itemId name path }
            siteCollection { id name }
            languages { name }
            posMappings { name language }
          }
        }
      `, { input: opts ?? {} });
      return data?.solutionSites;
    },

    async searchSolutionSites(filter) {
      const data = await gql(`
        query SearchSolutionSites($input: SolutionSitesSearchInput) {
          solutionSitesSearch(input: $input) { nodes { siteRoot { itemId name path } sites { id name displayName } } }
        }
      `, { input: filter ? { filterStatement: filter } : {} });
      return data?.solutionSitesSearch?.nodes;
    },

    async getSolutionTemplates(opts) {
      const data = await gql(`
        query GetSolutionTemplates($input: DefaultSolutionInput) {
          solutionTemplates(input: $input) { id name description enabled builtInTemplate createdBy updated contents { key value } siteCollection { id name } }
        }
      `, { input: opts ?? {} });
      return data?.solutionTemplates;
    },

    async scaffoldSolution(input) {
      const data = await gql(`
        mutation ScaffoldSolution($input: CreateSolutionSiteInput!) {
          scaffoldSolution(input: $input) { job { handle name done } }
        }
      `, { input });
      return data?.scaffoldSolution;
    },

    async createSite(input) {
      const data = await gql(`
        mutation CreateSite($input: CreateSiteInput!) {
          createSite(input: $input) { job { handle name done } }
        }
      `, { input });
      return data?.createSite;
    },

    async createSiteCollection(input) {
      const data = await gql(`
        mutation CreateSiteCollection($input: CreateSiteCollectionInput!) {
          createSiteCollection(input: $input) { job { handle name done } }
        }
      `, { input });
      return data?.createSiteCollection;
    },

    async removeSite(input) {
      const data = await gql(`
        mutation RemoveSite($input: RemoveSiteInput!) {
          removeSite(input: $input) { job { handle name done } }
        }
      `, { input });
      return data?.removeSite;
    },

    async removeSiteCollection(input) {
      const data = await gql(`
        mutation RemoveSiteCollection($input: RemoveSiteCollectionInput!) {
          removeSiteCollection(input: $input) { job { handle name done } }
        }
      `, { input });
      return data?.removeSiteCollection;
    },

    async renameSite(input) {
      const data = await gql(`
        mutation RenameSite($input: RenameSiteInput!) {
          renameSite(input: $input) { job { handle name done } }
        }
      `, { input });
      return data?.renameSite;
    },

    async renameSiteCollection(input) {
      const data = await gql(`
        mutation RenameSiteCollection($input: RenameSiteCollectionInput!) {
          renameSiteCollection(input: $input) { job { handle name done } }
        }
      `, { input });
      return data?.renameSiteCollection;
    },

    async cloneSite(input) {
      const data = await gql(`
        mutation CloneSite($input: CloneSiteInput!) {
          cloneSite(input: $input) { job { handle name done } }
        }
      `, { input });
      return data?.cloneSite;
    },

    async updateSitesPos(input) {
      const data = await gql(`
        mutation UpdateSolutionSitesPos($input: UpdateSolutionSitesPosInput!) {
          updateSolutionSitesPos(input: $input) { result { id success } }
        }
      `, { input });
      return data?.updateSolutionSitesPos;
    },

    // ── 8. Languages & Archiving ─────────────────────────

    async getLanguage(name) {
      const data = await gql(`
        query GetLanguage($name: String!) {
          language(name: $name) { name displayName englishName nativeName iso }
        }
      `, { name });
      return data?.language;
    },

    async getLanguages(db) {
      const data = await gql(`
        query GetLanguages($db: String) {
          languages(databaseName: $db) { nodes { name displayName englishName nativeName iso } }
        }
      `, { db });
      return data?.languages?.nodes;
    },

    async getSupportedLanguages() {
      const data = await gql(`query { supportedLanguages { nodes { name language charset codePage customCode encoding regionCode spellChecker } } }`);
      return data?.supportedLanguages?.nodes;
    },

    async getFallbackLanguage(name, db) {
      const data = await gql(`
        query GetFallbackLanguage($name: String!, $db: String) {
          fallbackLanguage(name: $name, databaseName: $db) { name displayName englishName nativeName iso }
        }
      `, { name, db });
      return data?.fallbackLanguage;
    },

    async getArchivedItem(archivalId, archiveName) {
      const where: any = { archivalId };
      if (archiveName) where.archiveName = archiveName;
      const data = await gql(`
        query GetArchivedItem($where: ArchiveItemQueryInput) {
          archivedItem(where: $where) {
            archivalId itemId name database originalLocation archivedBy archivedDate parentId
            versions { versionId language version archivedBy archivalDate }
          }
        }
      `, { where });
      return data?.archivedItem;
    },

    async getArchivedItems(opts) {
      const data = await gql(`
        query GetArchivedItems($archiveName: String, $pageIndex: Int, $pageSize: Int) {
          archivedItems(archiveName: $archiveName, pageIndex: $pageIndex, pageSize: $pageSize) {
            archivalId itemId name database originalLocation archivedBy archivedDate
          }
        }
      `, { archiveName: opts?.archiveName, pageIndex: opts?.pageIndex, pageSize: opts?.pageSize });
      return data?.archivedItems;
    },

    async addLanguage(input) {
      const data = await gql(`
        mutation AddLanguage($input: AddLanguageInput!) {
          addLanguage(input: $input) { successful }
        }
      `, { input });
      return data?.addLanguage;
    },

    async deleteLanguage(name, db) {
      const input: any = { name };
      if (db) input.database = db;
      const data = await gql(`
        mutation DeleteLanguage($input: DeleteLanguageInput!) {
          deleteLanguage(input: $input) { successful }
        }
      `, { input });
      return data?.deleteLanguage;
    },

    async deleteLanguages(names, db) {
      const input: any = { names };
      if (db) input.database = db;
      const data = await gql(`
        mutation DeleteLanguages($input: DeleteLanguagesInput!) {
          deleteLanguages(input: $input) { successful }
        }
      `, { input });
      return data?.deleteLanguages;
    },

    async archiveItem(idOrPath, archiveName) {
      const input: any = {};
      if (isId(idOrPath)) input.itemId = idOrPath; else input.itemPath = idOrPath;
      if (archiveName) input.archiveName = archiveName;
      const data = await gql(`
        mutation ArchiveItem($input: ArchiveItemInput!) {
          archiveItem(input: $input) { archiveItemId }
        }
      `, { input });
      return data?.archiveItem;
    },

    async archiveVersion(idOrPath, language, version, archiveName) {
      const input: any = { language };
      if (isId(idOrPath)) input.itemId = idOrPath; else input.itemPath = idOrPath;
      if (version != null) input.version = version;
      if (archiveName) input.archiveName = archiveName;
      const data = await gql(`
        mutation ArchiveVersion($input: ArchiveVersionInput!) {
          archiveVersion(input: $input) { archiveVersionId }
        }
      `, { input });
      return data?.archiveVersion;
    },

    async setItemArchiveDate(idOrPath, date) {
      const input: any = { archiveDate: date ?? null };
      if (isId(idOrPath)) input.itemId = idOrPath; else input.itemPath = idOrPath;
      const data = await gql(`
        mutation SetItemArchiveDate($input: SetItemArchiveDateInput!) {
          setItemArchiveDate(input: $input) { successful }
        }
      `, { input });
      return data?.setItemArchiveDate;
    },

    async setVersionArchiveDate(idOrPath, language, date, version) {
      const input: any = { language, archiveDate: date ?? null };
      if (isId(idOrPath)) input.itemId = idOrPath; else input.itemPath = idOrPath;
      if (version != null) input.version = version;
      const data = await gql(`
        mutation SetVersionArchiveDate($input: SetVersionArchiveDateInput!) {
          setVersionArchiveDate(input: $input) { successful }
        }
      `, { input });
      return data?.setVersionArchiveDate;
    },

    async restoreArchivedItem(archivalId, archiveName) {
      const input: any = { archivalId };
      if (archiveName) input.archiveName = archiveName;
      const data = await gql(`
        mutation RestoreArchivedItem($input: RestoreArchivedItemInput!) {
          restoreArchivedItem(input: $input) { successful }
        }
      `, { input });
      return data?.restoreArchivedItem;
    },

    async restoreArchivedVersion(versionId, archiveName) {
      const input: any = { versionId };
      if (archiveName) input.archiveName = archiveName;
      const data = await gql(`
        mutation RestoreArchivedVersion($input: RestoreArchivedVersionInput!) {
          restoreArchivedVersion(input: $input) { successful }
        }
      `, { input });
      return data?.restoreArchivedVersion;
    },

    async deleteArchivedItem(archivalId, archiveName) {
      const input: any = { archivalId };
      if (archiveName) input.archiveName = archiveName;
      const data = await gql(`
        mutation DeleteArchivedItem($input: DeleteArchivedItemInput!) {
          deleteArchivedItem(input: $input) { successful }
        }
      `, { input });
      return data?.deleteArchivedItem;
    },

    async deleteArchivedVersion(versionId, archiveName) {
      const input: any = { versionId };
      if (archiveName) input.archiveName = archiveName;
      const data = await gql(`
        mutation DeleteArchivedVersion($input: DeleteArchivedVersionInput!) {
          deleteArchivedVersion(input: $input) { successful }
        }
      `, { input });
      return data?.deleteArchivedVersion;
    },

    async emptyArchive(archiveName) {
      const data = await gql(`
        mutation EmptyArchive($input: EmptyArchiveInput!) {
          emptyArchive(input: $input) { successful }
        }
      `, { input: { archiveName } });
      return data?.emptyArchive;
    },

    // ── 9. Security ──────────────────────────────────────

    async getCurrentUser() {
      const data = await gql(`query { currentUser { name displayName localName isAdministrator isAuthenticated domain { name } profile { email fullName clientLanguage contentLanguage } roles { name displayName } } }`);
      return data?.currentUser;
    },

    async getUser(userName) {
      const data = await gql(`
        query GetUser($userName: String!) {
          user(userName: $userName) { name displayName localName isAdministrator isAuthenticated domain { name } profile { email fullName disabled lastLoginDate } roles { name } }
        }
      `, { userName });
      return data?.user;
    },

    async getUsers() {
      const data = await gql(`query { users { nodes { name displayName localName isAdministrator domain { name } } } }`);
      return data?.users?.nodes;
    },

    async getRole(roleName) {
      const data = await gql(`
        query GetRole($roleName: String!) {
          role(roleName: $roleName) { name displayName localName description isEveryone isGlobal domain { name } members { nodes { name accountType } } memberOf { nodes { name accountType } } }
        }
      `, { roleName });
      return data?.role;
    },

    async getRoles() {
      const data = await gql(`query { roles { nodes { name displayName localName description isEveryone isGlobal domain { name } } } }`);
      return data?.roles?.nodes;
    },

    async getDomain(domainName) {
      const data = await gql(`
        query GetDomain($domainName: String!) {
          domain(domainName: $domainName) { name accountPrefix isDefault ensureAnonymousUser anonymousUserName everyoneRoleName defaultProfileItemId accountNameValidation anonymousUserEmailPattern }
        }
      `, { domainName });
      return data?.domain;
    },

    async getDomains() {
      const data = await gql(`query { domains { nodes { name accountPrefix isDefault ensureAnonymousUser } } }`);
      return data?.domains?.nodes;
    },

    async getSelectionProfiles() {
      const data = await gql(`query { selectionProfiles { nodes { name profileId } } }`);
      return data?.selectionProfiles?.nodes;
    },

    async createUser(input) {
      const data = await gql(`
        mutation CreateUser($input: CreateUserInput!) {
          createUser(input: $input) { user { name displayName } }
        }
      `, { input });
      return data?.createUser?.user;
    },

    async updateUser(input) {
      const data = await gql(`
        mutation UpdateUser($input: UpdateUserInput!) {
          updateUser(input: $input) { user { name displayName } }
        }
      `, { input });
      return data?.updateUser?.user;
    },

    async deleteUser(userName) {
      const data = await gql(`
        mutation DeleteUser($input: DeleteUserInput!) {
          deleteUser(input: $input) { successful }
        }
      `, { input: { userName } });
      return data?.deleteUser;
    },

    async unlockUser(userName) {
      const data = await gql(`
        mutation UnlockUser($input: UnlockUserInput!) {
          unlockUser(input: $input) { successful }
        }
      `, { input: { userName } });
      return data?.unlockUser;
    },

    async enableUser(userName) {
      const data = await gql(`
        mutation EnableUser($input: EnableUserInput!) {
          enableUser(input: $input) { successful }
        }
      `, { input: { userName } });
      return data?.enableUser;
    },

    async disableUser(userName) {
      const data = await gql(`
        mutation DisableUser($input: DisableUserInput!) {
          disableUser(input: $input) { successful }
        }
      `, { input: { userName } });
      return data?.disableUser;
    },

    async resetUserSettings(userName) {
      const data = await gql(`
        mutation ResetUserSettings($input: ResetUserSettingsInput!) {
          resetUserSettings(input: $input) { successful }
        }
      `, { input: { userName } });
      return data?.resetUserSettings;
    },

    async changeUserPassword(userName, oldPw, newPw) {
      const data = await gql(`
        mutation ChangeUserPassword($input: ChangeUserPasswordInput!) {
          changeUserPassword(input: $input) { successful }
        }
      `, { input: { userName, oldPassword: oldPw, newPassword: newPw } });
      return data?.changeUserPassword;
    },

    async createDomain(domainName, local) {
      const input: any = { domainName };
      if (local != null) input.locallyManagedDomain = local;
      const data = await gql(`
        mutation CreateDomain($input: CreateDomainInput!) {
          createDomain(input: $input) { domain { name accountPrefix isDefault } }
        }
      `, { input });
      return data?.createDomain?.domain;
    },

    async deleteDomain(domainName) {
      const data = await gql(`
        mutation DeleteDomain($input: DeleteDomainInput!) {
          deleteDomain(input: $input) { successful }
        }
      `, { input: { domainName } });
      return data?.deleteDomain;
    },

    async createRole(roleName) {
      const data = await gql(`
        mutation CreateRole($input: CreateRoleInput!) {
          createRole(input: $input) { role { name displayName } }
        }
      `, { input: { roleName } });
      return data?.createRole?.role;
    },

    async deleteRole(roleName) {
      const data = await gql(`
        mutation DeleteRole($input: DeleteRoleInput!) {
          deleteRole(input: $input) { successful }
        }
      `, { input: { roleName } });
      return data?.deleteRole;
    },

    async addRoleToRoles(roleName, parentRoles) {
      const data = await gql(`
        mutation AddRoleToRoles($input: AddRoleToRolesInput!) {
          addRoleToRoles(input: $input) { successful }
        }
      `, { input: { roleName, parentRoles } });
      return data?.addRoleToRoles;
    },

    async deleteRoleFromRoles(roleName, parentRoles) {
      const data = await gql(`
        mutation DeleteRoleFromRoles($input: DeleteRoleFromRolesInput!) {
          deleteRoleFromRoles(input: $input) { successful }
        }
      `, { input: { roleName, parentRoles } });
      return data?.deleteRoleFromRoles;
    },

    async addAccountsToRole(roleName, opts) {
      const data = await gql(`
        mutation AddAccountsToRole($input: AddAccountsToRoleInput!) {
          addAccountsToRole(input: $input) { successful }
        }
      `, { input: { roleName, users: opts?.users, roles: opts?.roles } });
      return data?.addAccountsToRole;
    },

    async deleteAccountsFromRole(roleName, opts) {
      const data = await gql(`
        mutation DeleteAccountsFromRole($input: DeleteAccountsFromRoleInput!) {
          deleteAccountsFromRole(input: $input) { successful }
        }
      `, { input: { roleName, users: opts?.users, roles: opts?.roles } });
      return data?.deleteAccountsFromRole;
    },

    // ── 10. Presentation & Meta ──────────────────────────

    async getAvailableRenderings(opts) {
      const where: any = {};
      if (opts?.database) where.database = opts.database;
      if (opts?.renderingId) where.renderingId = opts.renderingId;
      if (opts?.siteRootItemId) where.siteRootItemId = opts.siteRootItemId;
      const data = await gql(`
        query GetAvailableRenderings($where: GetRenderingsInput) {
          availableRenderings(where: $where) {
            itemId name path displayName
            datasourceTemplate { templateId name }
            renderingParametersTemplate { templateId name }
          }
        }
      `, { where });
      return data?.availableRenderings;
    },

    async getPageDesigns(siteName, opts) {
      const where: any = { siteName };
      if (opts?.database) where.database = opts.database;
      const data = await gql(`
        query GetPageDesigns($where: DefaultPresentationInput) {
          pageDesigns(where: $where) { siteName pageDesign { itemId name path displayName } }
        }
      `, { where });
      return data?.pageDesigns;
    },

    async getPartialDesigns(siteName, opts) {
      const where: any = { siteName };
      if (opts?.database) where.database = opts.database;
      const data = await gql(`
        query GetPartialDesigns($where: DefaultPresentationInput) {
          partialDesigns(where: $where) { siteName partialDesign { itemId name path displayName } }
        }
      `, { where });
      return data?.partialDesigns;
    },

    async getPageBranchesRoots(siteName, opts) {
      const where: any = { siteName };
      if (opts?.database) where.database = opts.database;
      const data = await gql(`
        query GetPageBranchesRoots($where: DefaultPageBranchesInput) {
          pageBranchesRoots(where: $where) { siteName root { itemId name path } }
        }
      `, { where });
      return data?.pageBranchesRoots;
    },

    async getDatabases() {
      const data = await gql(`query { databases { nodes { name } } }`);
      return data?.databases?.nodes;
    },

    async getMeta() {
      const data = await gql(`query { meta { version xMVersion } }`);
      return data?.meta;
    },

    async configurePageDesigns(siteName, mapping, opts) {
      const input: any = { siteName, mapping };
      if (opts?.database) input.database = opts.database;
      const data = await gql(`
        mutation ConfigurePageDesigns($input: ConfigurePageDesignsInput!) {
          configurePageDesigns(input: $input)
        }
      `, { input });
      return data?.configurePageDesigns;
    },
  };
}
