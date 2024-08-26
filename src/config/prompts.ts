import inquirer from "inquirer";

export const projectPrompts = [
  {
    type: "input",
    name: "projectName",
    message: "What is the name of your project?",
    default: "my-fullstack-app",
  },
  {
    type: "list",
    name: "orm",
    message: "Which ORM would you like to use?",
    choices: ["Prisma", "TypeORM", "Drizzle"],
    default: "Prisma",
  },
  {
    type: "list",
    name: "backendApi",
    message: "Which backend API would you like to use?",
    choices: [
      "Node with Express",
      "Node with Hono",
      "Python with Flask",
      "Python with FastAPI",
    ],
    default: "Node with Express",
  },
];

export async function getProjectConfig() {
  return inquirer.prompt(projectPrompts);
}
