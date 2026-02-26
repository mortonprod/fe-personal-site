# fe-personal-site

Static assets for [alexandermorton.co.uk](https://alexandermorton.co.uk) — a personal portfolio website built with webpack, SCSS, and vanilla JS.

## Stack

- **Bundler**: webpack 5
- **Styles**: SCSS via sass (dart-sass) + MiniCssExtractPlugin
- **JS**: Vanilla JS + jQuery (CDN external) + dialog-polyfill
- **Images**: image-webpack-loader (mozjpeg/pngquant optimisation)
- **Dev server**: webpack-dev-server 5
- **Local preview**: Express (serve-production-assets)

## Commands

```bash
npm install

# Development server (hot reload)
npm start

# Production build → dist/
npm run build

# Preview production build locally on :3000
npm run start:prod
```

## Project structure

```
src/
  index.html        # Portfolio landing page (CSS only in prod build)
  about.html        # About page
  contact.html      # Contact form (JS + CSS)
  js/
    index.js        # Contact form handler (jQuery AJAX → SES Lambda)
  sass/
    index.scss      # All styles (661 lines)
    index.js        # SCSS webpack entry
  images/           # Static assets
serve-production-assets/
  index.js          # Express server for local prod preview (:3000)
```

See [CHANGELOG.md](CHANGELOG.md) for version history.
