import path from "node:path";
import { stat } from "node:fs/promises";
import { createReadStream, createWriteStream } from "node:fs";
import zlib from "node:zlib";
import { pipeline } from "node:stream/promises";

const handleDecompress = async (currentDir, sourceArg, destinationArg) => {
  const sourcePath = path.resolve(currentDir, sourceArg);
  const destinationPath = path.resolve(currentDir, destinationArg);

  let readable;
  let writable;

  try {
    try {
      const sourceStats = await stat(sourcePath);
      if (!sourceStats.isFile()) {
        throw new Error("Source is not a file.");
      }
    } catch (err) {
      throw new Error("Operation failed");
    }

    readable = createReadStream(sourcePath);
    const brotliDecompress = zlib.createBrotliDecompress();
    writable = createWriteStream(destinationPath, { flags: "wx" });

    await pipeline(readable, brotliDecompress, writable);
  } catch (error) {
    if (error.code === "EEXIST") {
      throw new Error("Operation failed");
    }
    throw new Error("Operation failed");
  }
};

export { handleDecompress };
