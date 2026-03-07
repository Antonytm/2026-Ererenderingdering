import type { NextConfig } from "next";
import { execSync } from "child_process";

const gitBranch = (() => {
  try {
    return execSync("git branch --show-current", { encoding: "utf-8" }).trim();
  } catch {
    return "unknown";
  }
})();

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  env: {
    NEXT_PUBLIC_GIT_BRANCH: gitBranch,
  },
};

export default nextConfig;
