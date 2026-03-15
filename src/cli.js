import { pipeline } from "node:stream/promises";
import { parseArgs } from "./parser.js";
import { createPipeline } from "./pipeline.js";

const args = parseArgs();

try {
  const transformStream = createPipeline(args);
  await pipeline(process.stdin, transformStream, process.stdout);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
