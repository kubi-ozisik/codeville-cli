
# test-app

This project was created using the Codeville CLI tool. It includes Next.js, Tailwind CSS, Prisma as the ORM, and a Python FastAPI backend.

## Getting Started

1. Clone this repository
2. Install dependencies: `npm install`
3. Copy `.env.sample` to `.env` and update the environment variables
4. Set up your database and update the connection string in `.env`
5. Run the development server: `npm run dev`

## ORM Setup

### Prisma


1. Edit `prisma/schema.prisma` to define your data model
2. Run `npx prisma db push` to sync your database
3. Run `npx prisma generate` to generate Prisma Client


## Authentication

This project uses NextAuth.js for authentication. It's set up with Google OAuth and Credentials providers. Update the .env file with your Google OAuth credentials and customize the Credentials provider in `src/lib/auth.ts`.

## Backend API

This project uses a Python FastAPI backend. The API includes a sample endpoint that consumes the OpenAI API to make a completion request.

## Models

Sample User and Auth models are provided in `src/models.ts`. Modify these according to your needs and ORM requirements.

## Environment Variables

Copy `.env.sample` to `.env` and update the variables as needed.

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Python FastAPI Documentation](https://fastapi.tiangolo.com/)
