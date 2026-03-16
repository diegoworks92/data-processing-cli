import { Transform } from "node:stream";

export const createUniqueStream = (args) => {
  let buffer = "";
  const fieldIndex = args.field ? parseInt(args.field) - 1 : null;

  return new Transform({
    transform(chunk, encoding, callback) {
      buffer += chunk.toString();
      callback();
    },

    flush(callback) {
      const lines = buffer.split(/\r?\n/).filter((line) => line.trim() !== "");
      const seenFields = new Map();

      for (const line of lines) {
        let key = line;

        if (fieldIndex !== null) {
          const parts = line.trim().split(/\s+/);
          key = parts[fieldIndex] !== undefined ? parts[fieldIndex] : line;
        }

        if (!seenFields.has(key)) {
          seenFields.set(key, line);
        }
      }

      const uniqueLines = Array.from(seenFields.values());

      if (uniqueLines.length > 0) {
        this.push(uniqueLines.join("\n") + "\n");
      }

      callback();
    },
  });
};
