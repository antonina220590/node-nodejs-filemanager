export function parseInput(line) {
  const trimmedLine = line.trim();
  const parts = trimmedLine.split(" ").filter((part) => part !== "");
  const command = parts[0] || "";
  const args = parts.slice(1);
  return { command, args };
}
