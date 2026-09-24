# Development notes

Working notes for changing this codebase. Setup, environment variables and deployment are in [README.md](README.md).

## Next.js 16

This project runs Next.js 16, which changes APIs, conventions and file structure compared with earlier versions. Before writing code against a Next.js API, read the matching guide in `node_modules/next/dist/docs/` and follow its deprecation notices. For example, `next/image` uses `preload` instead of the deprecated `priority`.

## Checks before pushing

```bash
npm run lint
npx tsc --noEmit
npm run build
```

`tsc` reports `Cannot find name 'LayoutProps'` until a build has run once. Next.js generates that type during the build.

## Database changes

1. Edit `prisma/schema.prisma`.
2. Create a migration: `npx prisma migrate dev --name <what-changed>`. Put any rows the new feature needs to launch with in the migration SQL itself.
3. Commit the new folder in `prisma/migrations/`.

Vercel runs the `vercel-build` script (`prisma migrate deploy && next build`), so each deploy applies pending migrations before building. Keep migrations additive (new tables, new columns with defaults). A preview deploy can share the production database and apply a migration before the pull request is merged, so the code that is live at that moment must keep working.

## Motion

Scroll and pointer effects are driven by `data-*` attributes and handled in one client component, `src/components/motion/MotionEffects.tsx`, so page sections stay server components:

| Attribute | Effect |
|---|---|
| `data-reveal` | Fades and slides in when scrolled into view. `--d` sets a stagger delay. |
| `data-curtain` | Clip-path wipe reveal (homepage gallery). |
| `data-magnetic` | Button drifts toward the cursor. `LinkButton` has a `magnetic` prop. |
| `data-glow` | Sets `--mx`/`--my` for a glow or spotlight that follows the cursor. |
| `data-tilt` | 3D tilt toward the cursor, with `--gx`/`--gy` for the glare (trek cards). |

The matching CSS is in the "Motion system" section of `src/app/globals.css`. Only elements below the first screen start hidden, so pages render complete without JavaScript. Cursor effects run only on devices with a mouse, and everything is disabled for visitors who prefer reduced motion.

## Image uploads

Admin uploads go through the `uploadImageAction` Server Action to Cloudinary. In the browser, `src/lib/prepareImageUpload.ts` resizes photos over 3.5 MB (to at most 2400 px) before upload. `next.config.ts` raises the Server Action body limit to 4 MB, which stays under Vercel's 4.5 MB request cap.
