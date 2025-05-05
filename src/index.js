import { argv, stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline/promises";
import * as os from "node:os";

import { parseInput } from "./cli/parser.js";
import { routeCommand } from "./cli/router.js";

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
  if (trimmedLine === ".exit") {
    rl.close();
    return;
  }
  const parsed = parseInput(trimmedLine);
  if (parsed.command === "") {
    printCurrentDirectoryPrompt();
    return;
  }
  try {
    const result = await routeCommand(parsed, currentDirectory);
    currentDirectory = result.newDirectory;
  } catch (error) {
    if (error.message.startsWith("Invalid input")) {
      console.log(`\n${error.message}`);
    } else {
      console.log("\nOperation failed");
    }
  } finally {
    printCurrentDirectoryPrompt();
  }
});

rl.on("close", () => {
  handleExit(username);
});
