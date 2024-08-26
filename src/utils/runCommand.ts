import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function runCommand(command: string): Promise<void> {
  try {
    const { stdout, stderr } = await execAsync(command);
    console.log(stdout);
    console.error(stderr);
  } catch (error) {
    console.error(`Error executing command: ${command}`, error);
    throw error;
  }
}
