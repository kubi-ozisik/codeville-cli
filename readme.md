# Codeville CLI

Codeville CLI is a powerful command-line tool for initializing full-stack projects with Next.js, various ORM options, and backend API choices. It streamlines the process of setting up a new project with a consistent structure and development environment.

## Features

- Next.js with TypeScript setup
- ORM options: Prisma, TypeORM, or Drizzle
- Backend API options: Node.js (Express or Hono) or Python (Flask or FastAPI)
- Automatic setup of development container (devcontainer) configuration
- Docker Compose for development services (PostgreSQL, Redis)
- NextAuth integration for authentication

## Installation

To install Codeville CLI globally, run:

```bash
npm install -g codeville-cli
```

## Usage

To create a new project, run:

```bash
codeville init
```

Follow the prompts to configure your project.

## Development

To contribute to Codeville CLI, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/codeville-cli.git
   cd codeville-cli
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Make your changes and test them:

   ```bash
   npm run build
   npm link
   ```

   This will build the project and create a symlink so you can use your local version of Codeville CLI.

4. Run the CLI:

   ```bash
   codeville init
   ```

5. After making changes, run tests:

   ```bash
   npm test
   ```

## Contributing

I welcome contributions to Codeville CLI! Here's how you can contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and adhere to the existing coding style.

## Contact

Kubi - [@kubilayozisik](https://twitter.com/kubilayozisik) - <kubi@smeet.app>

Project Link: [https://github.com/kubi-ozisik/codeville-cli](https://github.com/kubi-ozisik/codeville-cli)
