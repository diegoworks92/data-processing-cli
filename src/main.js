import readline from "node:readline";
import { homedir } from "node:os";
import { up, cd, ls } from "./navigation.js";
import { parseArgs } from "./utils/argParser.js";
import { csvToJson } from "./commands/csvToJson.js";
import { createSortStream } from "./commands/sort.js";
import { createFilterStream } from "./commands/filter.js";
import { createUniqueStream } from "./commands/unique.js";
import { createMapStream } from "./commands/map.js";
import { pipeline } from "node:stream/promises";

let currentDir = homedir();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

console.log("Welcome to Data Processing CLI!");
console.log(`You are currently in ${currentDir}`);
rl.prompt();

rl.on("line", async (line) => {
  const input = line.trim();
  if (!input) {
    console.log(`You are currently in ${currentDir}`);
    rl.prompt();
    return;
  }

  const parts = input.split(/\s+/);
  const command = parts[0];
  const args = parseArgs(parts);

  try {
    switch (command) {
      case "up":
        currentDir = up(currentDir);
        break;

      case "cd":
        if (!parts[1]) {
          console.log("Invalid input");
        } else {
          currentDir = await cd(currentDir, parts[1]);
        }
        break;

      case "ls":
        const files = await ls(currentDir);
        files.forEach((f) => {
          console.log(
            `${f.name.padEnd(30)} [${f.isDirectory() ? "folder" : "file"}]`,
          );
        });
        break;

      case "csv-to-json":
        if (!args.input || !args.output) {
          console.log("Invalid input");
        } else {
          await csvToJson(currentDir, args.input, args.output);
        }
        break;

      case "sort":
      case "filter":
      case "unique":
      case "map":
        const commandArgs = {
          action: command,
          field: args.field || null,
        };

        let transform;
        if (command === "sort") transform = createSortStream(commandArgs);
        if (command === "filter") transform = createFilterStream(commandArgs);
        if (command === "unique") transform = createUniqueStream(commandArgs);
        if (command === "map") transform = createMapStream(commandArgs);

        console.log(`Processing ${command}... (Type data then press Ctrl+D)`);
        await pipeline(process.stdin, transform, process.stdout);
        break;

      case ".exit":
        rl.close();
        return;

      default:
        console.log("Invalid input");
    }
  } catch (err) {
    console.log("Operation failed");
  }

  console.log(`You are currently in ${currentDir}`);
  rl.prompt();
}).on("close", () => {
  console.log("Thank you for using Data Processing CLI!");
  process.exit(0);
});
