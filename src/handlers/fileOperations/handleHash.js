import path from "node:path";
import { stat } from "node:fs/promises";
import { createReadStream } from "node:fs";
import crypto from "node:crypto";
import { pipeline } from "node:stream/promises";

const handleHash = async (currentDir, filePathArg) => {
  const targetPath = path.resolve(currentDir, filePathArg);
  try {
    const stats = await stat(targetPath);
    if (!stats.isFile()) {
      throw new Error("Target is not a file.");
    }

    const hash = crypto.createHash("sha256");
    const readable = createReadStream(targetPath);
    await pipeline(readable, hash);

    const hexDigest = hash.digest("hex");
    console.log(`\nHash: ${hexDigest}`);
  } catch (error) {
    throw new Error("Operation failed");
  }
};

export { handleHash };
