import { createReadStream } from "node:fs";
import { resolvePath } from "../utils/pathResolver.js";

export const count = async (currentDir, input) => {
  const inputPath = await resolvePath(currentDir, input);
  let lines = 0,
    words = 0,
    chars = 0;

  const stream = createReadStream(inputPath);
  for await (const chunk of stream) {
    const text = chunk.toString();
    chars += text.length;
    lines += (text.match(/\n/g) || []).length;
    words += (text.match(/\S+/g) || []).length;
  }

  console.log(`Lines: ${lines}\nWords: ${words}\nCharacters: ${chars}`);
};
