import { Transform } from "node:stream";

export const createMapStream = () => {
  return new Transform({
    transform(chunk, encodging, callback) {
      const lines = chunk.toString().split(/\r?\n/);

      const reversedLines = lines.map((line) =>
        line.split("").reverse().join(""),
      );

      this.push(reversedLines.join("\n") + "\n");

      callback();
    },
  });
};
