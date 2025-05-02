import { argv, stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline/promises";
import * as os from "node:os";

import { handleUp } from "./handlers/navigation/navigationUp.js";
import { handleCd } from "./handlers/navigation/navigationCd.js";
import { handleLs } from "./handlers/navigation/navigationLs.js";
import { handleCat } from "./handlers/fileOperations/handleCat.js";

const initializeApp = () => {
  let prefix = "--username=";
  let username = "Dear Guest";

  const nameArg = argv.find((arg) => arg.startsWith(prefix));
  if (nameArg) {
    const providedName = nameArg.substring(prefix.length);
    if (providedName) {
      username = providedName;
    }
  }
  console.log(`Welcome to the File Manager, ${username}!`);
  const initialDirectory = os.homedir();

  return {
    username: username,
    currentDirectory: initialDirectory,
  };
};

const handleExit = (username) => {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
};

const initialState = initializeApp();
let currentDirectory = initialState.currentDirectory;
const username = initialState.username;

const printCurrentDirectoryPrompt = () => {
  output.write(`\nYou are currently in ${currentDirectory}\n`);
  output.write("> ");
};

const rl = readline.createInterface({ input, output, prompt: "" });

process.on("SIGINT", () => {
  handleExit(username);
});

printCurrentDirectoryPrompt();

rl.on("line", async (line) => {
  const trimmedLine = line.trim();
  const parts = trimmedLine.split(" ").filter((part) => part !== "");
  const command = parts[0] || "";
  const args = parts.slice(1);

  try {
    if (command === "up") {
      if (args.length > 0) {
        throw new Error(
          'Invalid input: "up" command does not accept arguments.'
        );
      }
      currentDirectory = handleUp(currentDirectory);
    } else if (command === "cd") {
      if (args.length !== 1) {
        throw new Error(
          'Invalid input: "cd" command requires exactly one path argument.'
        );
      }
      currentDirectory = await handleCd(currentDirectory, args[0]);
    } else if (command === "ls") {
      if (args.length > 0)
        throw new Error(
          'Invalid input: "ls" command does not accept arguments.'
        );
      await handleLs(currentDirectory);
    } else if (command === "cat") {
      if (args.length !== 1 || !args[0]) {
        throw new Error(
          'Invalid input: "cat" command requires exactly one file path argument.'
        );
      }
      await handleCat(currentDirectory, args[0]);
    } else if (command === ".exit") {
      rl.close();
      return;
    } else if (command === "") {
    } else {
      throw new Error(
        `Invalid input: Unknown command "${command || "(empty)"}"`
      );
    }
  } catch (error) {
    if (error.message.startsWith("Invalid input")) {
      console.log(`\n${error.message}`);
    } else {
      console.log("\nOperation failed");
    }
  } finally {
    if (command !== ".exit") {
      printCurrentDirectoryPrompt();
    }
  }
});

rl.on("close", () => {
  handleExit(username);
});
