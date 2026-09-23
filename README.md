# TrekVibe Nepal

Marketing site + admin panel for TrekVibe Nepal, a Kathmandu-based trekking agency. Built with Next.js 16, Tailwind CSS v4, Prisma, and TypeScript.

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The public site works immediately with **no setup** — trek packages, blog posts, testimonials and guides all come from readable data files in `src/lib/*.ts` until a database is connected.

## Project structure

- `src/app/(site)/` — the public marketing site (home, treks, blog, about, contact, plan-your-trek)
- `src/app/admin/` — the admin panel (`/admin`), protected by login
- `src/lib/*.ts` — static content used when no database is connected (treks, blog posts, testimonials, guides, general FAQs)
- `src/lib/data/*.ts` — the data layer every page actually imports from; reads from the database when `DATABASE_URL` is set, otherwise falls back to the static files above
- `src/lib/actions/*.ts` — server actions for the admin panel (create/update/delete, login, image upload)
- `prisma/schema.prisma` — database schema (Trek, BlogPost, Testimonial, Guide, Inquiry)
- `prisma/seed.ts` — loads the current static content into the database

## Turning on the admin panel + database

The admin panel at `/admin` lets you edit treks, blog posts, testimonials and guides, and view inquiries submitted through the site — without touching code. It needs three things, all free to start:

### 1. A database

```bash
npx create-db
```

This opens a browser flow that gives you a free hosted Postgres database (Prisma Postgres) in under a minute — no separate account elsewhere. Copy the connection string it gives you into `.env`:

```
DATABASE_URL="postgres://..."
```

(Neon, Supabase or Vercel Postgres work too — any Postgres connection string is fine here.)

Then create the tables and load in the current site content:

```bash
npx prisma migrate deploy
npm run db:seed
```

### 2. Admin login

Add to `.env`:

```
ADMIN_EMAIL="you@example.com"
ADMIN_SESSION_SECRET="<random string>"
ADMIN_PASSWORD_HASH="<bcrypt hash — see below>"
```

Generate the password hash (escaping every `$` as `\$`, or Next's env loader will mangle it):

```bash
node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"
```

### 3. Image uploads (optional)

Create a free account at [cloudinary.com](https://cloudinary.com) and add its three keys to `.env` as `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`. Without these, you can still paste image URLs directly in the admin forms — you just won't get the built-in upload button.

Full details and every variable are documented in `.env.example`.

## Contact form delivery

The trip-planner and contact forms email submissions via [FormSubmit](https://formsubmit.co) to the address in `src/components/forms/InquiryForm.tsx`, and (once a database is connected) also save every submission to the `Inquiry` table, viewable at `/admin/inquiries`.

## Deploying

Deploys cleanly to [Vercel](https://vercel.com/new). Set the same environment variables from `.env` in the Vercel project settings. The site works fine on Vercel even before you set up the database — connect it whenever you're ready to start editing content from `/admin`.
