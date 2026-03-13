/* import { Transform } from "node:stream";

export const createSortStream = () => {
  let buffer = "";

  return new Transform({
    transform(chunk, encoding, callback) {
      buffer += chunk.toString();
      callback();
    },

    flush(callback) {
      const lines = buffer.split("\n");

      lines.sort();

      this.push(lines.join("\n"));

      callback();
    },
  });
};


 */
import { Transform } from "node:stream";

export const createSortStream = () => {
  let buffer = "";

  return new Transform({
    transform(chunk, encoding, callback) {
      buffer += chunk.toString();
      callback();
    },

    flush(callback) {
      const lines = buffer
        .trim()
        .split(/\r?\n/)
        .filter((line) => line.length > 0);

      lines.sort((a, b) => {
        const numA = parseFloat(a);
        const numB = parseFloat(b);

        if (!isNaN(numA) && !isNaN(numB)) {
          return numA - numB;
        }

        return a.localeCompare(b);
      });

      this.push(lines.join("\n") + "\n");

      callback();
    },
  });
};
