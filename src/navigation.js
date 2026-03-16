import path from "node:path";
import fs from "node:fs/promises";

export const up = (currentDir) => path.resolve(currentDir, "..");

export const cd = async (currentDir, targetPath) => {
  const newPath = path.resolve(currentDir, targetPath || "");
  await fs.access(newPath);
  const stats = await fs.stat(newPath);
  if (!stats.isDirectory()) throw new Error();
  return newPath;
};

export const ls = async (currentDir) => {
  const files = await fs.readdir(currentDir, { withFileTypes: true });
  return files.sort((a, b) => {
    if (a.isDirectory() === b.isDirectory())
      return a.name.localeCompare(b.name);
    return a.isDirectory() ? -1 : 1;
  });
};
