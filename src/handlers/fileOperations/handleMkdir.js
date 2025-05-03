import path from "node:path";
import { mkdir } from "node:fs/promises";

const handleMkdir = async (currentDir, newDirNameArg) => {
  if (
    !newDirNameArg ||
    newDirNameArg.includes("/") ||
    newDirNameArg.includes("\\")
  ) {
    throw new Error("Invalid input: Invalid directory name provided.");
  }

  const targetPath = path.join(currentDir, newDirNameArg);

  try {
    await mkdir(targetPath);
  } catch (error) {
    if (error.code === "EEXIST") {
      throw new Error("Operation failed");
    } else {
      throw new Error("Operation failed");
    }
  }
};

export { handleMkdir };
