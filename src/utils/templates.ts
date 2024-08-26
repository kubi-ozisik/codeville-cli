import { ProjectConfig } from "../types";

export const readmeTemplate = (config: ProjectConfig) => `
# ${config.projectName}

This project was created using the Codeville CLI tool. It includes Next.js, Tailwind CSS, ${
  config.orm
} as the ORM, and a ${config.backendApi} backend.

## Getting Started

1. Clone this repository
2. Install dependencies: \`npm install\`
3. Copy \`.env.sample\` to \`.env\` and update the environment variables
4. Set up your database and update the connection string in \`.env\`
5. Run the development server: \`npm run dev\`

## ORM Setup

### ${config.orm}

${
  config.orm === "Prisma"
    ? `
1. Edit \`prisma/schema.prisma\` to define your data model
2. Run \`npx prisma db push\` to sync your database
3. Run \`npx prisma generate\` to generate Prisma Client
`
    : config.orm === "TypeORM"
    ? `
1. Create an \`ormconfig.json\` file in the root directory with your database configuration
2. Create entity classes in \`src/entities\`
3. Set up a connection in your app
`
    : `
1. Define your schema in \`src/schema.ts\`
2. Use \`drizzle-kit\` to generate and run migrations
3. Set up a connection in your app
`
}

## Authentication

This project uses NextAuth.js for authentication. It's set up with Google OAuth and Credentials providers. Update the .env file with your Google OAuth credentials and customize the Credentials provider in \`src/lib/auth.ts\`.

## Backend API

This project uses a ${
  config.backendApi
} backend. The API includes a sample endpoint that consumes the OpenAI API to make a completion request.

## Models

Sample User and Auth models are provided in \`src/models.ts\`. Modify these according to your needs and ORM requirements.

## Environment Variables

Copy \`.env.sample\` to \`.env\` and update the variables as needed.

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [${config.orm} Documentation](${
  config.orm === "Prisma"
    ? "https://www.prisma.io/docs"
    : config.orm === "TypeORM"
    ? "https://typeorm.io/"
    : "https://orm.drizzle.team/docs/overview"
})
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [${config.backendApi} Documentation](${
  config.backendApi === "Node with Express"
    ? "https://expressjs.com/"
    : config.backendApi === "Hono"
    ? "https://hono.dev/"
    : config.backendApi === "Python Flask"
    ? "https://flask.palletsprojects.com/"
    : "https://fastapi.tiangolo.com/"
})
`;

export const envSampleTemplate = `
DATABASE_URL="your_database_connection_string_here"
SECRET_KEY="your_secret_key_here"
OPENAI_API_KEY="your_openai_api_key_here"

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
`;

export const modelsTemplate = `
interface User {
  id: string;
  email: string;
  name: string;
}

interface Auth {
  id: string;
  userId: string;
  token: string;
}

export { User, Auth };
`;

export const devcontainerTemplate = `
{
  "name": "Full-Stack Project",
  "dockerComposeFile": "docker-compose.yml",
  "service": "app",
  "workspaceFolder": "/workspace",
  "features": {
    "ghcr.io/devcontainers/features/node:1": {},
    "ghcr.io/devcontainers/features/python:1": {},
    "ghcr.io/devcontainers/features/docker-in-docker:2": {}
  },
  "customizations": {
    "vscode": {
      "extensions": [
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "ms-python.python",
        "ms-azuretools.vscode-docker"
      ]
    }
  },
  "forwardPorts": [3000, 3001],
  "postCreateCommand": "npm install"
}
`;

export const dockerComposeTemplate = (config: ProjectConfig) => `
version: '3.8'
services:
  app:
    build: 
      context: .
      dockerfile: Dockerfile
    volumes:
      - ..:/workspace:cached
    command: sleep infinity
    network_mode: service:db
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@localhost:5432/myapp
      ${
        config.backendApi.startsWith("Python")
          ? `
      - FLASK_ENV=development
      - FLASK_APP=app.py
      `
          : ""
      }

  db:
    image: postgres:13
    restart: unless-stopped
    volumes:
      - postgres-data:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_USER: postgres
      POSTGRES_DB: myapp

  redis:
    image: redis:6
    restart: unless-stopped
    volumes:
      - redis-data:/data

volumes:
  postgres-data:
  redis-data:
`;

export const dockerfileTemplate = (config: ProjectConfig) => `
FROM mcr.microsoft.com/devcontainers/javascript-node:0-18

# Install Python
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends python3-pip

# Install global dependencies
RUN npm install -g npm@latest

${
  config.backendApi.startsWith("Python")
    ? `
# Install Python dependencies
COPY requirements.txt /tmp/pip-tmp/
RUN pip3 --disable-pip-version-check --no-cache-dir install -r /tmp/pip-tmp/requirements.txt \
    && rm -rf /tmp/pip-tmp
`
    : ""
}

# Set the default shell to bash instead of sh
ENV SHELL /bin/bash
`;

export const pythonRequirementsTemplate = (backendApi: string) => `
${backendApi === "Python Flask" ? "flask" : "fastapi"}
uvicorn
sqlalchemy
psycopg2-binary
python-dotenv
openai
`;

export const gitignoreTemplate = `
# Dependency directories
node_modules/
jspm_packages/

# Build outputs
dist/
build/
out/
.next/

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage

# nyc test coverage
.nyc_output

# Grunt intermediate storage (https://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html)
build/Release

# TypeScript cache
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env
.env.test

# parcel-bundler cache (https://parceljs.org/)
.cache

# Next.js build output
.next

# Nuxt.js build / generate output
.nuxt
dist

# Gatsby files
.cache/
public

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless/

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# IDE / Editor specific files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Python
__pycache__/
*.py[cod]
*$py.class
.Python
env/
venv/
ENV/
env.bak/
venv.bak/

# Project specific
generated/
`;
