import { Transform } from "node:stream";

export const createSortStream = (args) => {
  let buffer = "";

  const fieldIndex = args.field ? parseInt(args.field) - 1 : null;

  return new Transform({
    transform(chunk, encoding, callback) {
      buffer += chunk.toString();
      callback();
    },

    flush(callback) {
      const lines = buffer.split(/\r?\n/).filter((line) => line.trim() !== "");

      lines.sort((a, b) => {
        let valA = a;
        let valB = b;

        if (fieldIndex !== null) {
          valA = a.split(/\s+/)[fieldIndex] || "";
          valB = b.split(/\s+/)[fieldIndex] || "";
        }

        const numA = parseFloat(valA);
        const numB = parseFloat(valB);

        if (!isNaN(numA) && !isNaN(numB)) {
          return numA - numB;
        }

        return valA.localeCompare(valB);
      });

      this.push(lines.join("\n") + "\n");

      callback();
    },
  });
};
