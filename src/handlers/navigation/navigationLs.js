import * as path from "node:path";
import { readdir } from "node:fs/promises";

const handleLs = async (currentDir) => {
  try {
    const dirents = await readdir(currentDir, { withFileTypes: true });
    const folders = [];
    const others = [];

    for (const dirent of dirents) {
      if (dirent.isDirectory()) {
        folders.push({ Name: dirent.name, Type: "directory" });
      } else if (dirent.isFile()) {
        others.push({ Name: dirent.name, Type: "file" });
      } else if (dirent.isSymbolicLink()) {
        others.push({ Name: dirent.name, Type: "link" });
      } else if (dirent.isBlockDevice()) {
        others.push({ Name: dirent.name, Type: "blockDevice" });
      } else if (dirent.isCharacterDevice()) {
        others.push({ Name: dirent.name, Type: "charDevice" });
      } else if (dirent.isFIFO()) {
        others.push({ Name: dirent.name, Type: "fifo" });
      } else if (dirent.isSocket()) {
        others.push({ Name: dirent.name, Type: "socket" });
      } else {
        others.push({ Name: dirent.name, Type: "unknown" });
      }
    }

    folders.sort((a, b) => a.Name.localeCompare(b.Name));
    others.sort((a, b) => a.Name.localeCompare(b.Name));

    const list = [...folders, ...others];
    console.log("");
    console.table(list);
  } catch (error) {
    throw new Error("Operation failed");
  }
};

export { handleLs };
