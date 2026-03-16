export const parseArgs = (parts) => {
  const args = {};
  for (let i = 1; i < parts.length; i++) {
    if (parts[i].startsWith("--")) {
      const key = parts[i].replace("--", "");
      const value = parts[i + 1];
      if (value && !value.startsWith("--")) {
        args[key] = value;
        i++;
      } else {
        args[key] = true;
      }
    }
  }
  return args;
};
