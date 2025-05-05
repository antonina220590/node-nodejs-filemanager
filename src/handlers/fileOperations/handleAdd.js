import path from "node:path";
import { writeFile } from "node:fs/promises";

const handleAdd = async (currentDir, newFileNameArg) => {
  if (
    !newFileNameArg ||
    newFileNameArg.includes("/") ||
    newFileNameArg.includes("\\")
  ) {
    throw new Error("Invalid input: Invalid filename provided.");
  }
  const targetPath = path.join(currentDir, newFileNameArg);

  try {
    await writeFile(targetPath, "", { flag: "wx" });
  } catch (error) {
    if (error.code === "EEXIST") {
      throw new Error("Operation failed");
    } else {
      throw new Error("Operation failed");
    }
  }
};

export { handleAdd };
