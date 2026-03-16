import path from "node:path";
import fs from "node:fs/promises";

export const resolvePath = async (currentDir, targetPath) => {
  const resolved = path.isAbsolute(targetPath)
    ? targetPath
    : path.resolve(currentDir, targetPath);
  return resolved;
};
