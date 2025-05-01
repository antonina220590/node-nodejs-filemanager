import * as path from "node:path";

const handleUp = (currentDir) => {
  const parentDir = path.resolve(currentDir, "..");
  if (currentDir !== parentDir) {
    return parentDir;
  } else {
    return currentDir;
  }
};

export { handleUp };
