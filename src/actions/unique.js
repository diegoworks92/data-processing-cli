import { Transform } from "node:stream";

export const createUniqueStream = () => {
  let buffer = "";

  return new Transform({
    transform(chunk, encoding, callback) {
      buffer += chunk.toString();
      callback();
    },

    flush(callback) {
      const lines = buffer.split(/\r?\n/);

      const uniqueLines = [...new Set(lines)];
      const cleanLines = uniqueLines.filter((line) => line.trim() !== "");

      this.push(cleanLines.join("\n") + "\n");

      callback();
    },
  });
};
