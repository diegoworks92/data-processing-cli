export const parseArgs = () => {
  const args = process.argv.slice(2);

  const result = {};

  for (const arg of args) {
    const [key, value] = arg.split("=");

    if (key === "--action") {
      result.action = value;
    }

    if (key === "--field") {
      result.field = value;
    }
  }

  return result;
};
