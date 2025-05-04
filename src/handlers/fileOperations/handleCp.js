import path from "node:path";
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { stat } from "node:fs/promises";

const handleCp = async (currentDir, sourceArg, destinationDirArg) => {
  const sourcePath = path.resolve(currentDir, sourceArg);
  const destinationDirPath = path.resolve(currentDir, destinationDirArg);

  const sourceFilename = path.basename(sourcePath);
  const fullDestinationPath = path.join(destinationDirPath, sourceFilename);

  if (sourcePath === fullDestinationPath) {
    throw new Error(
      "Operation failed: Source and destination are the same file."
    );
  }

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

    try {
      const destDirStats = await stat(destinationDirPath);
      if (!destDirStats.isDirectory()) {
        throw new Error("Destination is not a directory.");
      }
    } catch (err) {
      throw new Error("Operation failed");
    }

    readable = createReadStream(sourcePath);
    writable = createWriteStream(fullDestinationPath, { flags: "wx" });
    await pipeline(readable, writable);
  } catch (error) {
    if (error.code === "EEXIST") {
      throw new Error("Operation failed");
    }
    throw new Error("Operation failed");
  }
};

export { handleCp };
