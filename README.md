# Royal Infra Realty

This is a React single-page app built with Vite.

```sh
npm install
npm run dev
```

Use `npm run build` to create the production bundle in `dist/`.

This is a single-page app, so the host must serve `index.html` for app paths
such as `/projects/palm-serenity`. The production build is written to `dist/`:

- **Netlify:** `public/_redirects` is copied into the production bundle and
  rewrites app paths to `index.html`.
- **Vercel:** `vercel.json` rewrites app paths to `index.html`.
- **Hostinger (Apache):** `public/.htaccess` is copied into `dist/`. Deploy the
  contents of `dist/` (including the hidden `.htaccess` file) to the site root,
  such as `public_html/`. If GitHub Actions packages the build first, make sure
  its artifact/deployment step includes hidden files.
- **Render:** In the Static Site's dashboard, add a **Rewrite** rule with source
  `/*` and destination `/index.html`. Render applies the rule only when no
  matching static file exists, so built assets continue to be served normally.
