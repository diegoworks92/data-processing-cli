import { Transform } from "node:stream";

export const createFilterStream = (args) => {
  const fieldIndex = args.field ? parseInt(args.field) - 1 : null;

  return new Transform({
    transform(chunk, encoding, callback) {
      const lines = chunk.toString().split(/\r?\n/);

      const filteredLines = lines.filter((line) => {
        if (fieldIndex !== null) {
          const columns = line.split(/\s+/);
          const target = columns[fieldIndex];
          return target && target.trim().length > 0;
        }
        return line.trim().length > 0;
      });

      if (filteredLines.length > 0) {
        this.push(filteredLines.join("\n") + "\n");
      }
      callback();
    },
  });
};
