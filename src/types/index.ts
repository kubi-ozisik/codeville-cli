export interface ProjectConfig {
  projectName: string;
  orm: "Prisma" | "TypeORM" | "Drizzle";
  backendApi: "Node with Express" | "Hono" | "Python Flask" | "Python FastAPI";
}
