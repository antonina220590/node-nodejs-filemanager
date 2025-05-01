import * as path from "node:path";
import { stat } from "node:fs/promises";

const handleCd = async (currentDir, targetDirArgs) => {
  const targetPath = path.resolve(currentDir, targetDirArgs);

  try {
    const stats = await stat(targetPath);
    if (stats.isDirectory()) {
      return targetPath;
    } else {
      throw new Error("Target is not a directory");
    }
  } catch (error) {
    throw new Error("Operation failed");
  }
};

export { handleCd };
