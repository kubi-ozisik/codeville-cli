import chalk from "chalk";
import fs from "fs-extra";

export async function createFile(
  filePath: string,
  content: string,
  append: boolean = false
): Promise<void> {
  try {
    if (append) {
      await fs.appendFile(filePath, content, "utf8");
    } else {
      await fs.writeFile(filePath, content, "utf8");
    }
    console.log(chalk.green(`${append ? "Updated" : "Created"} ${filePath}`));
  } catch (error) {
    console.error(
      `Error ${append ? "updating" : "creating"} file: ${filePath}`,
      error
    );
    throw error;
  }
}
