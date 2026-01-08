This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment

Create a `.env.local` from `.env.example` and set values:

```env
DATABASE_URL=postgres://showspree:showspree@localhost:5432/showspree
NEXTAUTH_SECRET=<generate-a-long-random-string>
NEXTAUTH_URL=http://localhost:3000
```

### 3) Run PostgreSQL

Ensure a PostgreSQL instance is running that matches `DATABASE_URL`.
On Windows you can use Docker:

```bash
docker run -d --name showspree-postgres -p 5432:5432 \
	-e POSTGRES_USER=showspree -e POSTGRES_PASSWORD=showspree -e POSTGRES_DB=showspree \
	postgres:16
```

Or install locally with the standard installer.

### 4) Migrate and seed the database

```bash
npx prisma migrate dev --name init
npm run seed
```

### 5) Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to load [Geist](https://vercel.com/font).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
