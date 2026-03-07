import { ScriptingConsole } from "@/src/components/ScriptingConsole";
import { RequireSitecoreContext } from "@/src/components/require-sitecore-context";

export default function Home() {
  return (
    <RequireSitecoreContext>
      <ScriptingConsole />
    </RequireSitecoreContext>
  );
}
