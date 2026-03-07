import { create } from "zustand";
import { persist } from "zustand/middleware";

const DEFAULT_CODE = `// Sitecore JS Scripting Console
// Use Sitecore.* (or sc.* shorthand), print(), and render()
// Press Ctrl+Enter to run

const ctx = await sc.getContext();
print("Application context loaded:");
print(JSON.stringify(ctx, null, 2));
`;

interface EditorState {
  code: string;
  setCode: (code: string) => void;
}

export const useEditorStore = create<EditorState>()(
  persist(
    (set) => ({
      code: DEFAULT_CODE,
      setCode: (code) => set({ code }),
    }),
    { name: "ide-editor-store" }
  )
);
