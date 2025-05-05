import { handleUp } from "../handlers/navigation/navigationUp.js";
import { handleCd } from "../handlers/navigation/navigationCd.js";
import { handleLs } from "../handlers/navigation/navigationLs.js";
import { handleCat } from "../handlers/fileOperations/handleCat.js";
import { handleAdd } from "../handlers/fileOperations/handleAdd.js";
import { handleMkdir } from "../handlers/fileOperations/handleMkdir.js";
import { handleRn } from "../handlers/fileOperations/handleRn.js";
import { handleCp } from "../handlers/fileOperations/handleCp.js";
import { handleMv } from "../handlers/fileOperations/handleMv.js";
import { handleRm } from "../handlers/fileOperations/handleRm.js";
import { handleOs } from "../handlers/osInfo/handleOs.js";
import { handleHash } from "../handlers/fileOperations/handleHash.js";
import { handleCompress } from "../handlers/fileOperations/handleCompress.js";
import { handleDecompress } from "../handlers/fileOperations/handleDecompress.js";

export async function routeCommand(parsedInput, currentDirectory) {
  const { command, args } = parsedInput;
  let newDirectory = currentDirectory;
  switch (command) {
    case "up":
      if (args.length > 0) {
        throw new Error(
          'Invalid input: "up" command does not accept arguments.'
        );
      }
      newDirectory = handleUp(currentDirectory);
      break;

    case "cd":
      if (args.length !== 1 || !args[0]) {
        throw new Error(
          'Invalid input: "cd" command requires exactly one path argument.'
        );
      }
      newDirectory = await handleCd(currentDirectory, args[0]);
      break;

    case "ls":
      if (args.length > 0) {
        throw new Error(
          'Invalid input: "ls" command does not accept arguments.'
        );
      }
      await handleLs(currentDirectory);
      break;

    case "cat":
      if (args.length !== 1 || !args[0]) {
        throw new Error(
          'Invalid input: "cat" command requires exactly one file path argument.'
        );
      }
      await handleCat(currentDirectory, args[0]);
      break;

    case "add":
      if (args.length !== 1 || !args[0]) {
        throw new Error(
          'Invalid input: "add" command requires exactly one filename argument.'
        );
      }
      await handleAdd(currentDirectory, args[0]);
      break;

    case "mkdir":
      if (args.length !== 1 || !args[0]) {
        throw new Error(
          'Invalid input: "mkdir" command requires exactly one directory name argument.'
        );
      }
      await handleMkdir(currentDirectory, args[0]);
      break;

    case "rn":
      if (args.length !== 2 || !args[0] || !args[1]) {
        throw new Error(
          'Invalid input: "rn" command requires source file and new filename arguments.'
        );
      }
      if (args[1].includes("/") || args[1].includes("\\")) {
        throw new Error(
          "Invalid input: New filename cannot contain path separators."
        );
      }
      await handleRn(currentDirectory, args[0], args[1]);
      break;

    case "cp":
      if (args.length !== 2 || !args[0] || !args[1]) {
        throw new Error(
          'Invalid input: "cp" command requires source file and destination directory arguments.'
        );
      }
      await handleCp(currentDirectory, args[0], args[1]);
      break;

    case "mv":
      if (args.length !== 2 || !args[0] || !args[1]) {
        throw new Error(
          'Invalid input: "mv" command requires source file and destination directory arguments.'
        );
      }
      await handleMv(currentDirectory, args[0], args[1]);
      break;

    case "rm":
      if (args.length !== 1 || !args[0]) {
        throw new Error(
          'Invalid input: "rm" command requires exactly one file path argument.'
        );
      }
      await handleRm(currentDirectory, args[0]);
      break;

    case "os":
      if (args.length !== 1 || !args[0] || !args[0].startsWith("--")) {
        throw new Error(
          'Invalid input: "os" command requires exactly one flag argument (e.g. --EOL).'
        );
      }
      handleOs(args[0]);
      break;

    case "hash":
      if (args.length !== 1 || !args[0]) {
        throw new Error(
          'Invalid input: "hash" command requires exactly one file path argument.'
        );
      }
      await handleHash(currentDirectory, args[0]);
      break;

    case "compress":
      if (args.length !== 2 || !args[0] || !args[1]) {
        throw new Error(
          'Invalid input: "compress" command requires source file and destination path arguments.'
        );
      }
      await handleCompress(currentDirectory, args[0], args[1]);
      break;

    case "decompress":
      if (args.length !== 2 || !args[0] || !args[1]) {
        throw new Error(
          'Invalid input: "decompress" command requires source file and destination path arguments.'
        );
      }
      await handleDecompress(currentDirectory, args[0], args[1]);
      break;

    case "":
      break;

    default:
      throw new Error(`Invalid input: Unknown command "${command}"`);
  }
  return { newDirectory };
}
