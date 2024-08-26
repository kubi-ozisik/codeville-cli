import fs from "fs-extra";
import path from "path";
import { ProjectConfig } from "../types/index.js";
import { createFile } from "../utils/createFile.js";
import { runCommand } from "../utils/runCommand.js";

export async function setupNextAuth(config: ProjectConfig) {
  console.log("Starting setupNextAuth...");
  await runCommand("npm install next-auth @auth/core @auth/prisma-adapter");

  const libPath = path.join(process.cwd(), "src", "lib");
  const authConfigPath = path.join(libPath, "auth.ts");
  console.log(`Ensuring directory exists: ${libPath}`);

  const authConfigContent = `
import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './db';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Add your own logic here to look up the user from the credentials supplied
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };
        return user;
      }
    }),
  ],
  // Add other NextAuth configuration options here
};
`;

  console.log(`Writing auth config to: ${authConfigPath}`);

  try {
    await fs.ensureDir(libPath);
    console.log("Directory created or already exists");
  } catch (error) {
    console.error("Error creating directory:", error);
    throw error;
  }

  try {
    await createFile(authConfigPath, authConfigContent);
    console.log("Auth config file created successfully");
  } catch (error) {
    console.error("Error creating auth config file:", error);
    throw error;
  }
  const envSamplePath = path.join(process.cwd(), ".env.sample");

  // Update .env.sample with NextAuth environment variables
  const envAdditions = `
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
`;
  console.log(`Updating .env.sample at: ${envSamplePath}`);

  try {
    await createFile(envSamplePath, envAdditions, true);
    console.log(".env.sample updated successfully");
  } catch (error) {
    console.error("Error updating .env.sample:", error);
    throw error;
  }
}
