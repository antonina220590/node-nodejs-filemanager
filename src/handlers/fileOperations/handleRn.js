import path from "node:path";
import { stat, rename } from "node:fs/promises";

const handleRn = async (currentDir, sourceFileArg, newFileNameArg) => {
  if (
    !newFileNameArg ||
    newFileNameArg.includes("/") ||
    newFileNameArg.includes("\\")
  ) {
    throw new Error("Invalid input: Invalid new filename provided.");
  }

  const sourcePath = path.resolve(currentDir, sourceFileArg);
  const sourceDir = path.dirname(sourcePath);
  const targetPath = path.join(sourceDir, newFileNameArg);

  if (sourcePath === targetPath) {
    throw new Error("Invalid input: New filename is the same as the old one.");
  }

  try {
    let sourceStats;
    try {
      sourceStats = await stat(sourcePath);
    } catch (error) {
      if (error.code === "ENOENT") {
        throw new Error("Operation failed");
      }
      throw error;
    }
    if (!sourceStats.isFile()) {
      throw new Error("Operation failed");
    }
    try {
      await stat(targetPath);

      throw new Error("Operation failed");
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }

    await rename(sourcePath, targetPath);
  } catch (error) {
    if (error.message.startsWith("Invalid input")) throw error;
    throw new Error("Operation failed");
  }
};

export { handleRn };
