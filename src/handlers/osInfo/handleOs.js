import os from "node:os";

const handleOs = (flag) => {
  switch (flag) {
    case "--EOL":
      console.log(`System default EOL: ${JSON.stringify(os.EOL)}`);
      break;

    case "--cpus":
      const cpus = os.cpus();
      const numCpus = cpus.length;
      console.log(`Overall amount of logical CPUs: ${numCpus}`);
      cpus.forEach((cpu, index) => {
        const model = cpu.model.trim();
        const speedGHz = (cpu.speed / 1000).toFixed(2);
        console.log(
          `  CPU ${index + 1}: Model: ${model}, Clock Rate: ${speedGHz} GHz`
        );
      });
      break;

    case "--homedir":
      const homeDirectory = os.homedir();
      console.log(`Home Directory: ${homeDirectory}`);
      break;

    case "--username":
      try {
        const userInfo = os.userInfo();
        console.log(`System Username: ${userInfo.username}`);
      } catch (error) {
        console.error("Failed to retrieve system user info:", error);
        throw new Error("Operation failed");
      }
      break;

    case "--architecture":
      const architecture = os.arch();
      console.log(`CPU Architecture: ${architecture}`);
      break;

    default:
      throw new Error(`Invalid input`);
  }
};

export { handleOs };
