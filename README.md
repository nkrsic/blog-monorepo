# Blog monorepo

This is a pnpm monorepo for managing multiple blog sites. 

Blogs live in the `apps/` folder. 

Currently there is only one app at `apps/studio-nkrsic-blog`.

## Typegen

```
# in apps/studio-nkrsic-blog
pnpm run typegen
```

## Studio

Should deploy to https://nkrsic.sanity.studio/ 

## Deploy settings - Netlify

Base directory: `/`

Package directory: `apps/web`

Build command: `pnpm --filter web... run build`

Publish directory: `apps/web/.next`

Function directory: `netlify/functions`

## Studio deploy notes

Add appId: 'flxejc5o6dl3kzobubjxjgwh'
to the `deployment` section in sanity.cli.js or sanity.cli.ts
to avoid prompting for application id on next deploy.