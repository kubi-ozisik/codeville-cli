export const initPrompts = [
  {
    type: "input",
    name: "projectName",
    message: "What is the name of your project?",
    default: "my-app",
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
    choices: ["Node with Express", "Hono", "Python Flask", "Python FastAPI"],
    default: "Node with Express",
  },
];
