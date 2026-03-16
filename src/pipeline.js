import { createSortStream } from "./actions/sort.js";
import { createFilterStream } from "./actions/filter.js";
import { createMapStream } from "./actions/map.js";
import { createUniqueStream } from "./actions/unique.js";

export const createPipeline = (args) => {
  if (args.action === "sort") {
    return createSortStream(args);
  }

  if (args.action === "filter") {
    return createFilterStream(args);
  }

  if (args.action === "map") {
    return createMapStream(args);
  }

  if (args.action === "unique") {
    return createUniqueStream(args);
  }

  throw new Error("Unknown action");
};
