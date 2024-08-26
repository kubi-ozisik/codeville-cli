import chalk from "chalk";
import fs from "fs-extra";
import inquirer from "inquirer";
import path from "path";
import { initPrompts } from "../prompts/initPrompts.js";
import { ProjectConfig } from "../types";
import { createFile } from "../utils/createFile.js";
import { runCommand } from "../utils/runCommand.js";
import {
  devcontainerTemplate,
  dockerComposeTemplate,
  dockerfileTemplate,
  envSampleTemplate,
  gitignoreTemplate,
  modelsTemplate,
  pythonRequirementsTemplate,
  readmeTemplate,
} from "../utils/templates.js";
import { setupNextAuth } from "./setupNextAuth.js";

export async function init() {
  try {
    console.log("Starting initialization...");
    const answers = await inquirer.prompt(initPrompts);
    const config: ProjectConfig = answers as ProjectConfig;
    const projectPath = path.join(process.cwd(), config.projectName);
    console.log(`Project path: ${projectPath}`);

    // create the next project
    await runCommand(
      `npx create-next-app@latest ${config.projectName} --typescript --eslint --tailwind --app --src-dir --import-alias "@/*"`
    );

    console.log(`Changing directory to: ${projectPath}`);
    // cd into the project path
    process.chdir(projectPath);

    console.log("Creating .gitignore file...");
    // create a .gitignore file
    await createFile(path.join(projectPath, ".gitignore"), gitignoreTemplate);

    // Install and set up chosen ORM
    console.log(chalk.blue(`Installing ${config.orm}...`));
    await installORM(config.orm);

    console.log("Setting up NextAuth...");
    // Set up NextAuth
    await setupNextAuth(config);

    // set up backend API
    console.log(chalk.blue(`Setting up ${config.backendApi} backend`));
    await setupBackendAPI(config.backendApi);

    // Create models file
    await createFile(
      path.join(projectPath, "src", "models.ts"),
      modelsTemplate
    );

    // Create README file
    await createFile(
      path.join(projectPath, "README.md"),
      readmeTemplate(config)
    );

    // Create .env.sample file
    await createFile(path.join(projectPath, ".env.sample"), envSampleTemplate);

    // create devcontainer files
    const devContainerPath = path.join(process.cwd(), ".devcontainer");
    try {
      await fs.ensureDir(devContainerPath);
    } catch (error) {
      console.error("Error creating devcontainer directory:", error);
      throw error;
    }
    console.log(chalk.blue("Setting up devcontainer..."));
    await createFile(
      path.join(projectPath, ".devcontainer", "devcontainer.json"),
      devcontainerTemplate
    );
    await createFile(
      path.join(projectPath, ".devcontainer", "docker-compose.yml"),
      dockerComposeTemplate(config)
    );
    await createFile(
      path.join(projectPath, ".devcontainer", "Dockerfile"),
      dockerfileTemplate(config)
    );

    if (config.backendApi.startsWith("Python")) {
      await createFile(
        path.join(projectPath, "requirements.txt"),
        pythonRequirementsTemplate(config.backendApi)
      );
    }
    console.log(
      chalk.green(`
        Project initialized successfully!
          - Next.js with TypeScript
          - Tailwind CSS
          - ${config.orm}
          - NextAuth with Google and Credentials providers
          - ${config.backendApi} backend
          - DevContainer configuration
          - Docker Compose for development services (PostgreSQL, Redis)

        To get started:
          cd ${config.projectName}
          npm run dev

        To use the devcontainer:
          1. Install the "Remote - Containers" extension in VS Code
          2. Reopen the project in a container

        Please check the README.md file for further instructions on setting up your project and ORM.
      `)
    );
  } catch (error) {
    console.error("Error initializing the app:", error);
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    // Log current working directory
    console.log("Current working directory:", process.cwd());
    // Log contents of src directory if it exists
    const srcPath = path.join(process.cwd(), "src");
    if (fs.existsSync(srcPath)) {
      console.log("Contents of src directory:", fs.readdirSync(srcPath));
    } else {
      console.log("src directory does not exist");
    }
  }
}

async function installORM(orm: string) {
  switch (orm) {
    case "Prisma":
      await runCommand("npm install prisma --save-dev");
      await runCommand("npx prisma init");
      break;
    case "TypeORM":
      await runCommand("npm install typeorm reflect-metadata @types/node pg");
      break;
    case "Drizzle":
      await runCommand("npm install drizzle-orm pg");
      await runCommand("npm install -D drizzle-kit");
      break;
  }
}

async function setupBackendAPI(backendApi: string) {
  switch (backendApi) {
    case "Node with Express":
      await runCommand("npm install express cors dotenv openai");
      await runCommand("npm install --save-dev @types/express @types/cors");
      break;
    case "Hono":
      await runCommand("npm install hono @hono/node-server openai");
      break;
    case "Python Flask":
    case "Python FastAPI":
      // Python dependencies will be installed in the container
      break;
  }
}
