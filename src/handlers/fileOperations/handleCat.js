import * as path from "node:path";
import { stat } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { stdout } from "node:process";

async function handleCat(currentDir, filePathArg) {
  const targetPath = path.resolve(currentDir, filePathArg);

  try {
    const stats = await stat(targetPath);
    if (!stats.isFile()) {
      throw new Error("Target is not a file");
    }
    const readableStream = createReadStream(targetPath, { encoding: "utf8" });
    stdout.write("\n");
    await pipeline(readableStream, stdout, { end: false });
    stdout.write("\n");
  } catch (error) {
    throw new Error("Operation failed");
  }
}

export { handleCat };
