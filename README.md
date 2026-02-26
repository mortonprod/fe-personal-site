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
    splash-page/    # Three.js animation (currently disabled)
  sass/
    index.scss      # All styles (661 lines)
    index.js        # SCSS webpack entry
  images/           # Static assets
serve-production-assets/
  index.js          # Express server for local prod preview (:3000)
```

## Changelog

### v5 — webpack 5 migration

**Removed packages**
- `clean-webpack-plugin` — replaced by `output.clean: true` in webpack config
- `file-loader` — replaced by webpack 5 native asset modules (`type: 'asset/resource'`)
- `node-sass` — replaced by `sass` (dart-sass); node-sass was deprecated and broken on Node 18+
- `optimize-css-assets-webpack-plugin` — replaced by `css-minimizer-webpack-plugin`
- `terser-webpack-plugin` — webpack 5 includes Terser by default in production mode
- `html-webpack-injector` — not compatible with webpack 5; replaced by explicit `inject: 'body'` on HtmlWebpackPlugin instances
- `module-to-cdn` — was unused in the webpack config

**Upgraded packages**
| Package | Old | New |
|---|---|---|
| `webpack` | ^4.44.2 | ^5.97.1 |
| `webpack-cli` | ^3.3.12 | ^5.1.4 |
| `webpack-dev-server` | ^3.11.0 | ^5.2.0 |
| `html-webpack-plugin` | ^3.2.0 | ^5.6.3 |
| `mini-css-extract-plugin` | ^0.5.0 | ^2.9.2 |
| `css-loader` | ^2.1.1 | ^7.1.2 |
| `sass-loader` | ^7.3.1 | ^16.0.4 |
| `style-loader` | ^0.23.1 | ^4.0.0 |
| `copy-webpack-plugin` | ^4.6.0 | ^12.0.2 |
| `image-webpack-loader` | ^4.6.0 | ^8.1.0 |
| `worker-loader` | ^2.0.0 | ^3.0.8 |
| `express` (serve-production-assets) | ^4.16.4 | ^4.21.2 |

**webpack config changes**
- `CopyWebpackPlugin`: array API `[{from, to}]` → object API `{patterns: [{from, to}]}`
- `[hash]` → `[contenthash]` in output filenames for correct cache busting
- `pngquant.quality`: string `'65-90'` → array `[0.65, 0.90]` (updated loader API)
- Dev server start command: `webpack-dev-server` → `webpack serve`
