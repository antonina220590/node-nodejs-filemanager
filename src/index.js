import { argv, stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline/promises";

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
  return username;
};

const handleExit = (username) => {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`); // \n для новой строки на всякий случай
  process.exit(0);
};

const username = initializeApp();

const rl = readline.createInterface({ input, output, prompt: "" });

process.on("SIGINT", () => {
  handleExit(username);
});

output.write("> ");

rl.on("line", (line) => {
  const trimmedLine = line.trim();
  if (trimmedLine === ".exit") {
    rl.close();
    return;
  }
  console.log(`Unknown command: ${trimmedLine}`);
  output.write("> ");
});

rl.on("close", () => {
  handleExit(username);
});
