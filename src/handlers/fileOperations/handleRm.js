import path from "node:path";
import { stat, unlink } from "node:fs/promises";

const handleRm = async (currentDir, filePathArg) => {
  const targetPath = path.resolve(currentDir, filePathArg);

  try {
    let stats;
    try {
      stats = await stat(targetPath);
    } catch (error) {
      throw new Error("Operation failed");
    }

    if (!stats.isFile()) {
      throw new Error("Operation failed");
    }
    await unlink(targetPath);
  } catch (error) {
    throw new Error("Operation failed");
  }
};

export { handleRm };
