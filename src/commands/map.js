import { Transform } from "node:stream";

export const createMapStream = (args) => {
  const fieldIndex = args.field ? parseInt(args.field) - 1 : null;

  return new Transform({
    transform(chunk, encoding, callback) {
      const lines = chunk.toString().split(/\r?\n/);

      const mappedLines = lines.map((line) => {
        if (!line.trim()) return line;

        if (fieldIndex !== null) {
          const columns = line.split(/\s+/);
          if (columns[fieldIndex]) {
            columns[fieldIndex] = columns[fieldIndex]
              .split("")
              .reverse()
              .join("");
            return columns.join(" ");
          }
          return line;
        }

        return line.split("").reverse().join("");
      });

      this.push(mappedLines.join("\n") + "\n");
      callback();
    },
  });
};
