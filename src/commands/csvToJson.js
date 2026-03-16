import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { Transform } from "node:stream";
import { resolvePath } from "../utils/pathResolver.js";

export const csvToJson = async (currentDir, input, output) => {
  const inputPath = await resolvePath(currentDir, input);
  const outputPath = await resolvePath(currentDir, output);

  let isFirstLine = true;
  let headers = [];

  const transform = new Transform({
    transform(chunk, encoding, callback) {
      const lines = chunk.toString().split(/\r?\n/);
      const results = [];

      for (let line of lines) {
        if (!line.trim()) continue;
        if (isFirstLine) {
          headers = line.split(",");
          isFirstLine = false;
          continue;
        }
        const values = line.split(",");
        const obj = {};
        headers.forEach((h, i) => (obj[h.trim()] = values[i]?.trim()));
        results.push(obj);
      }

      this.push(JSON.stringify(results, null, 2));
      callback();
    },
  });

  await pipeline(
    createReadStream(inputPath),
    transform,
    createWriteStream(outputPath),
  );
};
