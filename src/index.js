import { argv } from "node:process";

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
  return username;
};

const appUsername = initializeApp();
console.log(`Welcome to the File Manager, ${appUsername}!`);
