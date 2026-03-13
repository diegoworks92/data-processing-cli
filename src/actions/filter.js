import { Transform } from "node:stream";

export const createFilterStream = () => {
  return new Transform({
    transform(chunk, encoding, callback) {
      const content = chunk.toString();
      const lines = content.split(/\r?\n/);

      const filteredLines = lines.filter((line) => line.trim().length > 0);

      if (filteredLines.length > 0) {
        this.push(filteredLines.join("\n") + "\n");
      }

      callback();
    },
  });
};
