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

    default:
      throw new Error(`Invalid input`);
  }
};

export { handleOs };
